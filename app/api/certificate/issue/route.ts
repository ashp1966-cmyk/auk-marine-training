import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";

/**
 * app/api/certificate/issue/route.ts
 *
 * Issues a certificate, freezing everything that gets printed.
 *
 * Certificate.learnerName / courseTitle / courseCode / completedOn are snapshot
 * columns — once written they are never re-read from the live Course or Learner
 * rows. A certificate has to keep saying what it said on the day it was awarded.
 * (Course titles do get edited: "HELM (Ships)" became "HELM (Ships) — Operational
 * Level" during authoring, which would silently have rewritten every certificate
 * already issued for it.)
 */

const PASS_MARK = 70; // TODO: move to Course.passMark — no such column yet

export async function POST(req: NextRequest) {
  const session = await getLearnerSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Sign in to claim your certificate" },
      { status: 401 }
    );
  }

  const { courseId, learnerName } = await req.json();

  if (!courseId) {
    return NextResponse.json({ ok: false, error: "No course specified" }, { status: 400 });
  }

  const cleanName = String(learnerName ?? "").trim().replace(/\s+/g, " ");
  if (cleanName.length < 2 || cleanName.length > 60) {
    return NextResponse.json(
      { ok: false, error: "Enter your full name as it should appear" },
      { status: 400 }
    );
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId } },
    include: { course: true },
  });

  if (!enrollment) {
    return NextResponse.json(
      { ok: false, error: "You are not enrolled on this course" },
      { status: 404 }
    );
  }

  // ── Eligibility ────────────────────────────────────────────────────────────
  // Quiz score only. Courses with a real practical component — HELM Management's
  // MV Stellenbosch case study, US-252437's recommendation task — cannot be
  // assessed by the platform, so this gate certifies less than those courses
  // claim to teach. Consider an admin release step for them.
  if ((enrollment.quizScore ?? 0) < PASS_MARK) {
    return NextResponse.json(
      { ok: false, error: `A score of ${PASS_MARK}% is needed to complete this course` },
      { status: 403 }
    );
  }

  // Already issued — return the existing one rather than creating a second.
  // @@unique([learnerId, courseId]) enforces this at the database level too.
  const existing = await prisma.certificate.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId } },
  });

  if (existing) {
    return NextResponse.json({
      ok: true,
      alreadyIssued: true,
      verifyToken: existing.verifyToken,
      certNumber: `AUK ${String(existing.seq).padStart(3, "0")}`,
    });
  }

  const cert = await prisma.certificate.create({
    data: {
      learnerId: session.learnerId,
      courseId,

      // Frozen at issue.
      learnerName: cleanName,
      courseTitle: enrollment.course.title,
      courseCode: enrollment.course.code,
      deliveryMode: "Held Online",
      // Self-paced online: the "course" ran from enrolment to completion, which
      // is what the printed date range shows.
      startedOn: enrollment.createdAt,
      completedOn: new Date(),
      score: enrollment.quizScore,
    },
  });

  return NextResponse.json({
    ok: true,
    verifyToken: cert.verifyToken,
    certNumber: `AUK ${String(cert.seq).padStart(3, "0")}`,
  });
}
