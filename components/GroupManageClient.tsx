"use client";
import { useState } from "react";

export default function GroupManageClient({ manageToken, joinUrl: initial, origin }: { manageToken: string; joinUrl: string; origin: string }) {
  const [joinUrl, setJoinUrl] = useState(initial);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function copy() {
    try { await navigator.clipboard.writeText(joinUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }
  async function regenerate() {
    if (!confirm("This disables the current link. Anyone who already claimed a seat keeps their access. Continue?")) return;
    setBusy(true); setErr("");
    const res = await fetch("/api/group/manage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ manageToken, action: "regenerate" }) });
    const d = await res.json();
    setBusy(false);
    if (d.ok) setJoinUrl(`${origin}/join/${d.joinToken}`); else setErr(d.error || "Failed");
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input readOnly value={joinUrl} onFocus={(e) => e.currentTarget.select()}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
        <button onClick={copy} className="btn-primary justify-center whitespace-nowrap">{copied ? "Copied ✓" : "Copy link"}</button>
      </div>
      <button onClick={regenerate} disabled={busy} className="mt-3 text-xs text-gray-500 hover:text-red-600 hover:underline">
        {busy ? "Working…" : "Link leaked? Generate a new link"}
      </button>
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}
