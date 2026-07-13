import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public API — anyone can verify a certificate token programmatically
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const cert = await prisma.certificate.findUnique({
    where: { verifyToken: params.token },
    include: {
      learner: { select: { name: true } },
      course:  { select: { title: true, code: true, nqfLevel: true, credits: true } },
    },
  });
  if (!cert) return NextResponse.json({ valid: false, error: "Certificate not found" }, { status: 404 });
  return NextResponse.json({
    valid: true,
    learner: cert.learner.name,
    course: cert.course.title,
    code: cert.course.code,
    issuedAt: cert.issuedAt,
    issuedBy: "AUK Marine and Mining (Pty) Ltd",
  });
}
