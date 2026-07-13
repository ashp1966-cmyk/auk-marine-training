import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, name, courseId } = await req.json();
  if (!email || !courseId) return NextResponse.json({ ok: false, error: "email and courseId required" }, { status: 400 });

  const learner = await prisma.learner.upsert({
    where: { email },
    update: {},
    create: { name: name || email.split("@")[0], email },
  });

  const enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseId: { learnerId: learner.id, courseId } },
    update: {},
    create: { learnerId: learner.id, courseId },
  });

  return NextResponse.json({ ok: true, enrollment, learnerId: learner.id, learnerName: learner.name });
}
// Public (learner-facing): fetch a learner's enrollments by email.
// A real production build should put learners behind their own login too —
// this MVP identifies them by email, matching how bookings already work.
export async function GET(req: NextRequest) {
  const learnerId = req.nextUrl.searchParams.get("learnerId");
  const courseId  = req.nextUrl.searchParams.get("courseId");

  // Single enrollment check — used by BookingForm and course page
  if (learnerId && courseId) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { learnerId_courseId: { learnerId, courseId } },
    });
    return NextResponse.json({ ok: true, enrolled: !!enrollment, enrollment: enrollment || null });
  }

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
  const { learnerId, courseId, progress, quizScore, completedModules, notes } = await req.json();
  if (!learnerId || !courseId) return NextResponse.json({ ok: false, error: "Missing ids" }, { status: 400 });

  // Partial update — only touch fields actually sent, so a notes-only
  // autosave never wipes progress, and progress saves never wipe notes.
  const data: Record<string, any> = {};
  if (progress         !== undefined) data.progress         = progress;
  if (quizScore        !== undefined) data.quizScore        = quizScore;
  if (completedModules !== undefined) data.completedModules = completedModules;
  if (notes            !== undefined) data.notes            = String(notes).slice(0, 20000);

  const enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseId: { learnerId, courseId } },
    update: data,
    create: { learnerId, courseId, progress: progress ?? 0, quizScore, completedModules: completedModules ?? [], notes: notes ?? "" },
  });
  return NextResponse.json({ ok: true, enrollment });
}
