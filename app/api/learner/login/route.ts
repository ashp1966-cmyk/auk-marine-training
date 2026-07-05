import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { createLearnerSession } from "@/lib/learnerAuth";
import { checkRateLimit, clearRateLimit } from "@/lib/rateLimit";

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rlKey = `learner-login:${ip}`;
  const rl = await checkRateLimit(rlKey, MAX_ATTEMPTS, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, error: "Too many attempts — try again later" }, { status: 429 });
  }

  const { email, password } = await req.json();
  const learner = await prisma.learner.findUnique({ where: { email: (email || "").trim() } });
  const valid = learner?.passwordHash ? await verifyPassword(password || "", learner.passwordHash) : false;

  if (!valid) {
    return NextResponse.json({ ok: false, error: "Incorrect email or password" }, { status: 401 });
  }

  await clearRateLimit(rlKey);
  await createLearnerSession(learner!.id, learner!.email);
  return NextResponse.json({ ok: true, learner: { id: learner!.id, name: learner!.name, email: learner!.email } });
}
