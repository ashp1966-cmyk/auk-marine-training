"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);

  function load() {
    fetch("/api/courses?all=1").then((r) => r.json()).then((d) => setCourses(d.courses || []));
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold">Courses</h1>
        <Link href="/admin/courses/new" className="btn-primary">+ New course</Link>
      </div>
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-hull text-left text-white">
            <tr><th className="p-3">Code</th><th className="p-3">Title</th><th className="p-3">Price</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3 font-mono text-xs">{c.code}</td>
                <td className="p-3 font-semibold">{c.title}</td>
                <td className="p-3">{c.price === 0 ? "Learnership" : `R${(c.price / 100).toLocaleString()}`}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/courses/${c.id}`} className="btn-ghost mr-2">Edit</Link>
                  <button onClick={() => del(c.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
