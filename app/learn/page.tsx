"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Learn() {
  const [mode, setMode] = useState<"loading" | "signin" | "signup" | "in">("loading");
  const [learner, setLearner] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [enrollments, setEnrollments] = useState<any[] | null>(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    fetch("/api/learner/me").then((r) => r.json()).then((d) => {
      if (d.signedIn) { setLearner(d.learner); setMode("in"); loadEnrollments(d.learner.email); }
      else setMode("signin");
    });
  }, []);

  async function loadEnrollments(forEmail: string) {
    const res = await fetch(`/api/enrollments?email=${encodeURIComponent(forEmail)}`);
    const data = await res.json();
    setEnrollments(data.enrollments || []);
  }

  async function doLogin() {
    setError("");
    const res = await fetch("/api/learner/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.ok) return setError(data.error);
    setLearner(data.learner); setMode("in"); loadEnrollments(data.learner.email);
  }

  async function doSignup() {
    setError("");
    if (!consent) return setError("Please accept the privacy notice to continue");
    const res = await fetch("/api/learner/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password, consent }) });
    const data = await res.json();
    if (!data.ok) return setError(data.error);
    setLearner(data.learner); setMode("in"); loadEnrollments(data.learner.email);
  }

  async function signOut() {
    await fetch("/api/learner/logout", { method: "POST" });
    setLearner(null); setEnrollments(null); setMode("signin");
  }

  async function sendForgot() {
    await fetch("/api/learner/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setForgotSent(true);
  }

  if (mode === "loading") return <div className="p-10 text-gray-400">Loading…</div>;

  if (mode === "in") {
    const done = (enrollments || []).filter((e) => e.progress >= 100).length;
    const inProgress = (enrollments || []).filter((e) => e.progress > 0 && e.progress < 100).length;
    const R = 20, C = 2 * Math.PI * R;
    const continueCourse = (enrollments || []).find((e) => e.progress > 0 && e.progress < 100) || (enrollments || []).find((e) => e.progress === 0);
    return (
      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-hull">My Learning</h1>
            <p className="mt-1 text-gray-500">Welcome back, {learner.name.split(" ")[0]}</p>
          </div>
          <button onClick={signOut} className="text-sm text-red-600 hover:underline">Sign out</button>
        </div>

        {/* Stats strip */}
        {enrollments && enrollments.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="card p-4 text-center">
              <div className="font-serif text-2xl font-bold text-hull">{enrollments.length}</div>
              <div className="text-xs text-gray-400">Enrolled</div>
            </div>
            <div className="card p-4 text-center">
              <div className="font-serif text-2xl font-bold text-amber-600">{inProgress}</div>
              <div className="text-xs text-gray-400">In progress</div>
            </div>
            <div className="card p-4 text-center">
              <div className="font-serif text-2xl font-bold text-teal">{done}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
          </div>
        )}

        {/* Continue banner */}
        {continueCourse && continueCourse.progress < 100 && (
          <Link href={`/course/${continueCourse.course.id}/learn`}
            className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-hull p-5 text-white transition hover:opacity-95">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/60">Pick up where you left off</div>
              <div className="mt-1 font-serif text-lg font-bold">{continueCourse.course.title}</div>
              <div className="mt-1 text-xs text-white/60">{continueCourse.progress}% complete</div>
            </div>
            <span className="rounded-full bg-teal px-4 py-2 text-sm font-semibold flex-shrink-0">Continue →</span>
          </Link>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {enrollments && enrollments.length === 0 && (
            <p className="text-gray-500 col-span-2">No courses yet — <Link href="/catalog" className="text-teal underline">browse the catalogue</Link>.</p>
          )}
          {enrollments?.map((e) => (
            <Link href={`/course/${e.course.id}/learn`} key={e.id}
              className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
                <circle cx="24" cy="24" r={R} fill="none" stroke="#e5e7eb" strokeWidth="5" />
                <circle cx="24" cy="24" r={R} fill="none" stroke={e.progress >= 100 ? "#12808c" : "#d97706"} strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C - (e.progress / 100) * C} transform="rotate(-90 24 24)" />
                <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0B2A3D">{e.progress}%</text>
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-mono text-teal">{e.course.code}</div>
                <h3 className="font-serif font-bold leading-tight truncate">{e.course.title}</h3>
                <div className="mt-1 text-xs">
                  {e.progress >= 100
                    ? <span className="rounded-full bg-teal/10 px-2 py-0.5 font-semibold text-teal">✓ Completed — certificate ready</span>
                    : e.progress > 0
                    ? <span className="text-amber-600 font-semibold">Continue learning →</span>
                    : <span className="text-gray-400">Not started — begin →</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  if (mode === "signin" && forgotMode) {
    return (
      <main className="mx-auto max-w-md px-5 py-16">
        <div className="card p-8">
          <h1 className="font-serif text-xl font-bold">Reset your password</h1>
          {forgotSent ? (
            <p className="mt-3 text-sm text-teal">If that email has an account, a reset link is on its way. Check your inbox.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-gray-500">Enter your email and we'll send a reset link.</p>
              <input className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-primary mt-3 w-full justify-center" onClick={sendForgot}>Send reset link</button>
            </>
          )}
          <button className="mt-4 text-sm text-gray-500 hover:underline" onClick={() => { setForgotMode(false); setForgotSent(false); }}>← Back to sign in</button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <div className="card p-8">
        <div className="mb-4 flex gap-2 rounded-md bg-gray-100 p-1">
          <button onClick={() => setMode("signin")} className={`flex-1 rounded py-1.5 text-sm font-semibold ${mode === "signin" ? "bg-white shadow" : "text-gray-500"}`}>Sign in</button>
          <button onClick={() => setMode("signup")} className={`flex-1 rounded py-1.5 text-sm font-semibold ${mode === "signup" ? "bg-white shadow" : "text-gray-500"}`}>Create account</button>
        </div>
        <h1 className="font-serif text-xl font-bold">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <div className="mt-4 space-y-3">
          {mode === "signup" && <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />}
          <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {mode === "signup" && (
            <label className="flex gap-2 text-xs text-gray-600">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              I consent to AUK Marine processing my information to manage my learning (POPIA).
            </label>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn-primary w-full justify-center" onClick={mode === "signup" ? doSignup : doLogin}>
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
          {mode === "signin" && (
            <button className="w-full text-center text-sm text-gray-500 hover:underline" onClick={() => setForgotMode(true)}>Forgot your password?</button>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          Booked a course but never set a password? Use "Create account" with the same email.
        </p>
      </div>
    </main>
  );
}
