/**
 * Server-side quiz grading and progress.
 *
 * The browser used to mark the quiz itself (the answers were in the course JSON)
 * and send quizScore and progress to the server, which stored them. Anyone could
 * therefore submit a 100% score without passing and claim a certificate. Now the
 * server grades, and the browser never receives the answers.
 *
 * MUST match PASS_MARK in app/api/certificate/issue/route.ts and the learn page.
 */
export const PASS_MARK = 70;

export type QuizQuestion = { q?: string; options?: string[]; answer?: number };

export type GradeResult = { score: number; passed: boolean; results: boolean[] };

/** Returns null if the answers are incomplete or malformed. */
export function gradeQuiz(quiz: QuizQuestion[], answers: unknown): GradeResult | null {
  if (!Array.isArray(quiz) || quiz.length === 0 || !answers || typeof answers !== "object") return null;
  const given = answers as Record<string, unknown>;
  const results: boolean[] = [];
  for (let i = 0; i < quiz.length; i++) {
    const a = given[String(i)];
    const opts = quiz[i].options ?? [];
    if (typeof a !== "number" || !Number.isInteger(a) || a < 0 || a >= opts.length) return null;
    results.push(a === quiz[i].answer);
  }
  const correct = results.filter(Boolean).length;
  const score = Math.round((correct / quiz.length) * 100);
  return { score, passed: score >= PASS_MARK, results };
}

export type CourseShape = {
  modules?: unknown; materials?: unknown; videos?: unknown; practical?: unknown; quiz?: unknown;
};

const arr = (v: unknown): any[] => (Array.isArray(v) ? v : []);

/** Only keys that exist in this course are kept; anything else is dropped. */
export function sanitizeCompleted(keys: unknown, course: CourseShape): (number | string)[] {
  const moduleCount = arr(course.modules).length;
  const hasMats = arr(course.materials).length > 0;
  const hasVids = arr(course.videos).length > 0;
  const hasDemo = !!(course.practical as any)?.title;
  const out = new Set<number | string>();
  for (const k of arr(keys)) {
    if (typeof k === "number" && Number.isInteger(k) && k >= 0 && k < moduleCount) out.add(k);
    else if (k === "mats" && hasMats) out.add(k);
    else if (k === "vids" && hasVids) out.add(k);
    else if (k === "demo" && hasDemo) out.add(k);
  }
  return [...out];
}

/** Percent complete. Videos are optional extras and do not count towards the total. */
export function computeProgress(course: CourseShape, completed: (number | string)[], quizScore: number | null): number {
  const hasQuiz = arr(course.quiz).length > 0;
  const total =
    (arr(course.materials).length ? 1 : 0) +
    arr(course.modules).length +
    ((course.practical as any)?.title ? 1 : 0) +
    (hasQuiz ? 1 : 0);
  if (total === 0) return 0;
  let done = completed.filter((k) => k !== "quiz" && k !== "vids").length;
  if (hasQuiz && quizScore != null && quizScore >= PASS_MARK) done += 1;
  return Math.min(100, Math.round((done / total) * 100));
}
