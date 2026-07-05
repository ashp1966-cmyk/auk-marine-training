"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ courses: 0, bookings: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/courses?all=1").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
    ]).then(([c, b]) => {
      const revenue = (b.bookings || []).filter((x: any) => x.status === "Paid").reduce((s: number, x: any) => s + x.amountCents, 0);
      setStats({ courses: (c.courses || []).length, bookings: (b.bookings || []).length, revenue });
    });
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5"><div className="text-xs text-gray-400">Courses</div><div className="font-serif text-3xl font-bold">{stats.courses}</div></div>
        <div className="card p-5"><div className="text-xs text-gray-400">Bookings</div><div className="font-serif text-3xl font-bold">{stats.bookings}</div></div>
        <div className="card p-5"><div className="text-xs text-gray-400">Revenue (paid)</div><div className="font-serif text-3xl font-bold">R{(stats.revenue / 100).toLocaleString()}</div></div>
      </div>
    </div>
  );
}
