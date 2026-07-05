import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic"; // always show current data, never a stale build-time cache

export default async function Home() {
  const [featured, settings] = await Promise.all([
    prisma.course.findMany({ where: { featured: true, published: true }, include: { provider: true }, take: 6 }),
    prisma.siteSettings.upsert({ where: { id: "singleton" }, update: {}, create: { id: "singleton" } }),
  ]);

  return (
    <main>
      <section className="bg-gradient-to-br from-hull2 via-hull to-abyss px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-brass2">
            {settings.badge}
          </span>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-bold sm:text-5xl">
            {settings.heroTitle} <em className="text-brass2 font-normal">{settings.heroAccent}</em>
          </h1>
          <p className="mt-5 max-w-xl text-slate-300">{settings.heroLead}</p>
          <div className="mt-8 flex gap-3">
            <Link href="/catalog" className="btn-primary">Browse the catalogue</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-2xl font-bold text-hull">Featured courses</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => {
            const thumb = (c.photos as any[])?.[0]?.url;
            return (
              <Link href={`/course/${c.id}`} key={c.id} className="card block overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
                {thumb
                  ? <img src={thumb} alt={c.title} className="h-24 w-full object-cover" />
                  : <div className="h-24 bg-gradient-to-br from-hull to-teal" />}
                <div className="p-4">
                  <div className="text-xs font-mono text-teal">{c.code}</div>
                  <h3 className="mt-1 font-serif text-lg font-bold">{c.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{c.durationLabel}</span>
                    <span className="font-serif font-bold">{c.price === 0 ? "Learnership" : `R${(c.price / 100).toLocaleString()}`}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {featured.length === 0 && (
          <p className="mt-6 text-gray-500">No featured courses yet — add some from the Admin console.</p>
        )}
      </section>
    </main>
  );
}
