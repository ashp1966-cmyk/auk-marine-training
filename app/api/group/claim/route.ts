import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";
import { checkRateLimit } from "@/lib/rateLimit";
import { emailAllowed } from "@/lib/group";

// POST /api/group/claim { joinToken } — signed-in learner takes one seat.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = await checkRateLimit(`group-claim:${ip}`, 30, 10 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ ok: false, error: "Too many attempts — try again later" }, { status: 429 });

  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: false, error: "Please sign in first" }, { status: 401 });

  const { joinToken } = await req.json().catch(() => ({}));
  if (!joinToken) return NextResponse.json({ ok: false, error: "Missing link" }, { status: 400 });

  const [group, learner] = await Promise.all([
    prisma.groupBooking.findUnique({ where: { joinToken: String(joinToken) } }),
    prisma.learner.findUnique({ where: { id: session.learnerId } }),
  ]);
  if (!group || !learner) return NextResponse.json({ ok: false, error: "This link is not valid" }, { status: 404 });
  if (group.status !== "Paid") return NextResponse.json({ ok: false, error: "This link is not active yet" }, { status: 409 });
  if (!emailAllowed(learner.email, group.domainLock)) {
    return NextResponse.json({ ok: false, error: `Use your @${group.domainLock} email address to join` }, { status: 403 });
  }

  const goTo = `/course/${group.courseId}/learn`;

  // Idempotent: already holds a seat in this group, or already enrolled → no seat consumed.
  const [mySeat, enrolled] = await Promise.all([
    prisma.groupSeat.findUnique({ where: { groupId_learnerId: { groupId: group.id, learnerId: learner.id } } }),
    prisma.enrollment.findUnique({ where: { learnerId_courseId: { learnerId: learner.id, courseId: group.courseId } } }),
  ]);
  if (mySeat || enrolled) {
    if (!mySeat) await prisma.enrollment.upsert({ where: { learnerId_courseId: { learnerId: learner.id, courseId: group.courseId } }, update: {}, create: { learnerId: learner.id, courseId: group.courseId } });
    return NextResponse.json({ ok: true, redirect: goTo, already: true });
  }

  // Atomic seat reservation — two people clicking at once can't oversell.
  const reserved = await prisma.groupBooking.updateMany({
    where: { id: group.id, status: "Paid", claimed: { lt: group.seats } },
    data: { claimed: { increment: 1 } },
  });
  if (reserved.count === 0) return NextResponse.json({ ok: false, error: "All seats on this link have been taken" }, { status: 409 });

  try {
    await prisma.groupSeat.create({ data: { groupId: group.id, learnerId: learner.id } });
    await prisma.enrollment.upsert({
      where: { learnerId_courseId: { learnerId: learner.id, courseId: group.courseId } },
      update: {},
      create: { learnerId: learner.id, courseId: group.courseId },
    });
  } catch (e) {
    await prisma.groupBooking.update({ where: { id: group.id }, data: { claimed: { decrement: 1 } } }).catch(() => {});
    throw e;
  }
  return NextResponse.json({ ok: true, redirect: goTo });
}
