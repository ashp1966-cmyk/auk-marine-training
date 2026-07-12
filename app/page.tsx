import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const CATEGORY_ICONS: Record<string, string> = {
  Maritime: "⚓", IT: "💻", Automation: "🤖", Business: "📊",
  Finance: "💰", Mining: "⛏️", SHE: "🦺", "Soft Skills": "🧠", Logistics: "🚢",
};

export default async function Home() {
  const [featured, settings, allCourses, catMetas] = await Promise.all([
    prisma.course.findMany({ where: { featured: true, published: true }, include: { provider: true }, take: 8 }),
    prisma.siteSettings.upsert({ where: { id: "singleton" }, update: {}, create: { id: "singleton" } }),
    prisma.course.findMany({ where: { published: true }, select: { category: true } }),
    prisma.categoryMeta.findMany(),
  ]);

  const catCounts: Record<string, number> = {};
  allCourses.forEach((c) => { catCounts[c.category] = (catCounts[c.category] || 0) + 1; });
  const catMetaMap: Record<string, any> = {};
  catMetas.forEach((m) => { catMetaMap[m.name] = m; });
  const categories = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-hull2 via-hull to-abyss px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-brass2">
            {settings.badge}
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold sm:text-5xl leading-tight">
            {settings.heroTitle} <em className="text-brass2 font-normal not-italic">{settings.heroAccent}</em>
          </h1>
          <p className="mt-5 max-w-xl text-slate-300 text-lg">{settings.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary text-base px-6 py-3">Browse all courses</Link>
            <Link href="/learn" className="rounded-lg border border-white/20 px-6 py-3 text-base font-semibold hover:bg-white/10 transition">My Learning</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <span>✓ {allCourses.length}+ courses</span>
            <span>✓ Self-paced online</span>
            <span>✓ TETA accredited</span>
            <span>✓ PDF certificates</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-serif text-2xl font-bold text-hull">Browse by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map(([cat, count]) => {
            const meta = catMetaMap[cat];
            const color = meta?.color || "#0B2A3D";
            const icon = CATEGORY_ICONS[cat] || "📚";
            return (
              <Link key={cat} href={`/catalog?cat=${encodeURIComponent(cat)}`}
                className="group relative overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                {meta?.photoUrl
                  ? <img src={meta.photoUrl} alt={cat} className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-40 transition" />
                  : null}
                <div className="absolute inset-0" style={{ background: color, opacity: meta?.photoUrl ? 0.7 : 1 }} />
                <div className="relative p-4">
                  <div className="text-2xl">{icon}</div>
                  <div className="mt-1 font-semibold text-white text-sm leading-tight">{cat}</div>
                  <div className="mt-0.5 text-[11px] text-white/60">{count} course{count !== 1 ? "s" : ""}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured courses — Udemy-style horizontal scroll on mobile */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl font-bold text-hull">Featured courses</h2>
              <Link href="/catalog" className="text-sm text-teal hover:underline">See all →</Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((c) => {
                const thumb = (c.photos as any[])?.[0]?.url;
                return (
                  <Link href={`/course/${c.id}`} key={c.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-md border border-gray-100">
                    {thumb
                      ? <img src={thumb} alt={c.title} className="h-36 w-full object-cover" />
                      : <div className="h-36 bg-gradient-to-br from-hull to-teal flex items-end p-3">
                          <span className="rounded bg-white/15 px-2 py-0.5 text-xs font-bold text-white">{c.category}</span>
                        </div>}
                    <div className="p-4">
                      <span className="text-xs font-semibold text-teal">{c.category}</span>
                      <h3 className="mt-1 font-semibold leading-snug line-clamp-2">{c.title}</h3>
                      <p className="mt-1 text-xs text-gray-400">{c.provider.name}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-xs text-gray-400">{c.durationLabel}</span>
                        <span className="font-bold text-hull">{c.price === 0 ? "Free" : `R${(c.price / 100).toLocaleString()}`}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Trust bar */}
      <section className="border-t border-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-hull">37+</div>
              <div className="mt-1 text-sm text-gray-500">Years combined facilitator experience</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-hull">800+</div>
              <div className="mt-1 text-sm text-gray-500">Learners trained nationally</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-hull">TETA</div>
              <div className="mt-1 text-sm text-gray-500">Accredited training service provider</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
