import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Email normalisation.
 *
 * Learner.email carries a unique constraint on the exact string, so Postgres
 * treats "Kalpi1970@gmail.com" and "kalpi1970@gmail.com" as two different
 * people. That happened: a learner booked a course, could not find her booking
 * when she came back the next day because she typed a capital K, and booked the
 * same course again under what the system saw as a new identity.
 *
 * Every lookup and every create now goes through this. Change it in one place
 * only — app/api/learner/login/route.ts must normalise the same way, or a
 * learner can register with one casing and be unable to sign in with another.
 */
function normaliseEmail(raw: unknown): string {
  return String(raw ?? "").trim().toLowerCase();
}

/** Deliberately permissive — enough to catch a transposed field, not to police addresses. */
function looksLikeEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = normaliseEmail(body.email);
  const courseId = body.courseId;
  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");

  if (!email || !courseId) {
    return NextResponse.json({ ok: false, error: "email and courseId required" }, { status: 400 });
  }

  // Catches the transposed-fields case — a learner once ended up with the
  // password in `email` and the email address in `name`, which then printed
  // on a certificate.
  if (!looksLikeEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address" }, { status: 400 });
  }

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
//
// NOTE: this identifies a learner by email alone, with no authentication — so
// anyone who knows or guesses an address can read that learner's enrollments and
// progress. That was acceptable while the platform was a booking MVP. It is less
// so now that enrollments gate certificate issue. Worth moving behind
// getLearnerSession() when there is time.
export async function GET(req: NextRequest) {
  const learnerId = req.nextUrl.searchParams.get("learnerId");
  const courseId = req.nextUrl.searchParams.get("courseId");

  // Single enrollment check — used by BookingForm and course page
  if (learnerId && courseId) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { learnerId_courseId: { learnerId, courseId } },
    });
    return NextResponse.json({ ok: true, enrolled: !!enrollment, enrollment: enrollment || null });
  }

  const email = normaliseEmail(req.nextUrl.searchParams.get("email"));
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
  if (progress !== undefined) data.progress = progress;
  if (quizScore !== undefined) data.quizScore = quizScore;
  if (completedModules !== undefined) data.completedModules = completedModules;
  if (notes !== undefined) data.notes = String(notes).slice(0, 20000);

  const enrollment = await prisma.enrollment.upsert({
    where: { learnerId_courseId: { learnerId, courseId } },
    update: data,
    create: { learnerId, courseId, progress: progress ?? 0, quizScore, completedModules: completedModules ?? [], notes: notes ?? "" },
  });
  return NextResponse.json({ ok: true, enrollment });
}
