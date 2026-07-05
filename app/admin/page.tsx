"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({ courses: 0, bookings: 0, learners: 0, revenue: 0, pending: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/courses?all=1").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
      fetch("/api/sessions").then((r) => r.json()),
    ]).then(([c, b, s]) => {
      const bookings = b.bookings || [];
      const revenue = bookings.filter((x: any) => x.status === "Paid").reduce((sum: number, x: any) => sum + x.amountCents, 0);
      const pending = bookings.filter((x: any) => x.status === "Pending").length;
      const learnerIds = new Set(bookings.map((x: any) => x.learnerId));
      setStats({ courses: (c.courses || []).length, bookings: bookings.length, learners: learnerIds.size, revenue, pending });
      setRecent(bookings.slice(0, 5));
      const now = new Date();
      setUpcoming((s.sessions || []).filter((x: any) => new Date(x.date) >= now).slice(0, 5));
    });
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Dashboard</h1>

      {/* Stats row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Courses", value: stats.courses, link: "/admin/courses" },
          { label: "Bookings", value: stats.bookings, link: "/admin/bookings" },
          { label: "Learners", value: stats.learners, link: "/admin/bookings" },
          { label: "Pending payment", value: stats.pending, link: "/admin/bookings", highlight: stats.pending > 0 },
          { label: "Revenue (paid)", value: `R${(stats.revenue / 100).toLocaleString()}`, link: "/admin/bookings" },
        ].map((s) => (
          <Link href={s.link} key={s.label} className={`card block p-4 transition hover:-translate-y-0.5 ${(s as any).highlight ? "ring-2 ring-amber-400" : ""}`}>
            <div className="text-xs text-gray-400">{s.label}</div>
            <div className="font-serif text-2xl font-bold text-hull">{s.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent bookings */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-teal hover:underline">View all →</Link>
          </div>
          <div className="card mt-2 divide-y">
            {recent.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 text-sm">
                <div>
                  <div className="font-semibold">{b.learner?.name}</div>
                  <div className="text-xs text-gray-400">{b.course?.title}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.status === "Paid" ? "bg-green-100 text-green-700" : b.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                  {b.status}
                </span>
              </div>
            ))}
            {recent.length === 0 && <p className="p-4 text-sm text-gray-400">No bookings yet.</p>}
          </div>
        </div>

        {/* Upcoming sessions */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Upcoming sessions</h2>
            <Link href="/admin/schedule" className="text-xs text-teal hover:underline">Schedule →</Link>
          </div>
          <div className="card mt-2 divide-y">
            {upcoming.map((s) => (
              <div key={s.id} className="p-3 text-sm">
                <div className="font-semibold">{new Date(s.date).toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}</div>
                <div className="text-xs text-gray-400">{s.facilitator} · {s.mode} · {s.booked}/{s.capacity} booked</div>
              </div>
            ))}
            {upcoming.length === 0 && <p className="p-4 text-sm text-gray-400">No upcoming sessions — <Link href="/admin/schedule" className="text-teal underline">add one</Link>.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
