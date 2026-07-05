import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, createAdminSession } from "@/lib/auth";

// Creates the admin account — but ONLY if no admin exists yet.
// This is enforced by the database, not by the browser, so it can't be replayed
// to create a second admin later even by someone who finds this endpoint.
export async function POST(req: NextRequest) {
  const existing = await prisma.admin.count();
  if (existing > 0) {
    return NextResponse.json({ ok: false, error: "An admin account already exists" }, { status: 409 });
  }

  const { email, password } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Enter a valid email" }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json({ ok: false, error: "Passcode must be at least 8 characters" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({ data: { email, passwordHash } });
  await createAdminSession(admin.id, admin.email);

  return NextResponse.json({ ok: true });
}
