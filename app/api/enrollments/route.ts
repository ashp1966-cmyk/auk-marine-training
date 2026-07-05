import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public (learner-facing): fetch a learner's enrollments by email.
// A real production build should put learners behind their own login too —
// this MVP identifies them by email, matching how bookings already work.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
  const learner = await prisma.learner.findUnique({ where: { email } });
  if (!learner) return NextResponse.json({ ok: true, enrollments: [] });
  const enrollments = await prisma.enrollment.findMany({
    where: { learnerId: learner.id },
    include: { course: true },
  });
  return NextResponse.json({ ok: true, enrollments });
}

export async function PUT(req: NextRequest) {
  const { learnerId, courseId, progress, quizScore, completedModules } = await req.json();
  if (!learnerId || !courseId) return NextResponse.json({ ok: false, error: "Missing ids" }, { status: 400 });

  const enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseId: { learnerId, courseId } },
    update: { progress, quizScore, completedModules },
    create: { learnerId, courseId, progress: progress ?? 0, quizScore, completedModules: completedModules ?? [] },
  });
  return NextResponse.json({ ok: true, enrollment });
}
