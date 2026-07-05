"use client";
import { useState } from "react";
import Link from "next/link";

export default function Learn() {
  const [email, setEmail] = useState("");
  const [enrollments, setEnrollments] = useState<any[] | null>(null);
  const [busy, setBusy] = useState(false);

  async function lookup() {
    setBusy(true);
    const res = await fetch(`/api/enrollments?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    setEnrollments(data.enrollments || []);
    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">My Learning</h1>
      <p className="mt-2 text-gray-500">Enter the email you booked with to see your courses and progress.</p>
      <div className="mt-4 flex gap-2">
        <input className="flex-1 rounded-md border border-gray-300 px-3 py-2" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary" onClick={lookup} disabled={busy || !email}>Find my courses</button>
      </div>

      {enrollments && (
        <div className="mt-8 grid gap-4">
          {enrollments.length === 0 && <p className="text-gray-500">No courses found for that email yet.</p>}
          {enrollments.map((e) => (
            <Link href={`/course/${e.course.id}`} key={e.id} className="card block p-5 transition hover:-translate-y-0.5">
              <div className="text-xs font-mono text-teal">{e.course.code}</div>
              <h3 className="font-serif text-lg font-bold">{e.course.title}</h3>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-teal" style={{ width: `${e.progress}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-500">{e.progress}% complete</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
