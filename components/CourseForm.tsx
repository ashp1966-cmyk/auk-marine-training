"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Maritime", "IT", "Automation", "Business", "Finance", "Mining", "SHE", "Soft Skills", "Logistics"];

type Module = { title: string; content: string };
type QuizQ = { q: string; options: string[]; answer: number };
type Video = { title: string; url: string };
type Photo = { url: string; caption: string };
type Material = { name: string; url: string; ext: string };

export default function CourseForm({ existing, initialTab }: { existing?: any; initialTab?: "basic" | "content" | "media" | "quiz" }) {
  const router = useRouter();
  const [providers, setProviders] = useState<any[]>([]);
  const [scopedProviderId, setScopedProviderId] = useState<string | null>(null);

  // Basic fields
  const [code, setCode] = useState(existing?.code || "AUK-" + Math.floor(Math.random() * 900 + 100));
  const [title, setTitle] = useState(existing?.title || "");
  const [category, setCategory] = useState(existing?.category || "Business");
  const [providerId, setProviderId] = useState(existing?.providerId || "");
  const [durationLabel, setDurationLabel] = useState(existing?.durationLabel || "1 day");
  const [priceRand, setPriceRand] = useState(existing ? existing.price / 100 : 2500);
  const [nqfLevel, setNqfLevel] = useState(existing?.nqfLevel || "");
  const [credits, setCredits] = useState(existing?.credits || "");
  
  const [featured, setFeatured] = useState(!!existing?.featured);
  const [published, setPublished] = useState(existing?.published !== false);

  // Content fields
  const [summary, setSummary] = useState(existing?.summary || "");
  const [outcomes, setOutcomes] = useState<string>((existing?.outcomes || []).join("\n"));
  const [modules, setModules] = useState<Module[]>(existing?.modules?.length ? existing.modules : [{ title: "", content: "" }]);
  const [practicalTitle, setPracticalTitle] = useState((existing?.practical as any)?.title || "");
  const [practicalDesc, setPracticalDesc] = useState((existing?.practical as any)?.description || "");

  // Media
  const [photos, setPhotos] = useState<Photo[]>(existing?.photos || []);
  const [videos, setVideos] = useState<Video[]>(existing?.videos || []);
  const [materials, setMaterials] = useState<Material[]>(existing?.materials || []);

  // Quiz
  const [quiz, setQuiz] = useState<QuizQ[]>(existing?.quiz || []);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "media" | "quiz">(initialTab || "basic");

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setScopedProviderId(d.providerId ?? null));
    fetch("/api/providers").then((r) => r.json()).then((d) => {
      const list = d.providers || [];
      setProviders(list);
      if (!providerId && list[0]) setProviderId(list[0].id);
    });
  }, []);

  async function uploadFile(file: File, kind: "photo" | "material") {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.ok) { alert(data.error); return; }
    if (kind === "photo") setPhotos((p) => [...p, { url: data.url, caption: data.name }]);
    else setMaterials((m) => [...m, { name: data.name, url: data.url, ext: data.ext }]);
  }

  // Quiz helpers
  function addQuestion() {
    setQuiz((q) => [...q, { q: "", options: ["", ""], answer: 0 }]);
  }
  function removeQuestion(qi: number) {
    setQuiz((q) => q.filter((_, i) => i !== qi));
  }
  function updateQuestion(qi: number, text: string) {
    setQuiz((q) => q.map((x, i) => i === qi ? { ...x, q: text } : x));
  }
  function addOption(qi: number) {
    setQuiz((q) => q.map((x, i) => i === qi && x.options.length < 4 ? { ...x, options: [...x.options, ""] } : x));
  }
  function updateOption(qi: number, oi: number, text: string) {
    setQuiz((q) => q.map((x, i) => i === qi ? { ...x, options: x.options.map((o, j) => j === oi ? text : o) } : x));
  }
  function setAnswer(qi: number, oi: number) {
    setQuiz((q) => q.map((x, i) => i === qi ? { ...x, answer: oi } : x));
  }

  async function save() {
    setBusy(true);
    setError("");
    const payload = {
      code, title, category, providerId,
      durationLabel, price: Math.round(priceRand * 100),
      nqfLevel: nqfLevel || null,
      credits: credits ? parseInt(credits) : null,
      featured, published,
      summary,
      outcomes: outcomes.split("\n").map((s) => s.trim()).filter(Boolean),
      modules: modules.filter((m) => m.title.trim()),
      practical: practicalTitle ? { title: practicalTitle, description: practicalDesc } : {},
      photos, videos, materials,
      quiz: quiz.filter((q) => q.q.trim() && q.options.filter(Boolean).length >= 2),
    };
    const res = existing
      ? await fetch(`/api/courses/${existing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setBusy(false);
    if (!data.ok) return setError(data.error || "Could not save");
    router.push("/admin/courses");
  }

  const tabs = [
    { key: "basic",   label: "1 · Basic info",           icon: "📋" },
    { key: "content", label: "2 · Lessons & modules",    icon: "📖" },
    { key: "media",   label: "3 · Photos, videos & files", icon: "🎬" },
    { key: "quiz",    label: `4 · Quiz (${quiz.length} Q)`, icon: "✅" },
  ] as const;

  return (
    <div className="card">
      {/* Tab nav — prominent so users know the 4 sections exist */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 pt-3">
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === t.key
                  ? "border border-b-0 border-gray-200 bg-white text-teal"
                  : "text-gray-500 hover:text-hull"
              }`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>
      <p className="bg-teal/5 px-5 py-2 text-xs text-teal border-b border-teal/10">
        Complete all 4 tabs to build a full course with content, videos and assessment quiz. Save each tab individually.
      </p>

      <div className="space-y-4 p-6">

        {/* ── BASIC INFO ── */}
        {activeTab === "basic" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="field"><label>Course code</label><input value={code} onChange={(e) => setCode(e.target.value)} /></div>
              <div className="field"><label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {scopedProviderId === null && providers.length > 1 && (
              <div className="field"><label>Provider</label>
                <select value={providerId} onChange={(e) => setProviderId(e.target.value)}>
                  {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            )}

            <div className="field"><label>Course title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="field"><label>Duration</label><input value={durationLabel} onChange={(e) => setDurationLabel(e.target.value)} placeholder="e.g. 2 days" /></div>
              <div className="field"><label>Price (ZAR) — 0 = learnership</label><input type="number" min={0} value={priceRand} onChange={(e) => setPriceRand(+e.target.value)} /></div>
              <div className="field"><label>NQF Level</label><input value={nqfLevel} onChange={(e) => setNqfLevel(e.target.value)} placeholder="e.g. Level 3" /></div>
              <div className="field"><label>Credits</label><input type="number" min={0} value={credits} onChange={(e) => setCredits(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="field"><label>Featured on homepage</label>
                <select value={featured ? "yes" : "no"} onChange={(e) => setFeatured(e.target.value === "yes")}>
                  <option value="no">No</option><option value="yes">Yes</option>
                </select>
              </div>
              <div className="field"><label>Published (visible to public)</label>
                <select value={published ? "yes" : "no"} onChange={(e) => setPublished(e.target.value === "yes")}>
                  <option value="yes">Yes</option><option value="no">No (draft)</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* ── CONTENT & MODULES ── */}
        {activeTab === "content" && (
          <>
            <div className="field"><label>Short summary (shown on listing cards)</label>
              <textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>

            <div className="field">
              <label>Learning outcomes — one per line</label>
              <textarea rows={4} value={outcomes} onChange={(e) => setOutcomes(e.target.value)}
                placeholder={"Understand core shipping terminology\nApply risk management frameworks\nConduct port inspections"} />
            </div>

            <div className="field">
              <label>Course modules</label>
              {modules.map((m, i) => (
                <div key={i} className="mb-3 rounded border border-gray-200 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-400">Module {i + 1}</span>
                    {modules.length > 1 && (
                      <button type="button" onClick={() => setModules((mm) => mm.filter((_, j) => j !== i))}
                        className="text-xs text-red-500 hover:underline">Remove</button>
                    )}
                  </div>
                  <input className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5" placeholder="Module title"
                    value={m.title} onChange={(e) => setModules((mm) => mm.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                  <textarea className="mt-2 w-full rounded border border-gray-300 px-2 py-1.5 text-sm" rows={3}
                    placeholder="What this module covers..."
                    value={m.content} onChange={(e) => setModules((mm) => mm.map((x, j) => j === i ? { ...x, content: e.target.value } : x))} />
                </div>
              ))}
              <button type="button" className="btn-ghost text-xs" onClick={() => setModules((m) => [...m, { title: "", content: "" }])}>
                + Add module
              </button>
            </div>

            <div className="rounded border border-gray-200 p-4">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Practical demonstration</label>
              <input className="mb-2 w-full rounded border border-gray-300 px-3 py-2" placeholder="Practical title (leave blank if none)"
                value={practicalTitle} onChange={(e) => setPracticalTitle(e.target.value)} />
              {practicalTitle && (
                <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm" rows={2}
                  placeholder="What learners will do in the practical..."
                  value={practicalDesc} onChange={(e) => setPracticalDesc(e.target.value)} />
              )}
            </div>
          </>
        )}

        {/* ── MEDIA ── */}
        {activeTab === "media" && (
          <>
            <div className="field">
              <label>Course photos — upload images</label>
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "photo")} />
              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="relative">
                      <img src={p.url} className="h-20 w-full rounded object-cover" />
                      <button onClick={() => setPhotos((pp) => pp.filter((_, j) => j !== i))}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] text-white">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="field">
              <label>Videos — YouTube, Vimeo, or direct MP4 links</label>
              {videos.map((v, i) => (
                <div key={i} className="mb-2 grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                  <input className="rounded border border-gray-300 px-2 py-1.5 text-sm" placeholder="Video title"
                    value={v.title} onChange={(e) => setVideos((vv) => vv.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                  <input className="rounded border border-gray-300 px-2 py-1.5 text-sm" placeholder="https://youtube.com/watch?v=..."
                    value={v.url} onChange={(e) => setVideos((vv) => vv.map((x, j) => j === i ? { ...x, url: e.target.value } : x))} />
                  <button onClick={() => setVideos((vv) => vv.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              ))}
              <button type="button" className="btn-ghost text-xs" onClick={() => setVideos((v) => [...v, { title: "", url: "" }])}>
                + Add video
              </button>
            </div>

            <div className="field">
              <label>Downloadable materials — PDF, Word, PowerPoint, Excel…</label>
              <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "material")} />
              {materials.length > 0 && (
                <div className="mt-2 space-y-1">
                  {materials.map((m, i) => (
                    <div key={i} className="flex items-center justify-between rounded border border-gray-200 px-3 py-1.5 text-sm">
                      <span>📎 {m.name}</span>
                      <button onClick={() => setMaterials((mm) => mm.filter((_, j) => j !== i))} className="text-xs text-red-500">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── QUIZ BUILDER ── */}
        {activeTab === "quiz" && (
          <>
            <p className="text-sm text-gray-500">Build multiple-choice questions. Learners need 60% to pass and unlock their certificate. Select the correct answer using the radio button.</p>

            {quiz.length === 0 && (
              <p className="rounded border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">No quiz questions yet. Click "+ Add question" to start.</p>
            )}

            {quiz.map((q, qi) => (
              <div key={qi} className="rounded border border-gray-200 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-400">Question {qi + 1}</span>
                  <button onClick={() => removeQuestion(qi)} className="text-xs text-red-500 hover:underline">Remove question</button>
                </div>
                <input className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Type your question here…"
                  value={q.q} onChange={(e) => updateQuestion(qi, e.target.value)} />

                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase">Answer options — click the circle to mark the correct one</p>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input type="radio" name={`q${qi}-answer`} checked={q.answer === oi}
                        onChange={() => setAnswer(qi, oi)}
                        className="h-4 w-4 accent-teal" />
                      <input className={`flex-1 rounded border px-2 py-1.5 text-sm ${q.answer === oi ? "border-teal bg-teal/5 font-semibold" : "border-gray-300"}`}
                        placeholder={`Option ${oi + 1}`}
                        value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} />
                      {q.options.length > 2 && (
                        <button onClick={() => setQuiz((qq) => qq.map((x, i) => i === qi ? { ...x, options: x.options.filter((_, j) => j !== oi), answer: x.answer >= oi ? Math.max(0, x.answer - 1) : x.answer } : x))}
                          className="text-xs text-gray-400 hover:text-red-500">×</button>
                      )}
                    </div>
                  ))}
                  {q.options.length < 4 && (
                    <button type="button" onClick={() => addOption(qi)}
                      className="text-xs text-teal hover:underline">+ Add option (max 4)</button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" className="btn-ghost" onClick={addQuestion}>+ Add question</button>
          </>
        )}

        {/* ── SAVE ── */}
        <div className="border-t border-gray-100 pt-4">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button className="btn-primary" disabled={busy || !title} onClick={save}>
              {busy ? "Saving…" : existing ? "Save changes" : "Publish course"}
            </button>
            <button className="btn-ghost" onClick={() => router.push("/admin/courses")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
