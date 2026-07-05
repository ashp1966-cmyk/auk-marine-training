"use client";
import { useEffect, useState } from "react";

export default function Subscribers() {
  const [providers, setProviders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [location, setLocation] = useState("");
  const [color, setColor] = useState("#12808c");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteProviderId, setInviteProviderId] = useState("");
  const [inviteResult, setInviteResult] = useState("");
  const [admins, setAdmins] = useState<any[]>([]);

  function loadAdmins() {
    fetch("/api/admin/list").then((r) => r.json()).then((d) => setAdmins(d.admins || []));
  }

  async function revoke(id: string) {
    if (!confirm("Revoke this admin's access? They'll be signed out immediately and can't sign back in.")) return;
    const res = await fetch(`/api/admin/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.ok) alert(data.error);
    loadAdmins();
  }

  function load() {
    fetch("/api/providers").then((r) => r.json()).then((d) => {
      setProviders(d.providers || []);
      if (d.providers?.[0] && !inviteProviderId) setInviteProviderId(d.providers[0].id);
    });
  }
  useEffect(() => { load(); loadAdmins(); }, []);

  async function add() {
    await fetch("/api/providers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, tagline, location, color }) });
    setName(""); setTagline(""); setLocation("");
    load();
  }

  async function invite() {
    setInviteResult("");
    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, providerId: inviteProviderId }),
    });
    const data = await res.json();
    if (!data.ok) { setInviteResult("❌ " + data.error); return; }
    setInviteResult(
      data.emailed
        ? "✓ Invite emailed to " + inviteEmail
        : "✓ Account created — email not configured (set RESEND_API_KEY). Temporary password: " + data.temporaryPassword
    );
    setInviteEmail("");
    loadAdmins();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Subscribers</h1>
      <p className="mt-1 text-sm text-gray-500">Other accredited organisations who can list and sell their own courses alongside AUK's.</p>

      <div className="card mt-5 p-5">
        <h2 className="font-semibold">Onboard a provider</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Organisation name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="color" className="h-10 rounded-md border border-gray-300" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <button className="btn-primary mt-4" onClick={add} disabled={!name}>Add provider</button>
      </div>

      <div className="card mt-5 p-5">
        <h2 className="font-semibold">Invite a provider admin</h2>
        <p className="mt-1 text-xs text-gray-500">Gives them their own login, restricted to only their own provider's courses, bookings and schedule.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <select className="rounded-md border border-gray-300 px-3 py-2" value={inviteProviderId} onChange={(e) => setInviteProviderId(e.target.value)}>
            {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Their email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
        </div>
        <button className="btn-primary mt-4" onClick={invite} disabled={!inviteEmail || !inviteProviderId}>Send invite</button>
        {inviteResult && <p className="mt-2 text-sm">{inviteResult}</p>}
      </div>

      <div className="card mt-5 divide-y">
        <div className="p-4 font-semibold">Admin accounts</div>
        {admins.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 text-sm">
            <div>
              <b>{a.email}</b>
              <div className="text-xs text-gray-400">{a.providerId === null ? "Platform super-admin" : a.providerName}</div>
            </div>
            {a.providerId !== null && (
              <button onClick={() => revoke(a.id)} className="text-xs text-red-600 hover:underline">Revoke access</button>
            )}
          </div>
        ))}
        {admins.length === 0 && <p className="p-4 text-gray-400">Loading…</p>}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {providers.map((p) => (
          <div key={p.id} className="card p-4">
            <div className="h-8 w-8 rounded" style={{ background: p.color }} />
            <b className="mt-2 block">{p.name}</b>
            <div className="text-xs text-gray-400">{p.tagline}</div>
            {p.verified && <span className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">verified</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
