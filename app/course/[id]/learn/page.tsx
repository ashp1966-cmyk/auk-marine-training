"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Module = { title: string; content: string };
type QuizQ = { q: string; options: string[]; answer: number };
type Video = { title: string; url: string };

export default function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState<any>(null);
  const [active, setActive] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [retaking, setRetaking] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${id}`).then((r) => r.json()).then((d) => setCourse(d.course));
    fetch("/api/learner/me").then((r) => r.json()).then((d) => {
      if (d.signedIn) { setEmail(d.learner.email); setName(d.learner.name); autoStart(d.learner.email, d.learner.name); }
    });
  }, [id]);

  async function autoStart(em: string, nm: string) {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: em, name: nm, courseId: id }),
    });
    const data = await res.json();
    if (data.ok) { setEnrollment({ ...data.enrollment, learnerId: data.learnerId }); setStarted(true); }
  }

  async function start() {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, courseId: id }),
    });
    const data = await res.json();
    if (data.ok) {
      setEnrollment({ ...data.enrollment, learnerId: data.learnerId });
      setStarted(true);
    }
  }

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

  const modules: Module[] = course.modules || [];
  const materials = course.materials || [];
  const videos: Video[] = course.videos || [];
  const quiz: QuizQ[] = course.quiz || [];
  const completed: (number | string)[] = enrollment?.completedModules || [];

  const items: { key: string | number; label: string }[] = [
    ...(materials.length ? [{ key: "mats", label: "Course materials" }] : []),
    ...(videos.length ? [{ key: "vids", label: `Videos (${videos.length})` }] : []),
    ...modules.map((m, i) => ({ key: i, label: m.title })),
    ...(course.practical?.title ? [{ key: "demo", label: "Practical demonstration" }] : []),
    ...(quiz.length ? [{ key: "quiz", label: "Assessment quiz" }] : []),
    { key: "cert", label: "Certificate" },
  ];

  function recalcProgress(newCompleted: (number | string)[], quizScore?: number | null) {
    const hasMats = materials.length ? 1 : 0;
    const total = hasMats + modules.length + (course.practical?.title ? 1 : 0) + (quiz.length ? 1 : 0);
    let done = newCompleted.filter((k) => k !== "quiz").length;
    if (quiz.length) done += quizScore != null && quizScore >= 60 ? 1 : 0;
    return Math.min(100, Math.round((done / total) * 100));
  }

  async function persist(newCompleted: (number | string)[], quizScore?: number | null) {
    const progress = recalcProgress(newCompleted, quizScore ?? enrollment.quizScore);
    const res = await fetch("/api/enrollments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId: enrollment.learnerId, courseId: id, progress, quizScore: quizScore ?? enrollment.quizScore, completedModules: newCompleted }),
    });
    const data = await res.json();
    setEnrollment({ ...data.enrollment, learnerId: enrollment.learnerId });
  }

  function markDone(key: number | string) {
    if (completed.includes(key)) { setActive((a) => Math.min(a + 1, items.length - 1)); return; }
    const next = [...completed, key];
    persist(next);
    setActive((a) => Math.min(a + 1, items.length - 1));
  }

  async function submitQuiz() {
    if (Object.keys(quizAnswers).length < quiz.length) return alert("Answer all questions first");
    let correct = 0;
    quiz.forEach((q, i) => { if (quizAnswers[i] === q.answer) correct++; });
    const score = Math.round((correct / quiz.length) * 100);
    setRetaking(false);
    await persist(completed, score);
  }

  const current = items[active];

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <div className="grid gap-6 sm:grid-cols-[260px_1fr]">
        <aside className="card sticky top-20 p-4">
          <div className="text-xs font-mono text-teal">{course.code}</div>
          <div className="mt-1 font-serif font-bold">{course.title}</div>
          <div className="mt-3 h-2 rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-teal" style={{ width: `${enrollment?.progress || 0}%` }} />
          </div>
          <div className="mt-1 text-xs text-gray-400">{enrollment?.progress || 0}% complete</div>
          <nav className="mt-4 space-y-1">
            {items.map((it, i) => (
              <button key={it.key} onClick={() => setActive(i)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${active === i ? "bg-teal/10 text-teal font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border text-[10px] ${completed.includes(it.key) ? "border-teal bg-teal text-white" : "border-gray-300"}`}>
                  {completed.includes(it.key) ? "✓" : i + 1}
                </span>
                {it.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="card p-6">
          {current.key === "vids" && (
            <div>
              <h2 className="font-serif text-xl font-bold">Course videos</h2>
              <div className="mt-4 space-y-6">
                {videos.map((v: Video, i: number) => {
                  const isYouTube = v.url.includes("youtube.com") || v.url.includes("youtu.be");
                  const embedUrl = isYouTube
                    ? v.url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")
                    : null;
                  return (
                    <div key={i}>
                      <h3 className="font-semibold">{v.title}</h3>
                      {embedUrl ? (
                        <iframe className="mt-2 aspect-video w-full rounded-lg"
                          src={embedUrl} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                      ) : (
                        <video className="mt-2 w-full rounded-lg" controls src={v.url} />
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="btn-primary mt-5" onClick={() => markDone("vids")}>Mark watched & continue</button>
            </div>
          )}

          {current.key === "mats" && (
            <div>
              <h2 className="font-serif text-xl font-bold">Course materials</h2>
              <div className="mt-4 space-y-2">
                {materials.map((m: any, i: number) => (
                  <a key={i} href={m.url} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-teal">
                    📎 {m.name}
                  </a>
                ))}
              </div>
              <button className="btn-primary mt-5" onClick={() => markDone("mats")}>Mark reviewed & continue</button>
            </div>
          )}

          {typeof current.key === "number" && (
            <div>
              <h2 className="font-serif text-xl font-bold">{modules[current.key].title}</h2>
              <p className="mt-3 whitespace-pre-line text-gray-600">{modules[current.key].content}</p>
              <button className="btn-primary mt-5" onClick={() => markDone(current.key)}>
                {completed.includes(current.key) ? "✓ Completed — next" : "Mark complete & continue"}
              </button>
            </div>
          )}

          {current.key === "demo" && (
            <div>
              <h2 className="font-serif text-xl font-bold">{course.practical.title}</h2>
              <p className="mt-3 text-gray-600">{course.practical.description}</p>
              <button className="btn-primary mt-5" onClick={() => markDone("demo")}>Mark practical submitted</button>
            </div>
          )}

          {current.key === "quiz" && (
            <div>
              {enrollment.quizScore != null && !retaking ? (
                <div>
                  <div className={`font-serif text-4xl font-bold ${enrollment.quizScore >= 60 ? "text-teal" : "text-red-600"}`}>{enrollment.quizScore}%</div>
                  <p className="mt-1 text-gray-500">{enrollment.quizScore >= 60 ? "Passed" : "Not passed yet (60% needed)"}</p>
                  <button className="btn-ghost mt-3" onClick={() => { setQuizAnswers({}); setRetaking(true); }}>Retake quiz</button>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-xl font-bold">Assessment quiz</h2>
                  {quiz.map((q, qi) => (
                    <div key={qi} className="mt-4">
                      <b>{qi + 1}. {q.q}</b>
                      <div className="mt-2 space-y-2">
                        {q.options.map((o, oi) => (
                          <button key={oi} onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                            className={`block w-full rounded-md border px-3 py-2 text-left text-sm ${quizAnswers[qi] === oi ? "border-teal bg-teal/10" : "border-gray-200"}`}>
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="btn-primary mt-5" onClick={submitQuiz}>Submit answers</button>
                </div>
              )}
            </div>
          )}

          {current.key === "cert" && (
            enrollment.progress >= 100 ? (
              <div className="rounded-lg border-2 border-hull p-8 text-center">
                <div className="font-serif text-lg font-bold text-hull">AUK MARINE TRAINING</div>
                <div className="mt-4 text-xs uppercase tracking-widest text-teal">Certificate of {course.credits ? "Competence" : "Completion"}</div>
                <div className="mt-3 font-serif text-3xl font-bold text-hull">{name}</div>
                <p className="mt-3 text-sm text-gray-600">has completed<br /><b>{course.title}</b></p>
                <a
                  href={`/api/certificate?learnerId=${enrollment.learnerId}&courseId=${id}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-primary mt-5 inline-block"
                >
                  Download certificate (PDF)
                </a>
              </div>
            ) : (
              <p className="text-gray-500">Complete everything else to unlock your certificate.</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}
