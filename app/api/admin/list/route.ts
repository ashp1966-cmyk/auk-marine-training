import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  if (session.providerId !== null) {
    return NextResponse.json({ ok: false, error: "Only the AUK platform admin can view all admin accounts" }, { status: 403 });
  }

  const admins = await prisma.admin.findMany({ include: { provider: true }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({
    ok: true,
    admins: admins.map((a) => ({ id: a.id, email: a.email, providerId: a.providerId, providerName: a.provider?.name ?? null, createdAt: a.createdAt })),
  });
}
