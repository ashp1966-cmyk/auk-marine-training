"use client";
import { useEffect, useState } from "react";

const ALL_CATEGORIES = ["Maritime", "IT", "Automation", "Business", "Finance", "Mining", "SHE", "Soft Skills", "Logistics"];

const DEFAULTS: Record<string, string> = {
  Maritime:    "#0B2A3D",
  IT:          "#2D1B69",
  Automation:  "#92400E",
  Business:    "#065F46",
  Finance:     "#713F12",
  Mining:      "#7C2D12",
  SHE:         "#831843",
  "Soft Skills": "#1E3A5F",
  Logistics:   "#134E4A",
};

export default function AdminCategories() {
  const [metas, setMetas]   = useState<Record<string, any>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor]   = useState("#12808c");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved]   = useState(false);

  function load() {
    fetch("/api/categories").then((r) => r.json()).then((d) => {
      const map: Record<string, any> = {};
      (d.categories || []).forEach((c: any) => { map[c.name] = c; });
      setMetas(map);
    });
  }
  useEffect(() => { load(); }, []);

  function startEdit(cat: string) {
    const m = metas[cat];
    setEditing(cat);
    setPhotoUrl(m?.photoUrl || "");
    setDescription(m?.description || "");
    setColor(m?.color || DEFAULTS[cat] || "#12808c");
    setSaved(false);
  }

  async function uploadPhoto(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.ok) setPhotoUrl(data.url);
    else alert(data.error);
  }

  async function save() {
    if (!editing) return;
    await fetch(`/api/categories/${encodeURIComponent(editing)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoUrl, description, color }),
    });
    setSaved(true);
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Categories</h1>
      <p className="mt-1 text-sm text-gray-500">Add a photo, description and colour for each category card on the public catalogue page.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_CATEGORIES.map((cat) => {
          const m = metas[cat];
          const color = m?.color || DEFAULTS[cat] || "#12808c";
          const photo = m?.photoUrl;
          return (
            <div key={cat} className="card overflow-hidden">
              <div className="relative h-28 flex items-end p-3" style={{ background: color }}>
                {photo && <img src={photo} alt={cat} className="absolute inset-0 h-full w-full object-cover opacity-40" />}
                <span className="relative font-serif text-lg font-bold text-white drop-shadow">{cat}</span>
              </div>
              <div className="p-4">
                {m?.description && <p className="text-xs text-gray-500 line-clamp-2">{m.description}</p>}
                <button className="btn-ghost mt-3 w-full justify-center text-xs" onClick={() => startEdit(cat)}>
                  {m ? "Edit photo & info" : "Add photo & info"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit drawer / modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-md p-6">
            <h2 className="font-serif text-xl font-bold">{editing}</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Category photo</label>
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
                {uploading && <p className="mt-1 text-xs text-gray-400">Uploading…</p>}
                {photoUrl && (
                  <div className="mt-2 relative">
                    <img src={photoUrl} className="h-28 w-full rounded object-cover" />
                    <button onClick={() => setPhotoUrl("")}
                      className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] text-white">×</button>
                  </div>
                )}
              </div>
              <div className="field">
                <label>Description (shown on the category card)</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="A short description of what courses in this category cover…" />
              </div>
              <div className="field">
                <label>Background colour (used when no photo, or as overlay tint)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded border border-gray-300" />
                  <span className="text-sm text-gray-500">{color}</span>
                </div>
              </div>
              {/* Preview */}
              <div className="relative h-20 overflow-hidden rounded-lg flex items-end p-3" style={{ background: color }}>
                {photoUrl && <img src={photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
                <span className="relative font-serif font-bold text-white drop-shadow">{editing} — preview</span>
              </div>
              {saved && <p className="text-sm text-teal">✓ Saved</p>}
              <div className="flex gap-2">
                <button className="btn-primary flex-1 justify-center" onClick={save}>Save</button>
                <button className="btn-ghost" onClick={() => setEditing(null)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
