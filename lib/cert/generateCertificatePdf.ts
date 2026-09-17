import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { formatCompletionDates } from "./formatDates";

/**
 * lib/cert/generateCertificatePdf.ts
 *
 * Draws the AUK certificate as a real PDF.
 *
 * WHY pdf-lib AND NOT PUPPETEER
 * The obvious approach is to render certificate-template.html in headless
 * Chromium and print to PDF. That needs a Chromium binary, which on Vercel means
 * @sparticuz/chromium, a ~50 MB dependency, cold starts measured in seconds, and
 * a function that breaks whenever the runtime moves. The certificate is a fixed
 * layout with no reflow, so the browser engine buys nothing. pdf-lib is pure JS,
 * runs on any runtime, and produces a smaller file.
 *
 * certificate-template.html remains the design reference — if you change one,
 * change both, or they will drift.
 *
 * ASSETS are read from /public/cert/ at request time. Every one is optional:
 * a missing asset leaves its slot empty rather than failing the download, so the
 * PDF works before the artwork is finished.
 */

const NAVY = rgb(0.122, 0.165, 0.239);   // #1f3f6b — frame
const HULL = rgb(0.043, 0.165, 0.239);   // #0B2A3D — headings
const TEAL = rgb(0.071, 0.502, 0.549);   // #12808c
const MUTED = rgb(0.333, 0.333, 0.333);
const RULE = rgb(0.478, 0.478, 0.478);

export type CertificateData = {
  certNumber: string;       // "AUK 061"
  learnerName: string;
  courseTitle: string;
  courseCode: string;
  deliveryMode: string;     // "Held Online"
  startedOn: Date | null;
  completedOn: Date;
  facilitator: string;
  verifyToken: string;
  verifyBaseUrl?: string;   // defaults to training.auk-maritime.com
};

/** Centre a string on the page at a given baseline. */
function drawCentred(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  y: number,
  color = HULL
) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (page.getWidth() - width) / 2, y, size, font, color });
}

/**
 * Wrap to a maximum width, returning the lines. Course titles run long —
 * "Identify, Pack, Mark & Label Dangerous Goods for Transportation by Air" is
 * 71 characters and will not fit on one line at any readable size.
 */
function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Read an asset from /public/cert/, returning null if it isn't there yet. */
async function readAsset(filename: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(path.join(process.cwd(), "public", "cert", filename));
  } catch {
    return null;
  }
}

