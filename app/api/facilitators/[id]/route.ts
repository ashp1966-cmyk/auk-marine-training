import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const facilitator = await prisma.facilitator.update({ where: { id: params.id }, data: body });
  return NextResponse.json({ ok: true, facilitator });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  await prisma.facilitator.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
