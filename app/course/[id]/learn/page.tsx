"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Module = { title: string; content: string };
type QuizQ = { q: string; options: string[]; answer: number };
type Video = { title: string; url: string };
type Item = { key: string | number; label: string; kind: "mats" | "vids" | "module" | "demo" | "quiz" | "cert"; minutes?: number };

const readMins = (text: string) => Math.max(2, Math.round((text || "").split(/\s+/).length / 180));

export default function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse]         = useState<any>(null);
  const [email, setEmail]           = useState("");
  const [name, setName]             = useState("");
  const [enrollment, setEnrollment] = useState<any>(null);
  const [active, setActive]         = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [retaking, setRetaking]     = useState(false);
  const [started, setStarted]       = useState(false);
  const [navOpen, setNavOpen]       = useState(false);
  const [saving, setSaving]         = useState(false);
  const [notes, setNotes]           = useState("");
  const [notesOpen, setNotesOpen]   = useState(false);
  const [notesSaved, setNotesSaved] = useState(true);
  const notesTimer = useRef<any>(null);
  const didResume = useRef(false);

  // Restore mid-quiz answers from localStorage (survives refresh)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(`auk-quiz-${id}`);
    if (saved) { try { setQuizAnswers(JSON.parse(saved)); } catch {} }
  }, [id]);
  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(quizAnswers).length)
      localStorage.setItem(`auk-quiz-${id}`, JSON.stringify(quizAnswers));
  }, [quizAnswers, id]);

  useEffect(() => {
    fetch(`/api/courses/${id}`).then((r) => r.json()).then((d) => setCourse(d.course));
    fetch("/api/learner/me", { credentials: "include" }).then((r) => r.json()).then((d) => {
      if (d.signedIn) { setEmail(d.learner.email); setName(d.learner.name); autoStart(d.learner.email, d.learner.name); }
    });
  }, [id]);

  async function autoStart(em: string, nm: string) {
    const res = await fetch("/api/enrollments", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: em, name: nm, courseId: id }),
    });
    const data = await res.json();
    if (data.ok) { setEnrollment({ ...data.enrollment, learnerId: data.learnerId }); setStarted(true); }
  }

  async function start() {
    const res = await fetch("/api/enrollments", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, courseId: id }),
    });
    const data = await res.json();
    if (data.ok) { setEnrollment({ ...data.enrollment, learnerId: data.learnerId }); setStarted(true); }
  }

  const modules: Module[] = course?.modules || [];
  const materials = course?.materials || [];
  const videos: Video[]   = course?.videos || [];
  const quiz: QuizQ[]     = course?.quiz || [];
  const completed: (number | string)[] = enrollment?.completedModules || [];

  const items: Item[] = useMemo(() => !course ? [] : [
    ...(materials.length ? [{ key: "mats", label: "Course materials", kind: "mats" as const, minutes: 5 }] : []),
    ...(videos.length ? [{ key: "vids", label: `Videos (${videos.length})`, kind: "vids" as const, minutes: videos.length * 8 }] : []),
    ...modules.map((m, i) => ({ key: i, label: m.title, kind: "module" as const, minutes: readMins(m.content) })),
    ...(course.practical?.title ? [{ key: "demo", label: "Practical demonstration", kind: "demo" as const, minutes: 10 }] : []),
    ...(quiz.length ? [{ key: "quiz", label: "Assessment quiz", kind: "quiz" as const, minutes: quiz.length * 2 }] : []),
    // Certificate only for paid courses
    ...(course.price > 0 ? [{ key: "cert", label: "Certificate", kind: "cert" as const }] : []),
  ], [course]);

  // Auto-resume: jump to first incomplete item once, when enrollment loads
  useEffect(() => {
    if (!enrollment || !items.length || didResume.current) return;
    didResume.current = true;
    const saved = typeof window !== "undefined" ? localStorage.getItem(`auk-pos-${id}`) : null;
    if (saved !== null && Number(saved) < items.length) { setActive(Number(saved)); return; }
    const firstIncomplete = items.findIndex((it) =>
      it.kind === "quiz" ? enrollment.quizScore == null || enrollment.quizScore < 60
      : it.kind === "cert" ? false
      : !completed.includes(it.key));
    setActive(firstIncomplete === -1 ? items.length - 1 : firstIncomplete);
  }, [enrollment, items]);

  // Persist position locally (state preservation)
  useEffect(() => {
    if (started && typeof window !== "undefined") localStorage.setItem(`auk-pos-${id}`, String(active));
  }, [active, started, id]);

  if (!course) return <div className="p-10 text-gray-400">Loading…</div>;

  if (!started) {
    return (
      <main className="mx-auto max-w-md px-5 py-16">
        <div className="card p-6">
          <h1 className="font-serif text-xl font-bold">Continue "{course.title}"</h1>
          <p className="mt-2 text-sm text-gray-500">Enter the email you booked with to load your progress.</p>
          <input className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary mt-3 w-full justify-center" onClick={start} disabled={!email}>Start / continue →</button>
        </div>
      </main>
    );
  }

  // Load saved notes once enrollment arrives
  useEffect(() => {
    if (enrollment?.notes !== undefined && notes === "") setNotes(enrollment.notes || "");
  }, [enrollment?.id]);

  // Debounced notes autosave — writes to the database 1.2s after typing stops
  function onNotesChange(v: string) {
    setNotes(v);
    setNotesSaved(false);
    clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(async () => {
      await fetch("/api/enrollments", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learnerId: enrollment.learnerId, courseId: id, notes: v }),
      });
      setNotesSaved(true);
    }, 1200);
  }

  function isDone(it: Item) {
    if (it.kind === "quiz") return enrollment.quizScore != null && enrollment.quizScore >= 60;
    if (it.kind === "cert") return enrollment.progress >= 100;
    return completed.includes(it.key);
  }

  function recalcProgress(newCompleted: (number | string)[], quizScore?: number | null) {
    const hasMats = materials.length ? 1 : 0;
    const total = hasMats + modules.length + (course.practical?.title ? 1 : 0) + (quiz.length ? 1 : 0);
    let done = newCompleted.filter((k) => k !== "quiz").length;
    if (quiz.length) done += quizScore != null && quizScore >= 60 ? 1 : 0;
    return Math.min(100, Math.round((done / total) * 100));
  }

  async function persist(newCompleted: (number | string)[], quizScore?: number | null) {
    setSaving(true);
    const progress = recalcProgress(newCompleted, quizScore ?? enrollment.quizScore);
    const res = await fetch("/api/enrollments", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId: enrollment.learnerId, courseId: id, progress, quizScore: quizScore ?? enrollment.quizScore, completedModules: newCompleted }),
    });
    const data = await res.json();
    setEnrollment({ ...data.enrollment, learnerId: enrollment.learnerId });
    setSaving(false);
  }

  function markDone(key: number | string) {
    if (!completed.includes(key)) persist([...completed, key]);
    setActive((a) => Math.min(a + 1, items.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitQuiz() {
    if (Object.keys(quizAnswers).length < quiz.length) return alert("Answer all questions first");
    let correct = 0;
    quiz.forEach((q, i) => { if (quizAnswers[i] === q.answer) correct++; });
    const score = Math.round((correct / quiz.length) * 100);
    setQuizChecked(true);
    setRetaking(false);
    if (typeof window !== "undefined") localStorage.removeItem(`auk-quiz-${id}`);
    await persist(completed, score);
  }

  const current = items[active];
  const pct = enrollment?.progress || 0;

  // Progress ring geometry
  const R = 26, C = 2 * Math.PI * R;

  const Sidebar = (
    <aside className="card p-4 lg:sticky lg:top-20 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center gap-3">
        <svg width="64" height="64" viewBox="0 0 64 64" className="flex-shrink-0">
          <circle cx="32" cy="32" r={R} fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle cx="32" cy="32" r={R} fill="none" stroke="#12808c" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C - (pct / 100) * C} transform="rotate(-90 32 32)" />
          <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0B2A3D">{pct}%</text>
        </svg>
        <div>
          <div className="text-xs font-mono text-teal">{course.code}</div>
          <div className="font-serif text-sm font-bold leading-tight">{course.title}</div>
          {saving && <div className="mt-0.5 text-[10px] text-gray-400">Saving…</div>}
        </div>
      </div>

      <nav className="mt-4 space-y-1">
        {items.map((it, i) => {
          const done = isDone(it);
          return (
            <button key={String(it.key)} onClick={() => { setActive(i); setNavOpen(false); }}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition ${active === i ? "bg-teal/10 text-teal font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border text-[10px] ${done ? "border-teal bg-teal text-white" : active === i ? "border-teal text-teal" : "border-gray-300 text-gray-400"}`}>
                {done ? "✓" : i + 1}
              </span>
              <span className="flex-1 leading-tight">{it.label}</span>
              {it.minutes && <span className="text-[10px] text-gray-400 flex-shrink-0">{it.minutes}m</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-5">
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-gray-400">
        <Link href="/learn" className="hover:text-teal">My Learning</Link>
        <span>/</span>
        <span className="text-gray-500 truncate max-w-[140px] sm:max-w-none">{course.title}</span>
        <span>/</span>
        <span className="text-hull font-semibold truncate">{current?.label}</span>
      </nav>

      {/* Mobile nav toggle */}
      <button onClick={() => setNavOpen(!navOpen)}
        className="mb-3 flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold lg:hidden">
        <span>📋 Course outline · {pct}%</span>
        <span>{navOpen ? "▲" : "▼"}</span>
      </button>
      {navOpen && <div className="mb-4 lg:hidden">{Sidebar}</div>}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">{Sidebar}</div>

        <div>
          <div className="card p-5 sm:p-7">
            {current.kind === "vids" && (
              <div>
                <h2 className="font-serif text-xl font-bold">Course videos</h2>
                <div className="mt-4 space-y-6">
                  {videos.map((v, i) => {
                    const isYT = v.url.includes("youtube.com") || v.url.includes("youtu.be");
                    const embed = isYT ? v.url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/") : null;
                    return (
                      <div key={i}>
                        <h3 className="font-semibold">{v.title}</h3>
                        {embed
                          ? <iframe className="mt-2 aspect-video w-full rounded-lg" src={embed} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                          : <video className="mt-2 w-full rounded-lg" controls src={v.url} />}
                      </div>
                    );
                  })}
                </div>
                <button className="btn-primary mt-5" onClick={() => markDone("vids")}>Mark watched & continue →</button>
              </div>
            )}

            {current.kind === "mats" && (
              <div>
                <h2 className="font-serif text-xl font-bold">Course materials</h2>
                <div className="mt-4 space-y-2">
                  {materials.map((m: any, i: number) => (
                    <a key={i} href={m.url} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-teal transition">
                      📎 {m.name}
                    </a>
                  ))}
                </div>
                <button className="btn-primary mt-5" onClick={() => markDone("mats")}>Mark reviewed & continue →</button>
              </div>
            )}

            {current.kind === "module" && typeof current.key === "number" && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-teal">Lesson {current.key + 1} of {modules.length} · ~{current.minutes} min read</div>
                <h2 className="mt-1 font-serif text-2xl font-bold">{modules[current.key].title}</h2>
                <div className="prose mt-4 max-w-none whitespace-pre-line text-gray-700 leading-relaxed">{modules[current.key].content}</div>
                <button className="btn-primary mt-6" onClick={() => markDone(current.key)}>
                  {completed.includes(current.key) ? "✓ Completed — next →" : "Mark complete & continue →"}
                </button>
              </div>
            )}

            {current.kind === "demo" && (
              <div>
                <h2 className="font-serif text-xl font-bold">{course.practical.title}</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">{course.practical.description}</p>
                <button className="btn-primary mt-5" onClick={() => markDone("demo")}>Mark practical submitted →</button>
              </div>
            )}

            {current.kind === "quiz" && (
              <div>
                {enrollment.quizScore != null && !retaking ? (
                  <div>
                    <div className={`font-serif text-5xl font-bold ${enrollment.quizScore >= 60 ? "text-teal" : "text-red-600"}`}>{enrollment.quizScore}%</div>
                    <p className="mt-1 text-gray-500">{enrollment.quizScore >= 60 ? "✓ Passed — well done!" : "Not passed yet — 60% needed. Review the lessons and retake."}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="btn-ghost" onClick={() => { setQuizAnswers({}); setQuizChecked(false); setRetaking(true); }}>Retake quiz</button>
                      {enrollment.quizScore >= 60 && <button className="btn-primary" onClick={() => setActive(items.length - 1)}>Go to certificate →</button>}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-serif text-xl font-bold">Assessment quiz</h2>
                    <p className="mt-1 text-sm text-gray-500">{quiz.length} questions · 60% to pass · instant feedback after submitting</p>
                    {quiz.map((q, qi) => {
                      const chosen = quizAnswers[qi];
                      return (
                        <div key={qi} className="mt-5">
                          <b>{qi + 1}. {q.q}</b>
                          <div className="mt-2 space-y-2">
                            {q.options.map((o, oi) => {
                              let cls = "border-gray-200";
                              if (quizChecked) {
                                if (oi === q.answer) cls = "border-teal bg-teal/10";
                                else if (chosen === oi) cls = "border-red-400 bg-red-50";
                              } else if (chosen === oi) cls = "border-teal bg-teal/10";
                              return (
                                <button key={oi} disabled={quizChecked}
                                  onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                                  className={`block w-full rounded-md border px-3 py-2.5 text-left text-sm transition ${cls}`}>
                                  {o}
                                  {quizChecked && oi === q.answer && <span className="ml-2 text-teal font-semibold">✓ Correct answer</span>}
                                  {quizChecked && chosen === oi && oi !== q.answer && <span className="ml-2 text-red-500 font-semibold">✗ Your answer</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    {!quizChecked && <button className="btn-primary mt-6" onClick={submitQuiz}>Submit answers</button>}
                    {quizChecked && (
                      <button className="btn-primary mt-6" onClick={() => { setQuizChecked(false); setRetaking(false); }}>
                        See my result →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {current.kind === "cert" && (
              enrollment.progress >= 100 ? (
                <div className="rounded-lg border-2 border-hull p-8 text-center">
                  <div className="text-4xl">🎉</div>
                  <div className="mt-2 font-serif text-lg font-bold text-hull">AUK MARINE TRAINING</div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-teal">Certificate of {course.credits ? "Competence" : "Completion"}</div>
                  <div className="mt-3 font-serif text-3xl font-bold text-hull">{name}</div>
                  <p className="mt-3 text-sm text-gray-600">has completed<br /><b>{course.title}</b></p>
                  <a href={`/api/certificate?learnerId=${enrollment.learnerId}&courseId=${id}`} target="_blank" rel="noopener" className="btn-primary mt-5 inline-block">
                    Download certificate (PDF)
                  </a>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-xl font-bold">Certificate</h2>
                  <p className="mt-2 text-gray-500">You're {pct}% of the way there. Complete the remaining items to unlock your certificate:</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {items.filter((it) => it.kind !== "cert" && !isDone(it)).map((it) => (
                      <li key={String(it.key)} className="flex items-center gap-2 text-gray-600">
                        <span className="text-gray-300">○</span> {it.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* My notes — auto-saves to the learner's enrollment, kept forever */}
          <div className="mt-4 card overflow-hidden">
            <button onClick={() => setNotesOpen(!notesOpen)}
              className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition">
              <span>📝 My notes {notes && !notesOpen ? <span className="ml-2 text-xs font-normal text-gray-400">({notes.length} chars)</span> : null}</span>
              <span className="flex items-center gap-3">
                <span className={`text-xs font-normal ${notesSaved ? "text-teal" : "text-amber-500"}`}>
                  {notesSaved ? "✓ Saved" : "Saving…"}
                </span>
                {notesOpen ? "▲" : "▼"}
              </span>
            </button>
            {notesOpen && (
              <div className="border-t border-gray-100 p-4">
                <textarea
                  rows={6}
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  placeholder="Jot down anything as you learn — key points, questions, reminders. Your notes auto-save and stay here forever, even after you complete the course."
                  className="w-full rounded-md border border-gray-200 p-3 text-sm leading-relaxed focus:border-teal focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-4 flex items-center justify-between">
            <button onClick={() => { setActive((a) => Math.max(0, a - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={active === 0}
              className="btn-ghost disabled:opacity-30">← Previous</button>
            <span className="text-xs text-gray-400">{active + 1} / {items.length}</span>
            <button onClick={() => { setActive((a) => Math.min(items.length - 1, a + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={active === items.length - 1}
              className="btn-ghost disabled:opacity-30">Next →</button>
          </div>
        </div>
      </div>
    </main>
  );
}
