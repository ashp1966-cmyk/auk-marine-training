"use client";
import { useEffect, useState } from "react";

const STATUSES = ["Planning", "Active", "Recruiting", "Complete"];

export default function AdminResearch() {
  const [list, setList] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", field: "", abstract: "", lead: "AUK Marine", seeking: "", providerId: "", status: "Planning" });

  function load() {
    fetch("/api/research").then((r) => r.json()).then((d) => setList(d.research || []));
    fetch("/api/providers").then((r) => r.json()).then((d) => {
      setProviders(d.providers || []);
      if (d.providers?.[0] && !form.providerId) setForm((f) => ({ ...f, providerId: d.providers[0].id }));
    });
  }
  useEffect(() => { load(); }, []);

  async function create() {
    await fetch("/api/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, collaborators: [] }) });
    setForm({ ...form, title: "", abstract: "", seeking: "" });
    load();
  }

  async function setStatus(id: string, status: string) {
    await fetch(`/api/research/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  async function del(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/research/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Research Lab</h1>

      <div className="card mt-5 p-5">
        <h2 className="font-semibold">New project</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Field, e.g. Maritime · Decarbonisation" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} />
          <textarea className="col-span-2 rounded-md border border-gray-300 px-3 py-2" placeholder="Abstract" value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })} />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Seeking (e.g. data partners)" value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} />
          <select className="rounded-md border border-gray-300 px-3 py-2" value={form.providerId} onChange={(e) => setForm({ ...form, providerId: e.target.value })}>
            {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <button className="btn-primary mt-4" onClick={create} disabled={!form.title || !form.providerId}>Add project</button>
      </div>

      <div className="card mt-5 divide-y">
        {list.map((r) => (
          <div key={r.id} className="p-4">
            <div className="flex items-center justify-between">
              <b>{r.title}</b>
              <div className="flex items-center gap-2">
                <select className="rounded border border-gray-300 px-2 py-1 text-xs" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => del(r.id)} className="text-xs text-red-600 hover:underline">Delete</button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{r.abstract}</p>
          </div>
        ))}
        {list.length === 0 && <p className="p-4 text-gray-400">No research projects yet.</p>}
      </div>
    </div>
  );
}
