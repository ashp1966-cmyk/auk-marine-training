"use client";
import { useEffect, useState } from "react";

export default function AdminFacilitators() {
  const [list, setList] = useState<any[]>([]);
  function load() { fetch("/api/facilitators?pending=1").then((r) => r.json()).then((d) => setList(d.facilitators || [])); }
  useEffect(() => { load(); }, []);

  async function approve(id: string) {
    await fetch(`/api/facilitators/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "active" }) });
    load();
  }
  async function reject(id: string) {
    await fetch(`/api/facilitators/${id}`, { method: "DELETE" });
    load();
  }

  const pending = list.filter((f) => f.status === "pending");
  const active = list.filter((f) => f.status === "active");

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Facilitators</h1>
      {pending.length > 0 && (
        <>
          <h2 className="mt-6 font-semibold">Pending applications</h2>
          <div className="card mt-2 divide-y">
            {pending.map((f) => (
              <div key={f.id} className="flex items-center justify-between p-4">
                <div><b>{f.name}</b> — {f.role} <span className="text-xs text-gray-400">{f.email}</span></div>
                <div className="flex gap-2">
                  <button onClick={() => approve(f.id)} className="btn-primary">Approve</button>
                  <button onClick={() => reject(f.id)} className="btn-ghost">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <h2 className="mt-6 font-semibold">Active</h2>
      <div className="card mt-2 divide-y">
        {active.map((f) => <div key={f.id} className="p-4"><b>{f.name}</b> — {f.role}</div>)}
      </div>
    </div>
  );
}
