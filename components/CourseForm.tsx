"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Maritime", "IT", "Automation", "Business", "Finance", "Mining", "SHE", "Soft Skills", "Logistics"];

export default function CourseForm({ existing }: { existing?: any }) {
  const router = useRouter();
  const [providers, setProviders] = useState<any[]>([]);
  const [code, setCode] = useState(existing?.code || "AUK-" + Math.floor(Math.random() * 900 + 100));
  const [title, setTitle] = useState(existing?.title || "");
  const [category, setCategory] = useState(existing?.category || "Business");
  const [providerId, setProviderId] = useState(existing?.providerId || "");
  const [durationLabel, setDurationLabel] = useState(existing?.durationLabel || "1 day");
  const [priceRand, setPriceRand] = useState(existing ? existing.price / 100 : 2500);
  const [modes, setModes] = useState<string[]>(existing?.modes || ["virtual", "classroom"]);
  const [summary, setSummary] = useState(existing?.summary || "");
  const [outcomes, setOutcomes] = useState((existing?.outcomes || []).join("\n"));
  const [modules, setModules] = useState<{ title: string; content: string }[]>(existing?.modules || [{ title: "", content: "" }]);
  const [photos, setPhotos] = useState<{ url: string; caption: string }[]>(existing?.photos || []);
  const [materials, setMaterials] = useState<{ name: string; url: string; ext: string }[]>(existing?.materials || []);
  const [quiz, setQuiz] = useState<{ q: string; options: string[]; answer: number }[]>(existing?.quiz || []);
  const [featured, setFeatured] = useState(!!existing?.featured);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/providers").then((r) => r.json()).then((d) => {
      const list = d.providers || [];
      setProviders(list);
      if (!providerId && list[0]) setProviderId(list[0].id);
    });
  }, []);

  function toggleMode(m: string) {
    setModes((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  async function uploadFile(file: File, kind: "photo" | "material") {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.ok) { alert(data.error); return; }
    if (kind === "photo") setPhotos((p) => [...p, { url: data.url, caption: data.name }]);
    else setMaterials((m) => [...m, { name: data.name, url: data.url, ext: data.ext }]);
  }

  async function save() {
    setBusy(true);
    setError("");
    const payload = {
      code, title, category, providerId, durationLabel,
      price: Math.round(priceRand * 100),
      modes, summary,
      outcomes: outcomes.split("\n").map((s) => s.trim()).filter(Boolean),
      modules: modules.filter((m) => m.title.trim()),
      photos, materials, quiz,
      featured, published: true,
    };
    const res = existing
      ? await fetch(`/api/courses/${existing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setBusy(false);
    if (!data.ok) return setError(data.error || "Could not save");
    router.push("/admin/courses");
  }

  return (
    <div className="card space-y-5 p-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="field"><label>Course code</label><input value={code} onChange={(e) => setCode(e.target.value)} /></div>
        <div className="field"><label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="field"><label>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="field"><label>Duration label</label><input value={durationLabel} onChange={(e) => setDurationLabel(e.target.value)} /></div>
        <div className="field"><label>Price (ZAR, 0 = learnership)</label><input type="number" value={priceRand} onChange={(e) => setPriceRand(+e.target.value)} /></div>
        <div className="field"><label>Featured?</label>
          <select value={featured ? "yes" : "no"} onChange={(e) => setFeatured(e.target.value === "yes")}>
            <option value="no">No</option><option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>Delivery modes</label>
        <div className="flex gap-2">
          {["virtual", "classroom", "online", "onsite"].map((m) => (
            <button key={m} type="button" onClick={() => toggleMode(m)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${modes.includes(m) ? "border-teal bg-teal text-white" : "border-gray-300"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="field"><label>Summary</label><textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} /></div>
      <div className="field"><label>Outcomes (one per line)</label><textarea rows={3} value={outcomes} onChange={(e) => setOutcomes(e.target.value)} /></div>

      <div className="field">
        <label>Modules</label>
        {modules.map((m, i) => (
          <div key={i} className="mb-2 rounded border border-gray-200 p-3">
            <input className="mb-2 w-full rounded border border-gray-300 px-2 py-1" placeholder="Module title" value={m.title}
              onChange={(e) => setModules((mm) => mm.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
            <textarea className="w-full rounded border border-gray-300 px-2 py-1" placeholder="Module content" value={m.content}
              onChange={(e) => setModules((mm) => mm.map((x, j) => j === i ? { ...x, content: e.target.value } : x))} />
          </div>
        ))}
        <button type="button" className="btn-ghost text-xs" onClick={() => setModules((m) => [...m, { title: "", content: "" }])}>+ Add module</button>
      </div>

      <div className="field">
        <label>Photos</label>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "photo")} />
        <div className="mt-2 flex gap-2">
          {photos.map((p, i) => <img key={i} src={p.url} className="h-16 w-16 rounded object-cover" />)}
        </div>
      </div>

      <div className="field">
        <label>Materials (PDF, Word, PPT…)</label>
        <input type="file" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "material")} />
        <div className="mt-2 space-y-1 text-sm">
          {materials.map((m, i) => <div key={i}>📎 {m.name}</div>)}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary" disabled={busy || !title || !providerId} onClick={save}>
        {busy ? "Saving…" : existing ? "Save changes" : "Publish course"}
      </button>
    </div>
  );
}
