"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ALL = "All";

export default function Catalog() {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  useEffect(() => {
    fetch("/api/courses").then((r) => r.json()).then((d) => setCourses(d.courses || []));
  }, []);

  const categories = [ALL, ...Array.from(new Set(courses.map((c) => c.category))).sort()];

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === ALL || c.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">Course catalogue</h1>

      {/* Search + filter bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 sm:w-64"
          placeholder="Search courses…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeCategory === cat ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-400">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const thumb = (c.photos as any[])?.[0]?.url;
          return (
            <Link href={`/course/${c.id}`} key={c.id} className="card block overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
              {thumb
                ? <img src={thumb} alt={c.title} className="h-32 w-full object-cover" />
                : <div className="h-32 bg-gradient-to-br from-hull to-teal flex items-end p-3">
                    <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-white">{c.category}</span>
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

      {filtered.length === 0 && courses.length > 0 && (
        <div className="mt-12 text-center text-gray-400">No courses match your search — try a different keyword or category.</div>
      )}
    </main>
  );
}
