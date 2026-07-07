import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const research = await prisma.research.findMany({ include: { provider: true } });
  return NextResponse.json({ ok: true, research });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  // Super-admin has no providerId — use the AUK provider by default
  let providerId = session.providerId || body.providerId;
  if (!providerId) {
    const auk = await prisma.provider.findFirst({ where: { id: "auk-marine" } });
    providerId = auk?.id;
  }
  if (!providerId) return NextResponse.json({ ok: false, error: "Provider required" }, { status: 400 });
  const { collaborators, ...rest } = body;
  const project = await prisma.research.create({ data: { ...rest, providerId, collaborators: collaborators || [] } });
  return NextResponse.json({ ok: true, project });
}
