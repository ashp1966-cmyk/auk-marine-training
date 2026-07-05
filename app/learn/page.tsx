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
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-hull">My Learning</h1>
          <button onClick={signOut} className="text-sm text-red-600 hover:underline">Sign out</button>
        </div>
        <p className="mt-1 text-gray-500">Signed in as {learner.name} ({learner.email})</p>
        <div className="mt-8 grid gap-4">
          {enrollments && enrollments.length === 0 && (
            <p className="text-gray-500">No courses yet — <Link href="/catalog" className="text-teal underline">browse the catalogue</Link>.</p>
          )}
          {enrollments?.map((e) => (
            <Link href={`/course/${e.course.id}/learn`} key={e.id} className="card block p-5 transition hover:-translate-y-0.5">
              <div className="text-xs font-mono text-teal">{e.course.code}</div>
              <h3 className="font-serif text-lg font-bold">{e.course.title}</h3>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-teal" style={{ width: `${e.progress}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-500">{e.progress}% complete</div>
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
