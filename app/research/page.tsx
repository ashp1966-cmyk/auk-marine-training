"use client";
import { useEffect, useState } from "react";

const STATUS_COLOR: Record<string, string> = {
  Active:     "bg-green-100 text-green-700",
  Recruiting: "bg-blue-100 text-blue-700",
  Planning:   "bg-amber-100 text-amber-700",
  Complete:   "bg-gray-100 text-gray-500",
};

const STATUSES = ["Planning", "Recruiting", "Active", "Complete"];

const EMPTY_FORM = { title: "", field: "", abstract: "", lead: "AUK Marine Training", seeking: "", status: "Planning" };

export default function Research() {
  const [research, setResearch]   = useState<any[]>([]);
  const [isAdmin, setIsAdmin]     = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Interest modal state
  const [selected, setSelected]   = useState<any>(null);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [org, setOrg]             = useState("");
  const [message, setMessage]     = useState("");
  const [sent, setSent]           = useState(false);
  const [busy, setBusy]           = useState(false);
  const [error, setError]         = useState("");

  // Edit modal state
  const [editing, setEditing]     = useState<any | null>(null);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);

  function load() {
    fetch("/api/research").then((r) => r.json()).then((d) => setResearch(d.research || []));
  }

  useEffect(() => {
    load();
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setIsAdmin(!!d.signedIn)).catch(() => {});
  }, []);

  const fields = ["All", ...Array.from(new Set(research.map((r) => r.field.split(" · ")[0]))).sort()];
  const visible = !activeField || activeField === "All"
    ? research
    : research.filter((r) => r.field.startsWith(activeField));

  // Interest submission
  async function submitInterest() {
    setBusy(true); setError("");
    const res = await fetch(`/api/research/${selected.id}/interest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, org, message }),
    });
    const data = await res.json();
    setBusy(false);
    if (!data.ok) return setError(data.error || "Something went wrong");
    setSent(true);
  }

  function openInterest(project: any) {
    setSelected(project); setSent(false);
    setName(""); setEmail(""); setOrg(""); setMessage(""); setError("");
  }

  // Research CRUD (admin only)
  function startNew() {
    setEditing(null); setForm(EMPTY_FORM); setShowForm(true);
  }
  function startEdit(r: any) {
    setEditing(r);
    setForm({ title: r.title, field: r.field, abstract: r.abstract, lead: r.lead, seeking: r.seeking, status: r.status });
    setShowForm(true);
  }

  async function saveResearch() {
    const method = editing ? "PUT" : "POST";
    const url    = editing ? `/api/research/${editing.id}` : "/api/research";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, collaborators: [], providerId: editing?.providerId || undefined }),
    });
    setShowForm(false);
    load();
  }

  async function deleteResearch(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/research/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">Research Lab</span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-hull">AUK Marine Research Lab</h1>
          <p className="mt-2 max-w-2xl text-gray-500">
            Applied research across maritime, mining, logistics, business, and technology. Click "Express interest" to collaborate.
          </p>
        </div>
        {isAdmin && (
          <button onClick={startNew} className="btn-primary mt-2 flex-shrink-0">+ Add project</button>
        )}
      </div>

      {/* Field filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {fields.map((f) => (
          <button key={f} onClick={() => setActiveField(f === "All" ? null : f)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${(!activeField && f === "All") || activeField === f ? "border-hull bg-hull text-white" : "border-gray-300 hover:border-hull"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {visible.map((r) => (
          <div key={r.id} className="card flex flex-col border-l-4 p-5" style={{ borderLeftColor: "#12808c" }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-teal">{r.field}</span>
                <h3 className="mt-1 font-serif text-lg font-bold leading-snug">{r.title}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLOR[r.status] || "bg-gray-100 text-gray-500"}`}>
                  {r.status}
                </span>
                {isAdmin && (
                  <>
                    <button onClick={() => startEdit(r)} className="text-xs text-teal hover:underline">Edit</button>
                    <button onClick={() => deleteResearch(r.id, r.title)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </>
                )}
              </div>
            </div>
            <p className="mt-3 flex-1 text-sm text-gray-600 line-clamp-4">{r.abstract}</p>
            <div className="mt-3 text-xs text-gray-400">Lead: {r.lead}</div>
            {r.seeking && <div className="mt-1 text-xs text-gray-400">Seeking: {r.seeking}</div>}
            <button onClick={() => openInterest(r)} className="btn-primary mt-4 justify-center text-sm">
              Express interest in collaborating
            </button>
          </div>
        ))}
        {visible.length === 0 && <p className="col-span-2 text-center text-gray-400">No research projects yet.</p>}
      </div>

      {/* Express Interest Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-xl font-bold">Express interest in collaborating</h2>
            <p className="mt-1 text-sm text-teal font-semibold">{selected.title}</p>
            {sent ? (
              <div className="mt-4">
                <p className="text-teal font-semibold">✓ Thank you!</p>
                <p className="mt-1 text-sm text-gray-500">We'll be in touch shortly.</p>
                <button className="btn-ghost mt-4 w-full justify-center" onClick={() => setSelected(null)}>Close</button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="field"><label>Full name *</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div className="field"><label>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                </div>
                <div className="field"><label>Organisation</label><input value={org} onChange={(e) => setOrg(e.target.value)} /></div>
                <div className="field"><label>How would you like to collaborate?</label>
                  <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-2">
                  <button className="btn-primary flex-1 justify-center" onClick={submitInterest} disabled={busy || !name || !email}>
                    {busy ? "Sending…" : "Submit interest"}
                  </button>
                  <button className="btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Edit/Add Modal */}
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
              <div className="field"><label>Seeking (collaborators / data needed)</label><input value={form.seeking} onChange={(e) => setForm({ ...form, seeking: e.target.value })} /></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary flex-1 justify-center" onClick={saveResearch} disabled={!form.title}>
                {editing ? "Save changes" : "Create project"}
              </button>
              <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
