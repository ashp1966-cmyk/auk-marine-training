"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  Maritime:    "#0B2A3D",
  IT:          "#2D1B69",
  Automation:  "#92400E",
  Business:    "#065F46",
  Finance:     "#713F12",
  Mining:      "#7C2D12",
  SHE:         "#831843",
  "Soft Skills": "#1E3A5F",
  Logistics:   "#134E4A",
};

export default function Catalog() {
  const [courses, setCourses]     = useState<any[]>([]);
  const [catMeta, setCatMeta]     = useState<Record<string, any>>({});
  const [selected, setSelected]   = useState<string | null>(null); // null = browse, "All" = all courses
  const [search, setSearch]       = useState("");

  useEffect(() => {
    fetch("/api/courses").then((r) => r.json()).then((d) => setCourses(d.courses || []));
    fetch("/api/categories").then((r) => r.json()).then((d) => {
      const map: Record<string, any> = {};
      (d.categories || []).forEach((c: any) => { map[c.name] = c; });
      setCatMeta(map);
    });
  }, []);

  // Build category list from courses
  const categoryCounts: Record<string, number> = {};
  courses.forEach((c) => { categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1; });
  const categories = Object.keys(categoryCounts).sort();

  // Filtered courses for the selected category / search
  const visibleCourses = courses.filter((c) => {
    const matchCat = !selected || selected === "All" || c.category === selected;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // ── Category grid ────────────────────────────────────────────────────────────
  if (!selected) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-serif text-3xl font-bold text-hull">Course catalogue</h1>
        <p className="mt-2 text-gray-500">Choose a category to explore, or browse everything at once.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* All Courses tile */}
          <button onClick={() => setSelected("All")}
            className="group relative overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            style={{ background: "#0B2A3D" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-teal/60 to-transparent" />
            <div className="relative p-6">
              <div className="text-4xl mb-2">📚</div>
              <h2 className="font-serif text-xl font-bold text-white">All Courses</h2>
              <p className="mt-1 text-sm text-white/70">{courses.length} courses across all subjects</p>
            </div>
          </button>

          {/* Category tiles */}
          {categories.map((cat) => {
            const meta = catMeta[cat];
            const color = meta?.color || CATEGORY_COLORS[cat] || "#12808c";
            const photo = meta?.photoUrl;
            const desc = meta?.description;
            return (
              <button key={cat} onClick={() => setSelected(cat)}
                className="group relative overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                style={{ background: color }}>
                {photo && <img src={photo} alt={cat} className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-40 transition" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative p-6">
                  <h2 className="font-serif text-xl font-bold text-white">{cat}</h2>
                  {desc && <p className="mt-1 text-sm text-white/80 line-clamp-2">{desc}</p>}
                  <p className="mt-2 text-xs font-semibold text-white/60">{categoryCounts[cat]} course{categoryCounts[cat] !== 1 ? "s" : ""}</p>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    );
  }

  // ── Course grid (selected category) ─────────────────────────────────────────
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex items-center gap-3">
        <button onClick={() => { setSelected(null); setSearch(""); }}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-hull">
          ← Categories
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-bold text-hull">
          {selected === "All" ? "All Courses" : selected}
        </h1>
      </div>

      {/* Search + category switcher */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-teal focus:outline-none w-56"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setSelected("All"); setSearch(""); }}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${selected === "All" ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setSelected(cat); setSearch(""); }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${selected === cat ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-400">{visibleCourses.length} course{visibleCourses.length !== 1 ? "s" : ""}</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map((c) => {
          const thumb = (c.photos as any[])?.[0]?.url;
          const color = catMeta[c.category]?.color || CATEGORY_COLORS[c.category] || "#12808c";
          return (
            <Link href={`/course/${c.id}`} key={c.id} className="card block overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
              {thumb
                ? <img src={thumb} alt={c.title} className="h-32 w-full object-cover" />
                : <div className="h-32 flex items-end p-3" style={{ background: color }}>
                    <span className="rounded bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">{c.category}</span>
                  </div>}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-teal">{c.code}</span>
                  <span className="rounded-full bg-foam px-2 py-0.5 text-xs text-gray-500">{c.durationLabel}</span>
                </div>
                <h3 className="mt-1 font-serif text-lg font-bold leading-snug">{c.title}</h3>
                {c.summary && <p className="mt-1 line-clamp-2 text-xs text-gray-500">{c.summary}</p>}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400">{c.category}</span>
                  <span className="font-serif font-bold text-hull">{c.price === 0 ? "Learnership" : `R${(c.price / 100).toLocaleString()}`}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {visibleCourses.length === 0 && <p className="mt-12 text-center text-gray-400">No courses match your search.</p>}
    </main>
  );
}
