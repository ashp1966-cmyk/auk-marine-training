import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateCertificatePdf } from "@/lib/cert/generateCertificatePdf";

/**
 * app/api/certificate/[token]/pdf/route.ts
 *
 * Serves the certificate as a downloadable PDF.
 *
 * ACCESS: by verification token, same as /verify/[token]. That page is already
 * public — an employer checking a certificate has the token and nothing else —
 * so gating the PDF behind a learner session would make it unusable for the one
 * audience that most needs it. The token is an unguessable cuid and is the only
 * credential.
 *
 * REVOKED certificates return 410 Gone rather than a PDF. A withdrawn
 * certificate that still downloads cleanly is worse than no download at all.
 *
 * Node runtime is required — pdf-lib and node:fs are not available on edge.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const cert = await prisma.certificate.findUnique({
    where: { verifyToken: params.token },
  });

  if (!cert) {
    return NextResponse.json({ ok: false, error: "Certificate not found" }, { status: 404 });
  }

  if (cert.revokedAt) {
    return NextResponse.json(
      { ok: false, error: "This certificate has been withdrawn and is no longer available" },
      { status: 410 }
    );
  }

  const certNumber = `AUK ${String(cert.seq).padStart(3, "0")}`;

  // Everything below comes from the certificate's own snapshot columns, never
  // from a live join to Course or Learner. The PDF must say what it said on the
  // day it was issued.
  const host = req.headers.get("host") ?? "training.auk-maritime.com";
  const verifyBaseUrl = host.includes("localhost") ? host : "training.auk-maritime.com";

  const pdfBytes = await generateCertificatePdf({
    certNumber,
    learnerName: cert.learnerName,
    courseTitle: cert.courseTitle,
    courseCode: cert.courseCode,
    deliveryMode: cert.deliveryMode,
    startedOn: cert.startedOn,
    completedOn: cert.completedOn,
    facilitator: cert.facilitator,
    verifyToken: cert.verifyToken,
    verifyBaseUrl,
  });

  // Filename the learner will see in their downloads folder. A seafarer emailing
  // this to a manning agent should not be attaching "download.pdf".
  const safeName = cert.learnerName.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const safeCode = cert.courseCode.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const filename = `AUK-${certNumber.replace(/\s+/g, "")}-${safeCode}-${safeName}.pdf`;

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
