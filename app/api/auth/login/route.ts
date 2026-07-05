import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createAdminSession } from "@/lib/auth";
import { checkRateLimit, clearRateLimit } from "@/lib/rateLimit";

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rlKey = `admin-login:${ip}`;
  const rl = await checkRateLimit(rlKey, MAX_ATTEMPTS, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, error: "Too many attempts — try again later" }, { status: 429 });
  }

  const { email, password } = await req.json();
  const admin = await prisma.admin.findUnique({ where: { email: (email || "").trim() } });

  const valid = admin ? await verifyPassword(password || "", admin.passwordHash) : false;

  if (!valid) {
    return NextResponse.json({ ok: false, error: "Incorrect email or passcode" }, { status: 401 });
  }

  await clearRateLimit(rlKey);
  await createAdminSession(admin!.id, admin!.email, admin!.providerId);
  return NextResponse.json({ ok: true });
}
