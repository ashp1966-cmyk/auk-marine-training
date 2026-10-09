import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";
import { canEnrol } from "@/lib/entitlement";

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
  // Enrolment requires a signed-in learner, and the learner is taken from the
  // session — never from the request body — so nobody can enrol someone else.
  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: false, error: "Please sign in" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const courseId = body.courseId;
  if (!courseId) return NextResponse.json({ ok: false, error: "courseId required" }, { status: 400 });

  const learner = await prisma.learner.findUnique({ where: { id: session.learnerId } });
  if (!learner) return NextResponse.json({ ok: false, error: "Please sign in" }, { status: 401 });

  // Already enrolled (paid booking, team seat or free course created it): just return it.
  const existing = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: learner.id, courseId } },
  });
  if (existing) {
    return NextResponse.json({ ok: true, enrollment: existing, learnerId: learner.id, learnerName: learner.name });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId }, select: { price: true } });
  if (!course) return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });

  const [bookings, seat] = await Promise.all([
    prisma.booking.findMany({ where: { learnerId: learner.id, courseId }, select: { status: true } }),
    prisma.groupSeat.findFirst({ where: { learnerId: learner.id, group: { courseId, status: "Paid" } }, select: { id: true } }),
  ]);
  const allowed = canEnrol({
    coursePriceCents: course.price,
    bookingStatuses: bookings.map((b) => b.status),
    hasGroupSeat: !!seat,
  });
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "No paid booking found for this course. Please book and pay first." },
      { status: 403 }
    );
  }

  const enrollment = await prisma.enrollment.create({ data: { learnerId: learner.id, courseId } });
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
  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: false, error: "Please sign in" }, { status: 401 });

  const learnerId = req.nextUrl.searchParams.get("learnerId");
  const courseId = req.nextUrl.searchParams.get("courseId");

  // Single enrollment check — used by BookingForm and course page
  if (learnerId && courseId) {
    if (learnerId !== session.learnerId) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    const enrollment = await prisma.enrollment.findUnique({
      where: { learnerId_courseId: { learnerId, courseId } },
    });
    return NextResponse.json({ ok: true, enrolled: !!enrollment, enrollment: enrollment || null });
  }

  // A learner may only list their own enrollments.
  const email = normaliseEmail(req.nextUrl.searchParams.get("email") || session.email);
  if (email !== normaliseEmail(session.email)) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  const enrollments = await prisma.enrollment.findMany({
    where: { learnerId: session.learnerId },
    include: { course: true },
  });
  return NextResponse.json({ ok: true, enrollments });
}

export async function PUT(req: NextRequest) {
  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: false, error: "Please sign in" }, { status: 401 });

  const { learnerId, courseId, progress, quizScore, completedModules, notes } = await req.json();
  if (!learnerId || !courseId) return NextResponse.json({ ok: false, error: "Missing ids" }, { status: 400 });
  if (learnerId !== session.learnerId) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

  // Partial update — only touch fields actually sent, so a notes-only
  // autosave never wipes progress, and progress saves never wipe notes.
  const data: Record<string, any> = {};
  if (progress !== undefined) data.progress = progress;
  if (quizScore !== undefined) data.quizScore = quizScore;
  if (completedModules !== undefined) data.completedModules = completedModules;
  if (notes !== undefined) data.notes = String(notes).slice(0, 20000);

  // Update only — never create. An enrollment must come from a payment, a team
  // seat or a free course, not from a progress save.
  const existing = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId, courseId } },
  });
  if (!existing) return NextResponse.json({ ok: false, error: "Not enrolled" }, { status: 404 });
  const enrollment = await prisma.enrollment.update({
    where: { learnerId_courseId: { learnerId, courseId } },
    data,
  });
  return NextResponse.json({ ok: true, enrollment });
}
