import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";

export async function GET() {
  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: true, signedIn: false });
  const learner = await prisma.learner.findUnique({ where: { id: session.learnerId } });
  if (!learner) return NextResponse.json({ ok: true, signedIn: false });
  return NextResponse.json({ ok: true, signedIn: true, learner: { id: learner.id, name: learner.name, email: learner.email } });
}
