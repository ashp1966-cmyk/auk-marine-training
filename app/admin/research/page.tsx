"use client";
import { useEffect, useState } from "react";

const STATUSES = ["Planning", "Recruiting", "Active", "Complete"];

export default function AdminResearch() {
  const [list, setList]       = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null); // null = new, object = existing
  const [form, setForm]       = useState({ title: "", field: "", abstract: "", lead: "AUK Marine", seeking: "", providerId: "", status: "Planning" });
  const [interests, setInterests] = useState<{ [id: string]: any[] }>({});
  const [openInterests, setOpenInterests] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function load() {
    fetch("/api/research").then((r) => r.json()).then((d) => setList(d.research || []));
    fetch("/api/providers").then((r) => r.json()).then((d) => {
      setProviders(d.providers || []);
      if (d.providers?.[0] && !form.providerId) setForm((f) => ({ ...f, providerId: d.providers[0].id }));
    });
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    setEditing(null);
    setForm({ title: "", field: "", abstract: "", lead: "AUK Marine", seeking: "", providerId: providers[0]?.id || "", status: "Planning" });
    setShowForm(true);
  }

  function startEdit(r: any) {
    setEditing(r);
    setForm({ title: r.title, field: r.field, abstract: r.abstract, lead: r.lead, seeking: r.seeking, providerId: r.providerId, status: r.status });
    setShowForm(true);
  }

  async function save() {
    if (editing) {
      await fetch(`/api/research/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, collaborators: [] }) });
    } else {
      await fetch("/api/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, collaborators: [] }) });
    }
    setShowForm(false);
    load();
  }

  async function del(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/research/${id}`, { method: "DELETE" });
    load();
  }

  async function loadInterests(id: string) {
    if (openInterests === id) { setOpenInterests(null); return; }
    const res = await fetch(`/api/research/${id}/interest`);
    const data = await res.json();
    setInterests((prev) => ({ ...prev, [id]: data.interests || [] }));
    setOpenInterests(id);
  }

  async function setStatus(id: string, status: string) {
    await fetch(`/api/research/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold">Research Lab</h1>
        <button className="btn-primary" onClick={startNew}>+ New project</button>
      </div>

      <div className="card mt-5 divide-y">
        {list.map((r) => (
          <div key={r.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-teal">{r.field}</span>
                  <select value={r.status}
                    onChange={(e) => setStatus(r.id, e.target.value)}
                    className="rounded border border-gray-300 px-2 py-0.5 text-xs">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <h3 className="mt-1 font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{r.abstract}</p>
                {r.seeking && <p className="mt-1 text-xs text-gray-400">Seeking: {r.seeking}</p>}
              </div>
              <div className="flex flex-col gap-1 text-right">
                <button onClick={() => startEdit(r)} className="btn-ghost text-xs">Edit</button>
                <button onClick={() => loadInterests(r.id)} className="text-xs text-teal hover:underline">
                  Interests {openInterests === r.id ? "▲" : "▼"}
                </button>
                <button onClick={() => del(r.id, r.title)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>

            {/* Interest submissions */}
            {openInterests === r.id && (
              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">Collaboration interest submissions</h4>
                {(interests[r.id] || []).length === 0
                  ? <p className="text-xs text-gray-400">No expressions of interest yet.</p>
                  : (interests[r.id] || []).map((x) => (
                    <div key={x.id} className="mb-2 rounded border border-gray-200 bg-white p-3 text-sm">
                      <b>{x.name}</b> — {x.email} {x.org && `· ${x.org}`}
                      <div className="text-xs text-gray-400">{new Date(x.createdAt).toLocaleDateString()}</div>
                      {x.message && <p className="mt-1 text-gray-600">{x.message}</p>}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        ))}
        {list.length === 0 && <p className="p-4 text-gray-400">No research projects yet.</p>}
      </div>

      {/* Edit / New modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="card w-full max-w-lg p-6">
            <h2 className="font-serif text-xl font-bold">{editing ? "Edit project" : "New project"}</h2>
            <div className="mt-4 space-y-3">
              <div className="field"><label>Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="field"><label>Field / sector</label><input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="Maritime · Decarbonisation" /></div>
                <div className="field"><label>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="field"><label>Abstract</label><textarea rows={4} value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })} /></div>
              <div className="field"><label>Lead researcher</label><input value={form.lead} onChange={(e) => setForm({ ...form, lead: e.target.value })} /></div>
              <div className="field"><label>Seeking (what collaborators / data you need)</label><input value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} /></div>
              <div className="field"><label>Provider</label>
                <select value={form.providerId} onChange={(e) => setForm({ ...form, providerId: e.target.value })}>
                  {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary flex-1 justify-center" onClick={save} disabled={!form.title || !form.providerId}>
                {editing ? "Save changes" : "Create project"}
              </button>
              <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
