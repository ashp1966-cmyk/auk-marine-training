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

  const cert = await prisma.certificate.upsert({
    where: { learnerId_courseId: { learnerId, courseId } },
    update: {},
    create: { learnerId, courseId },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://training.auk-maritime.com";
  const verifyUrl = `${siteUrl}/verify/${cert.verifyToken}`;
  const issuedDate = cert.issuedAt.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

  const qrBuffer = await QRCode.toBuffer(verifyUrl, {
    errorCorrectionLevel: "H",
    width: 140,
    margin: 1,
    color: { dark: "#0B2A3D", light: "#FFFFFF" },
  });

  const doc  = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const serif  = await doc.embedFont(StandardFonts.TimesRoman);
  const serifB = await doc.embedFont(StandardFonts.TimesRomanBold);
  const serifI = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans   = await doc.embedFont(StandardFonts.Helvetica);
  const sansB  = await doc.embedFont(StandardFonts.HelveticaBold);

  // AUK brand palette — matches training.auk-maritime.com
  const navy    = rgb(0.043, 0.165, 0.239);  // #0B2A3D
  const teal    = rgb(0.071, 0.502, 0.549);  // #12808c
  const brass   = rgb(0.722, 0.502, 0.18);   // #B88030
  const cream   = rgb(0.984, 0.980, 0.965);  // soft warm off-white background
  const softGrey= rgb(0.55, 0.56, 0.58);
  const lightGrey = rgb(0.85, 0.86, 0.87);
  const white   = rgb(1, 1, 1);

  const centred = (font: any, text: string, size: number) => (width - font.widthOfTextAtSize(text, size)) / 2;

  // ── Soft cream background with a slim outer frame ────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width, height, color: cream });
  const margin = 24;
  page.drawRectangle({
    x: margin, y: margin, width: width - margin * 2, height: height - margin * 2,
    borderColor: brass, borderWidth: 1.2, color: undefined,
  });
  page.drawRectangle({
    x: margin + 5, y: margin + 5, width: width - (margin + 5) * 2, height: height - (margin + 5) * 2,
    borderColor: teal, borderWidth: 0.6, color: undefined,
  });

  // ── AUK anchor mark — drawn as real vector shapes, matching the site header ──
  // A small teal rounded square with a simple white anchor glyph inside.
  const markCx = width / 2;
  const markCy = height - 92;
  const markSize = 42;
  page.drawRectangle({
    x: markCx - markSize / 2, y: markCy - markSize / 2, width: markSize, height: markSize,
    color: teal,
  });
  // Simple anchor: ring (small circle outline) + shaft (vertical line) + arms (curved-ish via two diagonal lines) + crossbar
  const ax = markCx, ay = markCy;
  page.drawCircle({ x: ax, y: ay + 10, size: 4.5, borderColor: white, borderWidth: 1.6, color: undefined });
  page.drawLine({ start: { x: ax, y: ay + 5 }, end: { x: ax, y: ay - 12 }, thickness: 2, color: white });
  page.drawLine({ start: { x: ax - 7, y: ay + 1 }, end: { x: ax + 7, y: ay + 1 }, thickness: 1.6, color: white });
  page.drawLine({ start: { x: ax, y: ay - 12 }, end: { x: ax - 8, y: ay - 4 }, thickness: 2, color: white });
  page.drawLine({ start: { x: ax, y: ay - 12 }, end: { x: ax + 8, y: ay - 4 }, thickness: 2, color: white });

  // ── Header wordmark ────────────────────────────────────────────────────────
  page.drawText("AUK MARINE TRAINING", {
    x: centred(sansB, "AUK MARINE TRAINING", 15), y: height - 122, size: 15, font: sansB, color: navy,
  });
  page.drawText("Research & Training Centre  ·  Est. 2012 & 2017", {
    x: centred(sans, "Research & Training Centre  ·  Est. 2012 & 2017", 8.5), y: height - 137, size: 8.5, font: sans, color: softGrey,
  });

  // ── Certificate heading ────────────────────────────────────────────────────
  const heading = "CERTIFICATE OF COMPLETION";
  page.drawText(heading, {
    x: centred(sansB, heading, 13), y: height - 178, size: 13, font: sansB, color: teal,
  });
  // hairline flourish either side of the heading
  const hw = sansB.widthOfTextAtSize(heading, 13);
  page.drawLine({ start: { x: width / 2 - hw / 2 - 40, y: height - 182 }, end: { x: width / 2 - hw / 2 - 10, y: height - 182 }, thickness: 0.6, color: brass });
  page.drawLine({ start: { x: width / 2 + hw / 2 + 10, y: height - 182 }, end: { x: width / 2 + hw / 2 + 40, y: height - 182 }, thickness: 0.6, color: brass });

  page.drawText("This is to certify that", {
    x: centred(serifI, "This is to certify that", 12.5), y: height - 218, size: 12.5, font: serifI, color: softGrey,
  });

  // ── Learner name ───────────────────────────────────────────────────────────
  const nameSize = learner.name.length > 28 ? 26 : 32;
  page.drawText(learner.name, {
    x: centred(serifB, learner.name, nameSize), y: height - 262, size: nameSize, font: serifB, color: navy,
  });
  // soft underline, shorter and lighter than before
  const nameW = serifB.widthOfTextAtSize(learner.name, nameSize);
  page.drawLine({
    start: { x: width / 2 - nameW / 2 - 10, y: height - 274 },
    end:   { x: width / 2 + nameW / 2 + 10, y: height - 274 },
    thickness: 1, color: brass,
  });

  page.drawText("has successfully completed", {
    x: centred(serifI, "has successfully completed", 12), y: height - 300, size: 12, font: serifI, color: softGrey,
  });

  // ── Course title ───────────────────────────────────────────────────────────
  const titleSize = course.title.length > 50 ? 15 : 19;
  const titleLines = wrapText(course.title, serifB, titleSize, width - 140);
  let ty = height - 336;
  for (const line of titleLines) {
    page.drawText(line, { x: centred(serifB, line, titleSize), y: ty, size: titleSize, font: serifB, color: navy });
    ty -= titleSize + 7;
  }

  const meta = [course.code, course.nqfLevel ? `NQF ${course.nqfLevel}` : null, course.credits ? `${course.credits} Credits` : null].filter(Boolean).join("   ·   ");
  page.drawText(meta, { x: centred(sans, meta, 9.5), y: ty - 6, size: 9.5, font: sans, color: teal });

  // ── Soft info pill — issue date + certificate number, centred, gentle ────────
  const dateY = 260;
  const infoLine = `Issued ${issuedDate}   ·   Certificate No. AUK-${cert.id.slice(-8).toUpperCase()}`;
  const infoW = sans.widthOfTextAtSize(infoLine, 9);
  page.drawRectangle({
    x: width / 2 - infoW / 2 - 14, y: dateY - 7, width: infoW + 28, height: 20,
    color: white, borderColor: lightGrey, borderWidth: 0.7,
  });
  page.drawText(infoLine, { x: centred(sans, infoLine, 9), y: dateY - 1, size: 9, font: sans, color: softGrey });

  // ── Signature + QR row ─────────────────────────────────────────────────────
  const sigY = 175;
  page.drawLine({ start: { x: 90, y: sigY }, end: { x: 250, y: sigY }, thickness: 0.8, color: lightGrey });
  page.drawText("Captain Ashwani Pathak", { x: 90, y: sigY - 15, size: 10, font: sansB, color: navy });
  page.drawText("Lead Facilitator & Assessor", { x: 90, y: sigY - 28, size: 8.5, font: sans, color: softGrey });
  page.drawText("AUK Marine and Mining (Pty) Ltd", { x: 90, y: sigY - 40, size: 8, font: sans, color: lightGrey });

  const qrImage = await doc.embedPng(qrBuffer);
  const qrSize  = 80;
  const qrX     = width - 90 - qrSize;
  const qrY     = sigY - 30;
  page.drawRectangle({ x: qrX - 8, y: qrY - 8, width: qrSize + 16, height: qrSize + 16, color: white, borderColor: lightGrey, borderWidth: 0.7 });
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });
  page.drawText("Scan to verify", { x: qrX + qrSize / 2 - 26, y: qrY - 18, size: 7.5, font: sans, color: softGrey });

  // ── Footer ─────────────────────────────────────────────────────────────────
  page.drawLine({ start: { x: margin + 30, y: 72 }, end: { x: width - margin - 30, y: 72 }, thickness: 0.5, color: lightGrey });
  const footer1 = "Northlands Corner, North Riding, Johannesburg  ·  training@auk-maritime.com  ·  www.auk-maritime.com";
  page.drawText(footer1, { x: centred(sans, footer1, 8), y: 54, size: 8, font: sans, color: softGrey });
  const footer2 = `Verify this certificate at ${verifyUrl}`;
  page.drawText(footer2, { x: centred(sans, footer2, 7.5), y: 40, size: 7.5, font: sans, color: lightGrey });

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
