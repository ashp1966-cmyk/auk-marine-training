"use client";
import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => { fetch("/api/bookings").then((r) => r.json()).then((d) => setBookings(d.bookings || [])); }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Bookings</h1>
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-hull text-left text-white">
            <tr><th className="p-3">Ref</th><th className="p-3">Course</th><th className="p-3">Learner</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3 font-mono text-xs">{b.ref}</td>
                <td className="p-3">{b.course.title}</td>
                <td className="p-3">{b.learner.name}<div className="text-xs text-gray-400">{b.learner.email}</div></td>
                <td className="p-3">R{(b.amountCents / 100).toLocaleString()}</td>
                <td className="p-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${b.status === "Paid" ? "bg-green-100 text-green-700" : b.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p className="p-5 text-gray-400">No bookings yet.</p>}
      </div>
    </div>
  );
}
