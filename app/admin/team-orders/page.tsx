"use client";
import { useEffect, useState } from "react";

const STATUS_COLOR: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-gray-100 text-gray-500",
};

export default function AdminTeamOrders() {
  const [groups, setGroups] = useState<any[] | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");

  function load() {
    fetch("/api/group/admin").then((r) => r.json()).then((d) => setGroups(d.groups || []));
  }
  useEffect(() => { load(); }, []);

  async function resend(g: any) {
    const to = prompt(`Re-send the "Team payment received" email for ${g.ref}.\n\nSend to (leave as is for the customer, or type your own address to test):`, g.contactEmail);
    if (!to) return;
    setBusy(g.ref); setMsg("");
    const res = await fetch("/api/group/admin", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: g.ref, to }),
    });
    const d = await res.json().catch(() => ({}));
    setBusy("");
    setMsg(d.ok ? `Sent to ${d.sentTo}` : `Failed: ${d.error || "unknown error"}`);
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Team orders</h1>
      {msg && <p className={`mt-3 rounded-md px-3 py-2 text-sm ${msg.startsWith("Sent") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</p>}
      {groups === null ? <p className="mt-4 text-gray-400">Loading…</p> : groups.length === 0 ? <p className="mt-4 text-gray-500">No team orders yet.</p> : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b text-xs uppercase text-gray-500">
              <th className="py-2 pr-3">Ref</th><th className="pr-3">Company / contact</th><th className="pr-3">Course</th>
              <th className="pr-3">Seats</th><th className="pr-3">Amount</th><th className="pr-3">Status</th><th></th>
            </tr></thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.ref} className="border-b align-top">
                  <td className="py-2 pr-3 font-mono text-xs">{g.ref}</td>
                  <td className="pr-3"><div className="font-medium">{g.company}</div><div className="text-xs text-gray-500">{g.contactName} · {g.contactEmail}</div></td>
                  <td className="pr-3">{g.course}</td>
                  <td className="pr-3">{g.claimed}/{g.seats}</td>
                  <td className="pr-3">R{(g.amountCents / 100).toLocaleString("en-ZA")}</td>
                  <td className="pr-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLOR[g.status] || "bg-gray-100 text-gray-600"}`}>{g.status}</span></td>
                  <td>{g.status === "Paid" && (
                    <button className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50" disabled={busy === g.ref} onClick={() => resend(g)}>
                      {busy === g.ref ? "Sending…" : "Re-send email"}
                    </button>
                  )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
