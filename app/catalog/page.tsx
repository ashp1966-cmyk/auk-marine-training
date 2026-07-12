"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  Maritime: "#0B2A3D", IT: "#2D1B69", Automation: "#92400E",
  Business: "#065F46", Finance: "#713F12", Mining: "#7C2D12",
  SHE: "#831843", "Soft Skills": "#1E3A5F", Logistics: "#134E4A",
};
const CATEGORY_ICONS: Record<string, string> = {
  Maritime: "⚓", IT: "💻", Automation: "🤖", Business: "📊",
  Finance: "💰", Mining: "⛏️", SHE: "🦺", "Soft Skills": "🧠", Logistics: "🚢",
};

function CatalogInner() {
  const params = useSearchParams();
  const [courses, setCourses]   = useState<any[]>([]);
  const [catMeta, setCatMeta]   = useState<Record<string, any>>({});
  const [selected, setSelected] = useState<string | null>(params.get("cat") || null);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    fetch("/api/courses").then((r) => r.json()).then((d) => setCourses(d.courses || []));
    fetch("/api/categories").then((r) => r.json()).then((d) => {
      const map: Record<string, any> = {};
      (d.categories || []).forEach((c: any) => { map[c.name] = c; });
      setCatMeta(map);
    });
  }, []);

  // Only show categories that have at least 1 live course
  const categoryCounts: Record<string, number> = {};
  courses.forEach((c) => { categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1; });
  const categories = Object.keys(categoryCounts).sort();

  const visibleCourses = courses.filter((c) => {
    const matchCat = !selected || selected === "All" || c.category === selected;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // ── Category browser ────────────────────────────────────────────────────────
  if (!selected && !search) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-2">
          <input className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal focus:outline-none"
            placeholder="Search courses…" value={search} onChange={(e) => { setSearch(e.target.value); if (e.target.value) setSelected("All"); }} />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-hull">All Categories</h1>
        <p className="mt-1 text-gray-500">Choose a subject area to explore, or search above.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* All Courses tile */}
          <button onClick={() => setSelected("All")}
            className="group relative overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md bg-hull h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/60 to-transparent" />
            <div className="relative p-5 flex items-end h-full">
              <div>
                <div className="font-serif text-xl font-bold text-white">📚 All Courses</div>
                <div className="text-xs text-white/70 mt-0.5">{courses.length} courses</div>
              </div>
            </div>
          </button>

          {categories.map((cat) => {
            const meta = catMeta[cat];
            const color = meta?.color || CATEGORY_COLORS[cat] || "#12808c";
            const photo = meta?.photoUrl;
            const icon = CATEGORY_ICONS[cat] || "📚";
            return (
              <button key={cat} onClick={() => setSelected(cat)}
                className="group relative overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md h-32">
                {photo && <img src={photo} alt={cat} className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-50 transition" />}
                <div className="absolute inset-0" style={{ background: color, opacity: photo ? 0.7 : 1 }} />
                <div className="relative p-5 flex flex-col justify-end h-full">
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-serif text-lg font-bold text-white">{cat}</div>
                  <div className="text-xs text-white/60">{categoryCounts[cat]} course{categoryCounts[cat] !== 1 ? "s" : ""}</div>
                  {meta?.description && <div className="text-xs text-white/60 mt-0.5 line-clamp-1">{meta.description}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </main>
    );
  }

  // ── Course listing ──────────────────────────────────────────────────────────
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      {/* Breadcrumb + search row */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => { setSelected(null); setSearch(""); }}
          className="flex items-center gap-1 text-sm text-teal hover:underline">
          ← All categories
        </button>
        {selected && selected !== "All" && <><span className="text-gray-300">/</span><span className="font-semibold text-hull">{selected}</span></>}
        <input className="ml-auto rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:outline-none w-48"
          placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Category filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => { setSelected("All"); setSearch(""); }}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${selected === "All" && !search ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
          All ({courses.length})
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => { setSelected(cat); setSearch(""); }}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${selected === cat ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
            {cat} ({categoryCounts[cat]})
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-400">{visibleCourses.length} result{visibleCourses.length !== 1 ? "s" : ""}</p>

      {/* Udemy-style course grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCourses.map((c) => {
          const thumb = (c.photos as any[])?.[0]?.url;
          const color = catMeta[c.category]?.color || CATEGORY_COLORS[c.category] || "#12808c";
          return (
            <Link href={`/course/${c.id}`} key={c.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition hover:-translate-y-1 hover:shadow-md flex flex-col">
              {thumb
                ? <img src={thumb} alt={c.title} className="h-36 w-full object-cover" />
                : <div className="h-36 flex items-end p-3" style={{ background: color }}>
                    <span className="rounded bg-white/15 px-2 py-0.5 text-xs font-bold text-white">{c.category}</span>
                  </div>}
              <div className="flex flex-col flex-1 p-4">
                <span className="text-xs font-semibold text-teal">{c.category}</span>
                <h3 className="mt-1 font-semibold leading-snug line-clamp-2 flex-1">{c.title}</h3>
                {c.summary && <p className="mt-1 text-xs text-gray-400 line-clamp-2">{c.summary}</p>}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400">{c.durationLabel}</span>
                  <span className="font-bold text-hull">{c.price === 0 ? <span className="text-teal">Free</span> : `R${(c.price / 100).toLocaleString()}`}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {visibleCourses.length === 0 && <p className="mt-12 text-center text-gray-400">No courses found.</p>}
    </main>
  );
}

export default function Catalog() {
  return <Suspense fallback={<div className="p-10 text-gray-400">Loading…</div>}><CatalogInner /></Suspense>;
}
