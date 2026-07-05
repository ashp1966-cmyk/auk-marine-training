import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.id }, include: { provider: true } });
  if (!course) return notFound();

  const outcomes = (course.outcomes as string[]) || [];
  const modules = (course.modules as { title: string; content: string }[]) || [];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="card overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-hull to-teal p-6 text-white">
              <span className="rounded bg-brass px-2 py-1 text-xs font-bold text-[#241505]">{course.code}</span>
              <h1 className="mt-3 font-serif text-3xl font-bold">{course.title}</h1>
              <p className="mt-1 text-sm text-slate-300">by {course.provider.name}</p>
            </div>
          </div>

          <div className="card mt-5 p-6">
            <h2 className="font-serif text-lg font-bold">About this course</h2>
            <p className="mt-2 text-gray-600">{course.summary}</p>
          </div>

          {outcomes.length > 0 && (
            <div className="card mt-5 p-6">
              <h2 className="font-serif text-lg font-bold">What you'll be able to do</h2>
              <ul className="mt-2 space-y-1 text-gray-600">
                {outcomes.map((o, i) => <li key={i}>✓ {o}</li>)}
              </ul>
            </div>
          )}

          {modules.length > 0 && (
            <div className="card mt-5 p-6">
              <h2 className="font-serif text-lg font-bold">Course content</h2>
              <div className="mt-2 space-y-2">
                {modules.map((m, i) => (
                  <details key={i} className="rounded border border-gray-200 p-3">
                    <summary className="cursor-pointer font-semibold">{i + 1}. {m.title}</summary>
                    <p className="mt-2 text-sm text-gray-600">{m.content}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        <BookingForm course={course} />
      </div>
    </main>
  );
}
