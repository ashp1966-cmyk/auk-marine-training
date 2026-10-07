"use client";
import { useEffect, useState } from "react";

const inputCls = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";

export default function JoinClient({ joinToken, domainLock }: { joinToken: string; domainLock: string | null }) {
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [learner, setLearner] = useState<any>(null);
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/learner/me").then((r) => r.json()).then((d) => {
      if (d.signedIn) { setLearner(d.learner); setState("in"); } else setState("out");
    }).catch(() => setState("out"));
  }, []);

  async function auth() {
    setError("");
    const em = email.trim().toLowerCase();
    if (domainLock && !em.endsWith("@" + domainLock)) return setError(`Use your @${domainLock} email address`);
    if (mode === "signup" && !consent) return setError("Please accept the privacy notice to continue");
    setBusy(true);
    const res = await fetch(mode === "signup" ? "/api/learner/signup" : "/api/learner/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mode === "signup" ? { name, email: em, password, consent } : { email: em, password }),
    });
    const d = await res.json();
    setBusy(false);
    if (!d.ok) return setError(d.error || "Something went wrong");
    setLearner(d.learner); setState("in");
  }

  async function claim() {
    setBusy(true); setError("");
    const res = await fetch("/api/group/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ joinToken }) });
    const d = await res.json();
    if (d.ok) { window.location.href = d.redirect; return; }
    setBusy(false); setError(d.error || "Could not claim a seat");
  }

  async function switchAccount() {
    await fetch("/api/learner/logout", { method: "POST" });
    setLearner(null); setState("out");
  }

  if (state === "loading") return <p className="text-sm text-gray-400">Loading…</p>;

  if (state === "in") {
    return (
      <div>
        <p className="text-sm text-gray-600">Signed in as <b>{learner.name}</b> ({learner.email})</p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="btn-primary mt-4 w-full justify-center" onClick={claim} disabled={busy}>{busy ? "Claiming…" : "Claim my seat →"}</button>
        <button onClick={switchAccount} className="mt-3 text-xs text-gray-500 hover:underline">Not you? Use a different account</button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 border-b border-gray-200 text-sm font-semibold">
        <button onClick={() => setMode("signup")} className={`pb-2 ${mode === "signup" ? "border-b-2 border-teal text-teal" : "text-gray-400"}`}>Create account</button>
        <button onClick={() => setMode("signin")} className={`pb-2 ${mode === "signin" ? "border-b-2 border-teal text-teal" : "text-gray-400"}`}>I have an account</button>
      </div>
      {mode === "signup" && <input className={inputCls} placeholder="Full name (as it should appear on your certificate)" value={name} onChange={(e) => setName(e.target.value)} />}
      <input className={inputCls} type="email" placeholder={domainLock ? `you@${domainLock}` : "you@company.com"} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={inputCls} type="password" placeholder={mode === "signup" ? "Choose a password (8+ characters)" : "Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
      {mode === "signup" && (
        <label className="flex gap-2 text-xs leading-relaxed text-gray-600">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0" />
          I consent to AUK Marine processing my information to manage my learning (POPIA).
        </label>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full justify-center" onClick={auth} disabled={busy || !email || !password || (mode === "signup" && !name)}>
        {busy ? "Please wait…" : mode === "signup" ? "Create account & continue →" : "Sign in & continue →"}
      </button>
    </div>
  );
}
