"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.ok) setData(d); });
  }, []);

  if (!data) return <div className="p-10 text-gray-400">Loading dashboard…</div>;

  const s = data.stats;
  const cards = [
    { label: "Learners",        value: s.learners,                                     accent: "text-hull" },
    { label: "LMS enrollments", value: s.enrollments,                                  accent: "text-hull" },
    { label: "Completed",       value: s.completed,                                    accent: "text-teal" },
    { label: "Completion rate", value: `${s.completionRate}%`,                         accent: "text-teal" },
    { label: "Avg progress",    value: `${s.avgProgress}%`,                            accent: "text-amber-600" },
    { label: "Revenue (paid)",  value: `R${(s.revenueCents / 100).toLocaleString()}`,  accent: "text-hull" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Live LMS performance at a glance.</p>

      {/* Executive stat cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="card p-4 text-center">
            <div className={`font-serif text-2xl font-bold ${c.accent}`}>{c.value}</div>
            <div className="mt-0.5 text-xs text-gray-400">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Per-course completion */}
        <div className="card p-5">
          <h2 className="font-semibold">Completion by course</h2>
          <p className="text-xs text-gray-400">Top courses by enrollment — average learner progress</p>
          <div className="mt-4 space-y-3">
            {data.courseStats.length === 0 && <p className="text-sm text-gray-400">No enrollments yet.</p>}
            {data.courseStats.map((c: any) => (
              <div key={c.code}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="truncate font-medium">{c.title}</span>
                  <span className="ml-2 flex-shrink-0 text-xs text-gray-400">{c.done}/{c.total} done · avg {c.avg}%</span>
                </div>
                <div className="mt-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-2.5 rounded-full bg-teal transition-all" style={{ width: `${c.avg}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent enrollments */}
        <div className="card p-5">
          <h2 className="font-semibold">Recent LMS activity</h2>
          <p className="text-xs text-gray-400">Latest enrollments and their progress</p>
          <div className="mt-3 divide-y">
            {data.recent.length === 0 && <p className="py-3 text-sm text-gray-400">No activity yet.</p>}
            {data.recent.map((r: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div className="min-w-0">
                  <div className="font-medium">{r.learner}</div>
                  <div className="truncate text-xs text-gray-400">{r.course}</div>
                </div>
                <span className={`ml-3 flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${r.progress >= 100 ? "bg-teal/10 text-teal" : r.progress > 0 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                  {r.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[["/admin/courses", "Manage courses"], ["/admin/bookings", "Bookings"], ["/admin/research", "Research"], ["/admin/categories", "Categories"], ["/admin/settings", "Settings"]].map(([href, label]) => (
          <Link key={href} href={href} className="btn-ghost text-sm">{label} →</Link>
        ))}
      </div>
    </div>
  );
}
