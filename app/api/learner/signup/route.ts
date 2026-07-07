import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createLearnerSession } from "@/lib/learnerAuth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Rate limit signup — prevents bulk account creation / credential stuffing
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = await checkRateLimit(`learner-signup:${ip}`, 10, 60 * 60 * 1000); // 10 per hour per IP
  if (!rl.allowed) return NextResponse.json({ ok: false, error: "Too many requests — try again later" }, { status: 429 });
  const { name, email, password, consent } = await req.json();
  if (!email || !email.includes("@")) return NextResponse.json({ ok: false, error: "Enter a valid email" }, { status: 400 });
  if (!password || password.length < 8) return NextResponse.json({ ok: false, error: "Password must be at least 8 characters" }, { status: 400 });
  if (!consent) return NextResponse.json({ ok: false, error: "Consent is required" }, { status: 400 });

  const existing = await prisma.learner.findUnique({ where: { email } });
  if (existing?.passwordHash) {
    return NextResponse.json({ ok: false, error: "An account already exists for this email — sign in instead" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const learner = existing
    ? await prisma.learner.update({ where: { email }, data: { passwordHash, consentAt: new Date() } })
    : await prisma.learner.create({ data: { name: name || email.split("@")[0], email, passwordHash, consentAt: new Date() } });

  await createLearnerSession(learner.id, learner.email);
  return NextResponse.json({ ok: true, learner: { id: learner.id, name: learner.name, email: learner.email } });
}
