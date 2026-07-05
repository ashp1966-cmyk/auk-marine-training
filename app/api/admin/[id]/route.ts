import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  if (session.providerId !== null) {
    return NextResponse.json({ ok: false, error: "Only the AUK platform admin can revoke access" }, { status: 403 });
  }

  if (params.id === session.adminId) {
    return NextResponse.json({ ok: false, error: "You can't revoke your own access — ask another super-admin, or delete the row directly if you're truly locked out" }, { status: 400 });
  }

  const target = await prisma.admin.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });

  if (target.providerId === null) {
    const superAdminCount = await prisma.admin.count({ where: { providerId: null } });
    if (superAdminCount <= 1) {
      return NextResponse.json({ ok: false, error: "Can't remove the last platform super-admin" }, { status: 400 });
    }
  }

  await prisma.admin.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
