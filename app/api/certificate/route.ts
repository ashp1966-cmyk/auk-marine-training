import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Public but self-verifying: takes learnerId + courseId, and only ever generates
// a certificate if that learner's enrollment has genuinely reached 100% in the
// database — never trusts a query param claiming "I finished," only the real
// progress value we've been writing all along.
export async function GET(req: NextRequest) {
  const learnerId = req.nextUrl.searchParams.get("learnerId");
  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!learnerId || !courseId) {
    return NextResponse.json({ ok: false, error: "learnerId and courseId required" }, { status: 400 });
  }

  const [enrollment, learner, course] = await Promise.all([
    prisma.enrollment.findUnique({ where: { learnerId_courseId: { learnerId, courseId } } }),
    prisma.learner.findUnique({ where: { id: learnerId } }),
    prisma.course.findUnique({ where: { id: courseId } }),
  ]);

  if (!enrollment || !learner || !course) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  if (course.price === 0) {
    return NextResponse.json({ ok: false, error: "Certificates are issued for paid courses only" }, { status: 403 });
  }
  if (enrollment.progress < 100) {
    return NextResponse.json({ ok: false, error: "This course isn't complete yet" }, { status: 403 });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 420]); // A5-landscape-ish proportions
  const serif = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const serifItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const mono = await pdf.embedFont(StandardFonts.Courier);

  const hull = rgb(0.043, 0.165, 0.239);
  const brass = rgb(0.788, 0.541, 0.235);
  const teal = rgb(0.071, 0.502, 0.549);
  const gray = rgb(0.4, 0.45, 0.48);

  // Border
  page.drawRectangle({ x: 12, y: 12, width: 571, height: 396, borderColor: hull, borderWidth: 2 });
  page.drawRectangle({ x: 20, y: 20, width: 555, height: 380, borderColor: brass, borderWidth: 1 });

  const centerText = (text: string, y: number, font = serif, size = 14, color = hull) => {
    const width = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (595 - width) / 2, y, font, size, color });
  };

  centerText("AUK MARINE TRAINING", 350, serif, 18, hull);
  centerText("Accredited Training Provider", 330, serifItalic, 11, gray);
  centerText(course.credits ? "CERTIFICATE OF COMPETENCE" : "CERTIFICATE OF COMPLETION", 290, serif, 13, teal);
  centerText("This certifies that", 262, serifItalic, 11, gray);
  centerText(learner.name, 228, serif, 28, hull);
  centerText(
    course.credits ? `has been assessed competent in` : `has successfully completed`,
    198,
    serifItalic,
    11,
    gray
  );
  centerText(course.title, 172, serif, 15, hull);
  if (course.nqfLevel && course.credits) {
    centerText(`${course.nqfLevel} · ${course.credits} credits`, 152, serifItalic, 10, gray);
  }
  if (enrollment.quizScore != null) {
    centerText(`Assessment score: ${enrollment.quizScore}%`, 128, mono, 10, teal);
  }

  const certNo = `AUK-${enrollment.id.slice(-8).toUpperCase()}`;
  page.drawText("Captain Ashwani Pathak", { x: 60, y: 60, font: serif, size: 10, color: hull });
  page.drawText("Director / Lead Assessor", { x: 60, y: 46, font: serifItalic, size: 8, color: gray });
  const dateStr = new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  const rightText = `${certNo}  ·  ${dateStr}`;
  const rw = mono.widthOfTextAtSize(rightText, 9);
  page.drawText(rightText, { x: 535 - rw, y: 60, font: mono, size: 9, color: gray });

  const bytes = await pdf.save();
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="AUK-Certificate-${course.code}.pdf"`,
    },
  });
}
