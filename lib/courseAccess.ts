import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";
import { getAdminSession } from "@/lib/auth";
import { canEnrol } from "@/lib/entitlement";

/**
 * Who may see a course's actual content (lesson text, videos, materials, quiz,
 * practical). Everyone else gets the outline only: topic names.
 *
 * Full access: an admin, a learner already enrolled, or a signed-in learner who
 * would be allowed to enrol (paid/confirmed booking, claimed team seat, or a
 * free course). The entitlement does not depend on the enrolment row existing
 * yet, so a learner returning from PayFast is never shown a blank course.
 */
export async function canViewFullCourse(course: { id: string; price: number }): Promise<boolean> {
  if (await getAdminSession()) return true;
  const session = await getLearnerSession();
  if (!session) return false;

  const existing = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId: course.id } },
    select: { id: true },
  });
  if (existing) return true;

  const [bookings, seat] = await Promise.all([
    prisma.booking.findMany({ where: { learnerId: session.learnerId, courseId: course.id }, select: { status: true } }),
    prisma.groupSeat.findFirst({ where: { learnerId: session.learnerId, group: { courseId: course.id, status: "Paid" } }, select: { id: true } }),
  ]);
  return canEnrol({
    coursePriceCents: course.price,
    bookingStatuses: bookings.map((b) => b.status),
    hasGroupSeat: !!seat,
  });
}

/** Outline only: topic names, no lesson text, quiz, videos, materials or practical. */
export function redactCourse<T extends Record<string, any>>(course: T): T {
  const modules = Array.isArray(course.modules) ? course.modules : [];
  return {
    ...course,
    modules: modules.map((m: any) => ({ title: m?.title ?? "", content: "" })),
    quiz: [],
    videos: [],
    materials: [],
    practical: {},
  };
}
