import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";
import { gradeQuiz, sanitizeCompleted, computeProgress } from "@/lib/quizGrade";

/**
 * POST /api/quiz/submit  { courseId, answers: { "0": 1, "1": 3, ... } }
 *
 * The only place a quiz score is created. The server marks the answers against
 * the course's stored quiz; the browser never sees the right answers and can
 * not post a score. The best score is kept, so a worse retake never undoes a pass.
 * The response says which of the learner's answers were right, not what the
 * right answer was.
 */
export async function POST(req: NextRequest) {
  const session = await getLearnerSession();
  if (!session) return NextResponse.json({ ok: false, error: "Please sign in" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const courseId = String(body.courseId ?? "");
  if (!courseId) return NextResponse.json({ ok: false, error: "courseId required" }, { status: 400 });

  const enrollment = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId } },
    include: { course: { select: { modules: true, materials: true, videos: true, practical: true, quiz: true } } },
  });
  if (!enrollment) return NextResponse.json({ ok: false, error: "Not enrolled" }, { status: 404 });

  const graded = gradeQuiz(enrollment.course.quiz as any[], body.answers);
  if (!graded) return NextResponse.json({ ok: false, error: "Answer every question first" }, { status: 400 });

  const best = Math.max(enrollment.quizScore ?? 0, graded.score);
  const completed = sanitizeCompleted(enrollment.completedModules, enrollment.course);
  const updated = await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: { quizScore: best, completedModules: completed, progress: computeProgress(enrollment.course, completed, best) },
  });

  return NextResponse.json({
    ok: true,
    score: graded.score,
    passed: graded.passed,
    results: graded.results,
    enrollment: updated,
  });
}
