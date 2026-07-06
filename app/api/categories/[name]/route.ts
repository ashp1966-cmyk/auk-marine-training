import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { name: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const category = await prisma.categoryMeta.upsert({
    where: { name: decodeURIComponent(params.name) },
    update: body,
    create: { name: decodeURIComponent(params.name), ...body },
  });
  return NextResponse.json({ ok: true, category });
}

export async function DELETE(_req: NextRequest, { params }: { params: { name: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  await prisma.categoryMeta.deleteMany({ where: { name: decodeURIComponent(params.name) } });
  return NextResponse.json({ ok: true });
}
