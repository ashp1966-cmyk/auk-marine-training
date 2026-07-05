import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin, verifyPassword, hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ ok: false, error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
  if (!admin) return NextResponse.json({ ok: false, error: "Account not found" }, { status: 404 });

  const valid = await verifyPassword(currentPassword || "", admin.passwordHash);
  if (!valid) return NextResponse.json({ ok: false, error: "Current password is incorrect" }, { status: 401 });

  await prisma.admin.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(newPassword) } });
  return NextResponse.json({ ok: true });
}
