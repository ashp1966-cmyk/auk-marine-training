"use client";
import { useEffect, useState } from "react";

export default function BookingForm({ course }: { course: any }) {
  const [step, setStep]       = useState(1);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [org, setOrg]         = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState("");
  const [ref, setRef]         = useState("");

  // Pre-fill from learner session if signed in
  useEffect(() => {
    fetch("/api/learner/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.signedIn) { setName(d.learner.name); setEmail(d.learner.email); }
      }).catch(() => {});
  }, []);

  const isFree = course.price === 0;

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          mode: "online",
          seats: 1,
          name, email, phone, org, consent,
          method: isFree ? "free" : "payfast",
        }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error || "Something went wrong"); setBusy(false); return; }

      if (isFree) { setRef(data.booking.ref); setStep(3); setBusy(false); return; }
      window.location.href = `/api/payfast/form/${data.booking.ref}`;
    } catch {
      setError("Network error — please try again");
      setBusy(false);
    }
  }

  if (step === 3) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl">🎉</div>
        <h3 className="mt-2 font-serif text-xl font-bold">You're enrolled!</h3>
        <p className="mt-1 text-sm text-gray-500">Reference: <span className="font-mono font-bold text-hull">{ref}</span></p>
        <a href={`/course/${course.id}/learn`} className="btn-primary mt-4 inline-block">Start learning →</a>
      </div>
    );
  }

  return (
    <div className="card sticky top-20 p-6">
      <div className="text-xs uppercase tracking-wide text-gray-400">{isFree ? "SETA Learnership" : "From"}</div>
      <div className="font-serif text-2xl font-bold text-hull">
        {isFree ? "Sponsored" : `R${(course.price / 100).toLocaleString()}`}
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
        <span>🖥️ Online LMS</span>
        <span>·</span>
        <span>{course.durationLabel}</span>
      </div>

      {/* PayFast not configured warning */}
      {!isFree && course._payfastEnabled === false && (
        <p className="mt-3 text-xs text-red-500">PayFast is not configured yet — ask AUK Marine to set it up in Settings</p>
      )}

      <div className="mt-4 space-y-3">
        <div className="field"><label>Full name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        </div>
        <div className="field"><label>Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        </div>
        <div className="field"><label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+27 …" />
        </div>
        <div className="field"><label>Organisation</label>
          <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company / institution" />
        </div>
        <label className="flex gap-2 text-xs text-gray-600 leading-relaxed">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0" />
          I consent to AUK Marine processing my information to manage this booking (POPIA).
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          className="btn-primary w-full justify-center"
          disabled={busy || !name || !email || !consent}
          onClick={submit}>
          {busy ? "Processing…" : isFree ? "Enrol now — free" : `Pay R${(course.price / 100).toLocaleString()} →`}
        </button>
        <p className="text-center text-xs text-gray-400">Already have an account? Your progress will be linked automatically.</p>
      </div>
    </div>
  );
}
