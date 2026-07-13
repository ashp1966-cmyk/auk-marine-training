import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

// GET /api/certificate?learnerId=...&courseId=...
// Issues a verifiable PDF certificate with embedded QR code.
export async function GET(req: NextRequest) {
  const learnerId = req.nextUrl.searchParams.get("learnerId");
  const courseId  = req.nextUrl.searchParams.get("courseId");
  if (!learnerId || !courseId) {
    return NextResponse.json({ ok: false, error: "Missing parameters" }, { status: 400 });
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
    return NextResponse.json({ ok: false, error: "Course not yet completed" }, { status: 403 });
  }

  // Get or create the certificate record (idempotent — always same token)
  const cert = await prisma.certificate.upsert({
    where: { learnerId_courseId: { learnerId, courseId } },
    update: {},
    create: { learnerId, courseId },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://training.auk-maritime.com";
  const verifyUrl = `${siteUrl}/verify/${cert.verifyToken}`;
  const issuedDate = cert.issuedAt.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

  // Generate QR code as PNG buffer
  const qrBuffer = await QRCode.toBuffer(verifyUrl, {
    errorCorrectionLevel: "H",
    width: 120,
    margin: 1,
    color: { dark: "#0B2A3D", light: "#FFFFFF" },
  });

  // Build the PDF
  const doc  = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifB = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans  = await doc.embedFont(StandardFonts.Helvetica);
  const sansB = await doc.embedFont(StandardFonts.HelveticaBold);

  const navy   = rgb(0.043, 0.165, 0.239);  // #0B2A3D
  const teal   = rgb(0.071, 0.502, 0.549);  // #12808c
  const brass  = rgb(0.722, 0.502, 0.18);   // #B88030
  const silver = rgb(0.85, 0.85, 0.85);
  const white  = rgb(1, 1, 1);

  // Navy header band
  page.drawRectangle({ x: 0, y: height - 110, width, height: 110, color: navy });

  // Gold top border line
  page.drawRectangle({ x: 0, y: height - 6, width, height: 6, color: brass });

  // Header text
  page.drawText("AUK MARINE AND MINING (PTY) LTD", {
    x: 40, y: height - 45, size: 13, font: sansB, color: white,
  });
  page.drawText("Research & Training Centre · Est. 2012 & 2017", {
    x: 40, y: height - 62, size: 9, font: sans, color: rgb(0.8, 0.8, 0.8),
  });
  page.drawText("TETA Accredited Training Service Provider", {
    x: 40, y: height - 78, size: 8.5, font: sans, color: rgb(0.7, 0.7, 0.7),
  });

  // Certificate heading
  page.drawText("CERTIFICATE OF COMPLETION", {
    x: 0, y: height - 158, size: 14, font: sansB, color: teal,
    maxWidth: width, lineHeight: 14,
  });
  // Centre it manually
  const headW = sansB.widthOfTextAtSize("CERTIFICATE OF COMPLETION", 14);
  page.drawText("CERTIFICATE OF COMPLETION", {
    x: (width - headW) / 2, y: height - 158, size: 14, font: sansB, color: teal,
  });

  page.drawText("This is to certify that", {
    x: (width - sans.widthOfTextAtSize("This is to certify that", 12)) / 2,
    y: height - 198, size: 12, font: sans, color: rgb(0.4, 0.4, 0.4),
  });

  // Learner name — large serif
  const nameSize = learner.name.length > 28 ? 28 : 34;
  page.drawText(learner.name, {
    x: (width - serifB.widthOfTextAtSize(learner.name, nameSize)) / 2,
    y: height - 248, size: nameSize, font: serifB, color: navy,
  });

  // Decorative line under name
  page.drawRectangle({ x: 80, y: height - 260, width: width - 160, height: 1.5, color: brass });

  page.drawText("has successfully completed", {
    x: (width - sans.widthOfTextAtSize("has successfully completed", 12)) / 2,
    y: height - 290, size: 12, font: sans, color: rgb(0.4, 0.4, 0.4),
  });

  // Course title — wrapped if long
  const titleSize = course.title.length > 50 ? 14 : 18;
  const titleLines = wrapText(course.title, serifB, titleSize, width - 120);
  let ty = height - 330;
  for (const line of titleLines) {
    page.drawText(line, {
      x: (width - serifB.widthOfTextAtSize(line, titleSize)) / 2,
      y: ty, size: titleSize, font: serifB, color: navy,
    });
    ty -= titleSize + 6;
  }

  // Course code & NQF badge
  const meta = [course.code, course.nqfLevel ? `NQF ${course.nqfLevel}` : null, course.credits ? `${course.credits} Credits` : null].filter(Boolean).join("  ·  ");
  page.drawText(meta, {
    x: (width - sans.widthOfTextAtSize(meta, 10)) / 2,
    y: ty - 8, size: 10, font: sans, color: teal,
  });

  // Issue date
  const dateY = 260;
  page.drawText(`Issued: ${issuedDate}`, {
    x: (width - sans.widthOfTextAtSize(`Issued: ${issuedDate}`, 10)) / 2,
    y: dateY, size: 10, font: sans, color: rgb(0.5, 0.5, 0.5),
  });

  // Certificate number
  const certNum = `Certificate No: AUK-${cert.id.slice(-8).toUpperCase()}`;
  page.drawText(certNum, {
    x: (width - sans.widthOfTextAtSize(certNum, 9)) / 2,
    y: dateY - 16, size: 9, font: sans, color: rgb(0.6, 0.6, 0.6),
  });

  // Signature line — left side
  const sigY = 180;
  page.drawRectangle({ x: 80, y: sigY, width: 160, height: 1, color: silver });
  page.drawText("Captain Ashwani Pathak", { x: 80, y: sigY - 14, size: 9, font: sansB, color: navy });
  page.drawText("Lead Facilitator & Assessor", { x: 80, y: sigY - 26, size: 8, font: sans, color: rgb(0.5,0.5,0.5) });
  page.drawText("AUK Marine and Mining (Pty) Ltd", { x: 80, y: sigY - 38, size: 7.5, font: sans, color: rgb(0.6,0.6,0.6) });

  // QR code — right side
  const qrImage = await doc.embedPng(qrBuffer);
  const qrSize  = 90;
  const qrX     = width - 80 - qrSize;
  const qrY     = sigY - 20;
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });
  page.drawText("Scan to verify", { x: qrX + 10, y: qrY - 12, size: 7.5, font: sans, color: rgb(0.5,0.5,0.5) });

  // Footer band
  page.drawRectangle({ x: 0, y: 0, width, height: 48, color: navy });
  page.drawRectangle({ x: 0, y: 48, width, height: 1, color: brass });
  page.drawText("Northlands Corner, North Riding, Johannesburg · training@auk-maritime.com · www.auk-maritime.com", {
    x: (width - sans.widthOfTextAtSize("Northlands Corner, North Riding, Johannesburg · training@auk-maritime.com · www.auk-maritime.com", 8)) / 2,
    y: 30, size: 8, font: sans, color: rgb(0.7, 0.7, 0.7),
  });
  page.drawText(`Verification: ${verifyUrl}`, {
    x: (width - sans.widthOfTextAtSize(`Verification: ${verifyUrl}`, 7.5)) / 2,
    y: 16, size: 7.5, font: sans, color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await doc.save();
  const safeName = learner.name.replace(/[^a-zA-Z0-9]/g, "_");

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="AUK_Certificate_${safeName}.pdf"`,
    },
  });
}

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
