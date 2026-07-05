import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { consumeResetToken } from "@/lib/passwordReset";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();
  if (!token || !newPassword || newPassword.length < 8) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const adminId = await consumeResetToken(token, "admin");
  if (!adminId) return NextResponse.json({ ok: false, error: "This reset link is invalid or has expired" }, { status: 400 });

  await prisma.admin.update({ where: { id: adminId }, data: { passwordHash: await hashPassword(newPassword) } });
  return NextResponse.json({ ok: true });
}
