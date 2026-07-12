import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Executive dashboard stats — learners, enrollments, completion, revenue,
// per-course completion breakdown, recent activity.
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const courseScope = session.providerId ? { providerId: session.providerId } : {};

  const [learners, enrollments, bookings, paidBookings] = await Promise.all([
    prisma.learner.count(),
    prisma.enrollment.findMany({
      where: { course: courseScope },
      include: { course: { select: { id: true, title: true, code: true } }, learner: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count({ where: { course: courseScope } }),
    prisma.booking.findMany({ where: { course: courseScope, status: "Paid" }, select: { amountCents: true } }),
  ]);

  const revenue = paidBookings.reduce((s, b) => s + b.amountCents, 0);
  const completed = enrollments.filter((e) => e.progress >= 100).length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0;

  // Per-course completion breakdown
  const byCourse: Record<string, { title: string; code: string; total: number; done: number; avg: number }> = {};
  enrollments.forEach((e) => {
    const k = e.course.id;
    if (!byCourse[k]) byCourse[k] = { title: e.course.title, code: e.course.code, total: 0, done: 0, avg: 0 };
    byCourse[k].total++;
    byCourse[k].avg += e.progress;
    if (e.progress >= 100) byCourse[k].done++;
  });
  const courseStats = Object.values(byCourse)
    .map((c) => ({ ...c, avg: Math.round(c.avg / c.total) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const recent = enrollments.slice(0, 8).map((e) => ({
    learner: e.learner.name,
    course: e.course.title,
    progress: e.progress,
    at: e.createdAt,
  }));

  return NextResponse.json({
    ok: true,
    stats: {
      learners,
      enrollments: enrollments.length,
      completed,
      completionRate: enrollments.length ? Math.round((completed / enrollments.length) * 100) : 0,
      avgProgress,
      bookings,
      revenueCents: revenue,
    },
    courseStats,
    recent,
  });
}
