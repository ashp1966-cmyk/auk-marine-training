"use client";
import { useEffect, useState } from "react";

export default function Account() {
  const [email, setEmail] = useState("");
  const [providerId, setProviderId] = useState<string | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => { setEmail(d.email); setProviderId(d.providerId ?? null); });
  }, []);

  async function change() {
    setMsg("");
    if (next.length < 8) return setMsg("❌ New password must be at least 8 characters");
    if (next !== next2) return setMsg("❌ New passwords don't match");
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = await res.json();
    if (!data.ok) return setMsg("❌ " + data.error);
    setMsg("✓ Password updated");
    setCurrent(""); setNext(""); setNext2("");
  }

  return (
    <div className="max-w-md">
      <h1 className="font-serif text-2xl font-bold">Account</h1>
      <div className="card mt-5 p-5">
        <p className="text-sm text-gray-500">Signed in as <b>{email}</b></p>
        <p className="mt-1 text-xs text-gray-400">{providerId === null ? "Platform super-admin (AUK)" : "Provider-scoped admin"}</p>
      </div>

      <div className="card mt-5 p-5">
        <h2 className="font-semibold">Change password</h2>
        <div className="mt-3 space-y-3">
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="New password" value={next} onChange={(e) => setNext(e.target.value)} />
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Confirm new password" value={next2} onChange={(e) => setNext2(e.target.value)} />
          {msg && <p className="text-sm">{msg}</p>}
          <button className="btn-primary" onClick={change}>Update password</button>
        </div>
      </div>
    </div>
  );
}
