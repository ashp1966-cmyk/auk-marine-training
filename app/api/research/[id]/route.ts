import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const existing = await prisma.research.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (session.providerId && existing.providerId !== session.providerId) {
    return NextResponse.json({ ok: false, error: "You can only edit your own provider's projects" }, { status: 403 });
  }

  const body = await req.json();
  const project = await prisma.research.update({ where: { id: params.id }, data: body });
  return NextResponse.json({ ok: true, project });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const existing = await prisma.research.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (session.providerId && existing.providerId !== session.providerId) {
    return NextResponse.json({ ok: false, error: "You can only delete your own provider's projects" }, { status: 403 });
  }

  await prisma.research.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
