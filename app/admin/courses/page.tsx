"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CATEGORIES = ["Maritime","IT","Automation","Business","Finance","Mining","SHE","Soft Skills","Logistics"];

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [filter, setFilter]   = useState<"all"|"published"|"draft">("all");
  const [cat, setCat]         = useState("all");
  const [search, setSearch]   = useState("");

  function load() {
    fetch("/api/courses?all=1", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCourses(d.courses || []));
  }
  useEffect(() => { load(); }, []);

  async function toggle(id: string, current: boolean) {
    await fetch(`/api/courses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !current }),
      credentials: "include",
    });
    load();
  }

  async function del(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const visible = courses.filter((c) => {
    if (filter === "published" && !c.published) return false;
    if (filter === "draft" && c.published) return false;
    if (cat !== "all" && c.category !== cat) return false;
    const q = search.toLowerCase();
    if (q && !c.title.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q)) return false;
    return true;
  });

  const published = courses.filter((c) => c.published).length;
  const drafts    = courses.filter((c) => !c.published).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Courses</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="text-teal font-semibold">{published} published</span>
            {" · "}
            <span className="text-amber-600 font-semibold">{drafts} draft</span>
            {" · "}
            {courses.length} total
          </p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary">+ New course</Link>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input className="rounded border border-gray-300 px-3 py-1.5 text-sm w-44 focus:border-teal focus:outline-none"
          placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />

        {/* Status filter */}
        <div className="flex gap-1">
          {(["all","published","draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${filter === f ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
              {f === "all" ? `All (${courses.length})` : f === "published" ? `Live (${published})` : `Draft (${drafts})`}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <select value={cat} onChange={(e) => setCat(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-teal focus:outline-none">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="card mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-hull text-left text-white text-xs uppercase tracking-wide">
            <tr>
              <th className="p-3">Status</th>
              <th className="p-3">Code</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((c) => (
              <tr key={c.id} className={`border-t transition ${!c.published ? "bg-amber-50/50" : "hover:bg-gray-50"}`}>
                <td className="p-3">
                  <button onClick={() => toggle(c.id, c.published)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                      c.published
                        ? "bg-teal/10 text-teal hover:bg-red-50 hover:text-red-600"
                        : "bg-amber-100 text-amber-700 hover:bg-teal/10 hover:text-teal"
                    }`}
                    title={c.published ? "Click to unpublish" : "Click to publish"}>
                    {c.published ? "✓ Live" : "⚪ Draft"}
                  </button>
                </td>
                <td className="p-3 font-mono text-xs text-gray-400">{c.code}</td>
                <td className="p-3 font-semibold max-w-[200px] truncate">{c.title}</td>
                <td className="p-3 text-xs text-gray-500">{c.category}</td>
                <td className="p-3 font-semibold">
                  {c.price === 0 ? <span className="text-gray-400">Free</span> : `R${(c.price / 100).toLocaleString()}`}
                </td>
                <td className="p-3 text-right whitespace-nowrap space-x-2">
                  <Link href={`/course/${c.id}`} target="_blank" className="text-xs text-gray-400 hover:text-teal">Preview ↗</Link>
                  <Link href={`/admin/courses/${c.id}?tab=content`} className="text-xs text-blue-500 hover:underline">Content</Link>
                  <Link href={`/admin/courses/${c.id}?tab=quiz`} className="text-xs text-purple-500 hover:underline">Quiz</Link>
                  <Link href={`/admin/courses/${c.id}`} className="text-xs text-gray-600 hover:underline">Edit</Link>
                  <button onClick={() => del(c.id, c.title)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="p-6 text-center text-gray-400">
            {filter === "draft" ? "No draft courses — all courses are published." : 
             filter === "published" ? "No published courses yet — click ⚪ Draft to launch a course." :
             "No courses found."}
          </p>
        )}
      </div>

      {drafts > 0 && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          <b>⚠️ {drafts} draft course{drafts > 1 ? "s" : ""}</b> — learners cannot see or enrol in draft courses. 
          Click <b>⚪ Draft</b> on any row to publish it instantly.
        </div>
      )}
    </div>
  );
}
