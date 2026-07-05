"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  function load() {
    fetch("/api/courses?all=1").then((r) => r.json()).then((d) => setCourses(d.courses || []));
  }
  useEffect(() => { load(); }, []);

  async function del(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    load();
  }

  async function toggleField(course: any, field: "featured" | "published") {
    await fetch(`/api/courses/${course.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...course, [field]: !course[field] }),
    });
    load();
  }

  const filtered = courses.filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold">Courses</h1>
        <Link href="/admin/courses/new" className="btn-primary">+ New course</Link>
      </div>

      <input className="mt-4 w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
        placeholder="Search by name or code…" value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="card mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-hull text-left text-white">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Featured</th>
              <th className="p-3 text-center">Published</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono text-xs text-gray-500">{c.code}</td>
                <td className="p-3">
                  <span className="font-semibold">{c.title}</span>
                  <div className="text-xs text-gray-400">{c.durationLabel}{c.nqfLevel ? ` · ${c.nqfLevel}` : ""}{c.credits ? ` · ${c.credits} credits` : ""}</div>
                </td>
                <td className="p-3 text-xs text-gray-500">{c.category}</td>
                <td className="p-3 font-semibold">{c.price === 0 ? <span className="text-teal text-xs">Learnership</span> : `R${(c.price / 100).toLocaleString()}`}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleField(c, "featured")}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.featured ? "bg-brass/20 text-brass" : "bg-gray-100 text-gray-400"}`}>
                    {c.featured ? "★ Yes" : "No"}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleField(c, "published")}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.published ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {c.published ? "Live" : "Draft"}
                  </button>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <Link href={`/course/${c.id}`} target="_blank" className="mr-3 text-xs text-gray-400 hover:text-teal">Preview ↗</Link>
                  <Link href={`/admin/courses/${c.id}`} className="btn-ghost mr-2 text-xs">Edit</Link>
                  <button onClick={() => del(c.id, c.title)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-5 text-center text-gray-400">No courses yet — click "+ New course" to add one.</p>}
      </div>
    </div>
  );
}
