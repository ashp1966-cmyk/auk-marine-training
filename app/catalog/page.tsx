import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Catalog() {
  const courses = await prisma.course.findMany({ where: { published: true }, include: { provider: true }, orderBy: { createdAt: "desc" } });

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">All courses</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link href={`/course/${c.id}`} key={c.id} className="card block overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
            <div className="h-24 bg-gradient-to-br from-hull to-teal" />
            <div className="p-4">
              <div className="text-xs font-mono text-teal">{c.code}</div>
              <h3 className="mt-1 font-serif text-lg font-bold">{c.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{c.category} · {c.durationLabel}</span>
                <span className="font-serif font-bold">{c.price === 0 ? "Learnership" : `R${(c.price / 100).toLocaleString()}`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {courses.length === 0 && <p className="mt-6 text-gray-500">No courses published yet.</p>}
    </main>
  );
}
