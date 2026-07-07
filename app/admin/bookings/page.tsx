"use client";
import { useEffect, useState } from "react";

const STATUSES = ["Pending", "Confirmed", "Paid", "Invoice sent", "Enrolled", "Cancelled"];

const STATUS_COLOR: Record<string, string> = {
  Paid:           "bg-green-100 text-green-700",
  Confirmed:      "bg-teal-100 text-teal-700",
  Enrolled:       "bg-blue-100 text-blue-700",
  Pending:        "bg-amber-100 text-amber-700",
  "Invoice sent": "bg-purple-100 text-purple-700",
  Cancelled:      "bg-gray-100 text-gray-500",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");

  function load() {
    fetch("/api/bookings").then((r) => r.json()).then((d) => setBookings(d.bookings || []));
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(ref: string, status: string) {
    await fetch(`/api/bookings/${ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function deleteBooking(ref: string, name: string) {
    if (!confirm(`Delete booking ${ref} for ${name}? This cannot be undone.`)) return;
    const res = await fetch(`/api/bookings/${ref}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.ok) return alert(data.error);
    load();
  }

  const visible = bookings.filter((b) => {
    const matchStatus = filter === "all" || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || b.ref.toLowerCase().includes(q) || b.learner.name.toLowerCase().includes(q)
      || b.learner.email.toLowerCase().includes(q) || b.course.title.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts: Record<string, number> = { all: bookings.length };
  bookings.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1; });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Bookings</h1>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input className="rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:outline-none"
          placeholder="Search name, email, ref…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex flex-wrap gap-1">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${filter === s ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
              {s === "all" ? "All" : s} {counts[s] !== undefined ? `(${counts[s]})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="card mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-hull text-left text-white">
            <tr>
              <th className="p-3">Ref</th>
              <th className="p-3">Course</th>
              <th className="p-3">Learner</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono text-xs text-gray-500">{b.ref}</td>
                <td className="p-3 max-w-[180px]">
                  <div className="font-semibold leading-tight">{b.course.title}</div>
                  <div className="text-xs text-gray-400">{b.course.code}</div>
                </td>
                <td className="p-3">
                  <div>{b.learner.name}</div>
                  <div className="text-xs text-gray-400">{b.learner.email}</div>
                </td>
                <td className="p-3 font-semibold">
                  {b.amountCents === 0 ? <span className="text-gray-400">Free</span> : `R${(b.amountCents / 100).toLocaleString()}`}
                </td>
                <td className="p-3">
                  <select value={b.status}
                    onChange={(e) => updateStatus(b.ref, e.target.value)}
                    className={`rounded border px-2 py-1 text-xs font-semibold ${STATUS_COLOR[b.status] || "bg-gray-100 text-gray-600"}`}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3 text-right">
                  {b.status !== "Paid" && (
                    <button onClick={() => deleteBooking(b.ref, b.learner.name)}
                      className="text-xs text-red-500 hover:text-red-700 hover:underline">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className="p-5 text-gray-400">No bookings match.</p>}
      </div>
    </div>
  );
}
