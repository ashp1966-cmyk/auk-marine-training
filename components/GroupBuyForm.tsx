"use client";
import { useState } from "react";

const inputCls = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500";

export default function GroupBuyForm({ courseId, priceCents, minSeats, maxSeats }: { courseId: string; priceCents: number; minSeats: number; maxSeats: number }) {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [seats, setSeats] = useState(10);
  const [domainLock, setDomainLock] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const seatsOk = Number.isInteger(seats) && seats >= minSeats && seats <= maxSeats;
  const total = seatsOk ? seats * priceCents : 0;
  const rand = (c: number) => `R${(c / 100).toLocaleString("en-ZA")}`;

  async function submit() {
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/group", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, company, contactName, contactEmail, contactPhone, seats, domainLock, consent }),
      });
      const data = await res.json();
      if (!data.ok) { setError(data.error || "Something went wrong"); setBusy(false); return; }
      window.location.href = `/api/payfast/form/${data.ref}`;
    } catch {
      setError("Network error — please try again"); setBusy(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="space-y-3">
        <div><label className={labelCls}>Company *</label>
          <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" /></div>
        <div><label className={labelCls}>Contact person *</label>
          <input className={inputCls} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Full name" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><label className={labelCls}>Contact email *</label>
            <input className={inputCls} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@company.com" /></div>
          <div><label className={labelCls}>Phone</label>
            <input className={inputCls} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+27 …" /></div>
        </div>
        <div><label className={labelCls}>Number of seats * ({minSeats}–{maxSeats})</label>
          <input className={inputCls} type="number" min={minSeats} max={maxSeats} value={Number.isNaN(seats) ? "" : seats}
            onChange={(e) => setSeats(parseInt(e.target.value, 10))} /></div>
        <div><label className={labelCls}>Restrict to company email domain (optional)</label>
          <input className={inputCls} name="allowed-domain" autoComplete="off" value={domainLock} onChange={(e) => setDomainLock(e.target.value)} placeholder="company.co.za" />
          <p className="mt-1 text-xs text-gray-400">If set, only staff with an @company.co.za address can claim a seat.</p></div>

        <div className="rounded-lg bg-gray-50 p-4 text-sm">
          <div className="flex justify-between text-gray-600"><span>{seatsOk ? seats : "–"} seats × {rand(priceCents)}</span><span>{seatsOk ? rand(total) : "–"}</span></div>
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-serif text-lg font-bold text-hull"><span>Total</span><span>{seatsOk ? rand(total) : "–"}</span></div>
        </div>

        <label className="flex gap-2 text-xs text-gray-600 leading-relaxed">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0" />
          I consent to AUK Marine processing this company's information to manage this order (POPIA).
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn-primary w-full justify-center"
          disabled={busy || !seatsOk || !company || !contactName || !contactEmail || !consent} onClick={submit}>
          {busy ? "Processing…" : seatsOk ? `Pay ${rand(total)} →` : "Pay →"}
        </button>
        <p className="text-center text-xs text-gray-400">After payment you get one link to share with your team.</p>
      </div>
    </div>
  );
}