export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  pdf.setTitle(`AUK Marine Training — Certificate ${data.certNumber}`);
  pdf.setAuthor("AUK Marine and Mining (Pty) Ltd");
  pdf.setSubject(data.courseTitle);
  pdf.setProducer("AUK Marine Training");
  pdf.setCreationDate(data.completedOn);

  const page = pdf.addPage([595.28, 841.89]); // A4 portrait
  const W = page.getWidth();
  const H = page.getHeight();

  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // ── Frame ────────────────────────────────────────────────────────────────
  page.drawRectangle({
    x: 24, y: 24, width: W - 48, height: H - 48,
    borderColor: NAVY, borderWidth: 2.5,
  });
  page.drawRectangle({
    x: 32, y: 32, width: W - 64, height: H - 64,
    borderColor: rgb(0.29, 0.427, 0.6), borderWidth: 0.75,
  });

  // ── Background ship image, faded band across the middle ──────────────────
  const shipBytes = await readAsset("ship-bg.jpg");
  if (shipBytes) {
    try {
      const ship = await pdf.embedJpg(shipBytes);
      page.drawImage(ship, {
        x: 34, y: H - 470, width: W - 68, height: 240, opacity: 0.12,
      });
    } catch {
      /* wrong format or corrupt — leave the band empty */
    }
  }

  let y = H - 90;

  // ── Logo ─────────────────────────────────────────────────────────────────
  const logoBytes = await readAsset("auk-logo.png");
  if (logoBytes) {
    try {
      const logo = await pdf.embedPng(logoBytes);
      const logoW = 150;
      const logoH = (logo.height / logo.width) * logoW;
      page.drawImage(logo, { x: (W - logoW) / 2, y: y - logoH + 14, width: logoW, height: logoH });
      y -= logoH + 6;
    } catch {
      /* not a PNG — skip */
    }
  }

  // ── Company block ────────────────────────────────────────────────────────
  drawCentred(page, "Est. 2012", sans, 9.5, y, MUTED);
  y -= 15;
  drawCentred(page, "AUK Marine and Mining", sansBold, 11.5, y, HULL);
  y -= 14;
  drawCentred(page, "Reg No: 2012/099242/07   VAT No: 4410268256", sans, 9, y, MUTED);

  // No accreditation line — not currently held. Do not reinstate.

  // ── Title ────────────────────────────────────────────────────────────────
  y -= 58;
  drawCentred(page, "CERTIFICATE OF COMPLETION", serif, 23, y, HULL);

  // ── Learner name, shrinking to fit ───────────────────────────────────────
  y -= 62;
  const nameSize = data.learnerName.length > 34 ? 21 : data.learnerName.length > 24 ? 25 : 30;
  drawCentred(page, data.learnerName, serifBold, nameSize, y, HULL);

  // ── Course ───────────────────────────────────────────────────────────────
  y -= 46;
  drawCentred(page, "has successfully completed", sans, 12.5, y, MUTED);

  y -= 28;
  for (const line of wrap(data.courseTitle, serif, 17, W - 160)) {
    drawCentred(page, line, serif, 17, y, HULL);
    y -= 24;
  }

  y -= 4;
  drawCentred(page, data.courseCode, sans, 9.5, y, TEAL);

  // ── Delivery and dates ───────────────────────────────────────────────────
  y -= 34;
  drawCentred(page, data.deliveryMode, sansBold, 11, y, HULL);
  y -= 17;
  drawCentred(page, formatCompletionDates(data.startedOn, data.completedOn), sans, 11, y, MUTED);

  // ── Certificate number ───────────────────────────────────────────────────
  y = 250;
  drawCentred(page, `Certificate Number: ${data.certNumber}`, sans, 12, y, HULL);

  // ── Signature ────────────────────────────────────────────────────────────
  y -= 52;
  const sigBytes = await readAsset("signature.png");
  if (sigBytes) {
    try {
      const sig = await pdf.embedPng(sigBytes);
      const sigW = 110;
      const sigH = (sig.height / sig.width) * sigW;
      page.drawImage(sig, { x: (W - sigW) / 2, y: y + 6, width: sigW, height: sigH });
    } catch {
      /* skip */
    }
  }

  page.drawLine({
    start: { x: W / 2 - 88, y }, end: { x: W / 2 + 88, y },
    thickness: 0.75, color: HULL,
  });
  y -= 15;
  drawCentred(page, `${data.facilitator} (Facilitator)`, sans, 11, y, HULL);

  // ── Footer ───────────────────────────────────────────────────────────────
  const base = data.verifyBaseUrl ?? "training.auk-maritime.com";
  page.drawLine({
    start: { x: 60, y: 118 }, end: { x: W - 60, y: 118 },
    thickness: 0.5, color: RULE,
  });

  const footerLines = [
    "Suite 33, Unit F1, 1st Floor, Tower A, Northlands Corner",
    "Shopping Centre, Hoogland, Ext-25, Johannesburg, South Africa",
    "admin@auk-maritime.com   ·   ashwani@auk-maritime.com",
  ];
  let fy = 102;
  for (const line of footerLines) {
    page.drawText(line, { x: 60, y: fy, size: 7.5, font: sans, color: MUTED });
    fy -= 11;
  }

  page.drawText(`Verify at ${base}/verify/${data.verifyToken}`, {
    x: 60, y: fy - 4, size: 7, font: sans, color: TEAL,
  });

  const stampBytes = await readAsset("company-stamp.png");
  if (stampBytes) {
    try {
      const stamp = await pdf.embedPng(stampBytes);
      const stampW = 95;
      const stampH = (stamp.height / stamp.width) * stampW;
      page.drawImage(stamp, { x: W - 60 - stampW, y: 58, width: stampW, height: stampH, opacity: 0.85 });
    } catch {
      /* skip */
    }
  }

  return pdf.save();
}
