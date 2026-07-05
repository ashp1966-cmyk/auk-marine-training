"use client";
import { useState } from "react";

export default function BookingForm({ course }: { course: any }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(course.modes[0] || "virtual");
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  const isFree = course.price === 0;
  const total = (course.price * seats) / 100;

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, mode, seats, name, email, phone, org, consent, method: "payfast" }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error || "Something went wrong"); setBusy(false); return; }

      if (isFree) {
        setRef(data.booking.ref);
        setStep(4);
        setBusy(false);
        return;
      }

      const pf = await fetch("/api/payfast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: data.booking.id }),
      });
      const pfData = await pf.json();
      if (!pfData.ok) { setError(pfData.error); setBusy(false); return; }

      // Build and submit a real form to PayFast — this is a genuine redirect
      // to PayFast's own hosted payment page, not a simulation.
      const form = document.createElement("form");
      form.method = "POST";
      form.action = pfData.actionUrl;
      Object.entries(pfData.fields).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v);
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (e) {
      setError("Network error — please try again");
      setBusy(false);
    }
  }

  if (step === 4) {
    return (
      <div className="card p-6 text-center">
        <h3 className="font-serif text-xl font-bold">You're booked in!</h3>
        <p className="mt-2 text-sm text-gray-500">Reference:</p>
        <p className="mt-1 font-mono text-lg font-bold text-hull">{ref}</p>
      </div>
    );
  }

  return (
    <div className="card sticky top-20 p-6">
      <div className="text-xs uppercase text-gray-400">{isFree ? "SETA Learnership" : "From"}</div>
      <div className="font-serif text-2xl font-bold">{isFree ? "Sponsored" : `R${(course.price / 100).toLocaleString()}`}</div>

      {step === 1 && (
        <div className="mt-4 space-y-3">
          <div className="field">
            <label>Delivery</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {course.modes.map((m: string) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Seats</label>
            <input type="number" min={1} value={seats} onChange={(e) => setSeats(Math.max(1, +e.target.value))} />
          </div>
          <button className="btn-primary w-full justify-center" onClick={() => setStep(2)}>Continue →</button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-3">
          <div className="field"><label>Full name *</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="field"><label>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="field"><label>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="field"><label>Organisation</label><input value={org} onChange={(e) => setOrg(e.target.value)} /></div>
          <label className="flex gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            I consent to AUK Marine processing my information to manage this booking (POPIA).
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
            <button
              className="btn-primary"
              disabled={busy || !name || !email || !consent}
              onClick={submit}
            >
              {busy ? "Please wait…" : isFree ? "Confirm booking" : `Pay R${total.toLocaleString()} →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
