"use client";
import { useEffect, useState } from "react";

export default function Facilitators() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "", country: "", bio: "", consent: false });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch("/api/facilitators").then((r) => r.json()).then((d) => setList(d.facilitators || []));
  }, []);

  async function apply() {
    const res = await fetch("/api/facilitators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.ok) setSent(true);
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">Our facilitators</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {list.map((f) => (
          <div key={f.id} className="card p-5">
            <div className="font-serif text-lg font-bold">{f.name}</div>
            <div className="text-sm text-gray-500">{f.role}</div>
            <p className="mt-2 text-sm text-gray-600">{f.bio}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 p-6">
        <h2 className="font-serif text-xl font-bold">Apply to facilitate</h2>
        {sent ? (
          <p className="mt-3 text-teal">Thanks — your application is in for review.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Role / title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            <textarea className="col-span-2 rounded-md border border-gray-300 px-3 py-2" placeholder="Short bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            <label className="col-span-2 flex gap-2 text-xs text-gray-600">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
              I consent to AUK Marine processing my information to review this application (POPIA).
            </label>
            <button className="btn-primary col-span-2 justify-center" onClick={apply} disabled={!form.name || !form.email || !form.consent}>
              Submit application
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
