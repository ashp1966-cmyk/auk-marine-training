import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createAdminSession } from "@/lib/auth";

// A simple in-memory rate limiter per server instance — slows down brute-force
// guessing. For serious traffic, replace with a durable store (e.g. Upstash Redis).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.resetAt > now && rec.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ ok: false, error: "Too many attempts — try again later" }, { status: 429 });
  }

  const { email, password } = await req.json();
  const admin = await prisma.admin.findUnique({ where: { email: (email || "").trim() } });

  const valid = admin ? await verifyPassword(password || "", admin.passwordHash) : false;

  if (!valid) {
    const next = rec && rec.resetAt > now ? { count: rec.count + 1, resetAt: rec.resetAt } : { count: 1, resetAt: now + WINDOW_MS };
    attempts.set(ip, next);
    return NextResponse.json({ ok: false, error: "Incorrect email or passcode" }, { status: 401 });
  }

  attempts.delete(ip);
  await createAdminSession(admin!.id, admin!.email);
  return NextResponse.json({ ok: true });
}
