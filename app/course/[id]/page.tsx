import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { getLearnerSession } from "@/lib/learnerAuth";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { provider: true },
  });
  if (!course) return notFound();

  const [settings, session] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    getLearnerSession(),
  ]);

  // Check if learner is already enrolled
  const enrollment = session
    ? await prisma.enrollment.findUnique({
        where: { learnerId_courseId: { learnerId: session.learnerId, courseId: course.id } },
      })
    : null;

  const outcomes = (course.outcomes as string[]) || [];
  const modules  = (course.modules as { title: string; content: string }[]) || [];
  const photos   = (course.photos as any[]) || [];
  const thumb    = photos[0]?.url;

  // Total estimated duration from modules
  const totalMins = modules.reduce((s, m) => s + Math.max(2, Math.round((m.content || "").split(/\s+/).length / 180)), 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Course hero — dark banner like Udemy */}
      <div className="bg-hull text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          <div>
            {/* Breadcrumb */}
            <nav className="mb-3 flex items-center gap-1.5 text-xs text-white/50">
              <Link href="/catalog" className="hover:text-white">Catalogue</Link>
              <span>/</span>
              <Link href={`/catalog?cat=${encodeURIComponent(course.category)}`} className="hover:text-white">{course.category}</Link>
            </nav>

            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-slate-300 text-base max-w-xl">{course.summary}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="rounded bg-brass/20 border border-brass/30 px-2 py-0.5 text-xs font-bold text-brass2">{course.code}</span>
              <span>🕐 {course.durationLabel}{totalMins > 0 ? ` · ~${totalMins} min content` : ""}</span>
              <span>🖥️ Self-paced</span>
              {course.nqfLevel && <span>📋 NQF {course.nqfLevel}</span>}
              {course.credits && <span>· {course.credits} credits</span>}
            </div>

            <div className="mt-4 text-sm text-white/60">
              Offered by <span className="font-semibold text-white">{course.provider.name}</span>
            </div>
          </div>

          {/* Sidebar: enrolled learners go straight to LMS, others see booking form */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-xl">
              {thumb
                ? <img src={thumb} alt={course.title} className="h-40 w-full object-cover" />
                : <div className="h-40 bg-gradient-to-br from-teal to-hull" />}
              {enrollment ? (
                <EnrolledCard courseId={course.id} progress={enrollment.progress} />
              ) : (
                <BookingForm course={{ ...course, _payfastEnabled: settings?.payfastEnabled }} />
              )}
            </div>
            <Link href={`/course/${course.id}/learn`} className="mt-2 block text-center text-xs text-teal hover:underline">
              Preview in LMS →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile booking/enrolled card */}
      <div className="mx-auto max-w-xl px-5 pt-6 lg:hidden">
        {thumb && <img src={thumb} alt={course.title} className="h-40 w-full rounded-xl object-cover mb-4" />}
        {enrollment ? (
          <EnrolledCard courseId={course.id} progress={enrollment.progress} />
        ) : (
          <BookingForm course={{ ...course, _payfastEnabled: settings?.payfastEnabled }} />
        )}
        <Link href={`/course/${course.id}/learn`} className="mt-2 block text-center text-xs text-teal hover:underline">
          Preview in LMS →
        </Link>
      </div>

      {/* Course body */}
      <div className="mx-auto max-w-6xl px-5 py-8 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
        <div className="space-y-6">
          {/* What you'll learn */}
          {outcomes.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="font-serif text-xl font-bold text-hull">What you'll learn</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 flex-shrink-0 text-teal font-bold">✓</span>
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course content / syllabus */}
          {modules.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-xl font-bold text-hull">Course content</h2>
                <span className="text-xs text-gray-400">{modules.length} lessons</span>
              </div>
              <div className="mt-4 divide-y divide-gray-100">
                {modules.map((m, i) => {
                  const mins = Math.max(2, Math.round((m.content || "").split(/\s+/).length / 180));
                  return (
                    <details key={i} className="group py-3">
                      <summary className="flex cursor-pointer items-center justify-between gap-2 text-sm font-semibold list-none">
                        <span className="flex items-center gap-2">
                          <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-gray-200 text-xs text-gray-400">{i + 1}</span>
                          {m.title}
                        </span>
                        <span className="flex-shrink-0 text-xs text-gray-400">{mins} min</span>
                      </summary>
                      {m.content && (
                        <p className="mt-2 pl-8 text-sm text-gray-500 leading-relaxed">{m.content}</p>
                      )}
                    </details>
                  );
                })}
              </div>
            </div>
          )}

          {/* About the provider */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-xl font-bold text-hull">About {course.provider.name}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {(course.provider as any).tagline || "Accredited training provider — Est. 2012 & 2017. TETA-accredited, delivering maritime, mining, logistics, business, IT and soft-skills training."}
            </p>
            <Link href="/facilitators" className="mt-3 inline-block text-sm text-teal hover:underline">Meet our facilitators →</Link>
          </div>
        </div>

        {/* Desktop sticky sidebar placeholder (booking card already shown above) */}
        <div className="hidden lg:block" />
      </div>
    </main>
  );
}

// Shown instead of the booking form when the learner is already enrolled
function EnrolledCard({ courseId, progress }: { courseId: string; progress: number }) {
  const R = 24, C = 2 * Math.PI * R;
  return (
    <div className="bg-white p-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={R} fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx="30" cy="30" r={R} fill="none" stroke="#12808c" strokeWidth="5"
            strokeLinecap="round" strokeDasharray={C}
            strokeDashoffset={C - (progress / 100) * C}
            transform="rotate(-90 30 30)" />
          <text x="30" y="35" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0B2A3D">{progress}%</text>
        </svg>
        <div className="text-left">
          <div className="font-semibold text-hull">
            {progress >= 100 ? "✓ Completed!" : progress > 0 ? "In progress" : "Not started"}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {progress >= 100 ? "Certificate ready to download" : `${progress}% complete`}
          </div>
        </div>
      </div>
      <Link href={`/course/${courseId}/learn`}
        className="block w-full rounded-lg bg-teal py-3 text-center font-bold text-white hover:bg-teal/90 transition">
        {progress > 0 ? "Continue learning →" : "Start course →"}
      </Link>
      <p className="mt-3 text-xs text-gray-400">You have full access to this course</p>
    </div>
  );
}
