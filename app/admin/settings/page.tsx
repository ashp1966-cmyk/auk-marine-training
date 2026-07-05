"use client";
import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [s, setS] = useState<any>(null);
  const [merchantId, setMerchantId] = useState("");
  const [merchantKey, setMerchantKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then((d) => setS(d.settings)); }, []);

  async function save() {
    setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...s, merchantId, merchantKey, passphrase }),
    });
    const data = await res.json();
    if (data.ok) { setSaved(true); setMerchantId(""); setMerchantKey(""); setPassphrase(""); }
  }

  if (!s) return <div className="p-10 text-gray-400">Loading…</div>;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-serif text-2xl font-bold">Settings</h1>

      <div className="card p-5">
        <h2 className="font-semibold">Site content</h2>
        <div className="field mt-3"><label>Headline</label><input value={s.heroTitle} onChange={(e) => setS({ ...s, heroTitle: e.target.value })} /></div>
        <div className="field mt-3"><label>Headline highlight</label><input value={s.heroAccent} onChange={(e) => setS({ ...s, heroAccent: e.target.value })} /></div>
        <div className="field mt-3"><label>Intro paragraph</label><textarea rows={3} value={s.heroLead} onChange={(e) => setS({ ...s, heroLead: e.target.value })} /></div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold">Payments — PayFast</h2>
        <p className="mt-1 text-xs text-gray-500">Merchant ID/key/passphrase are write-only — once saved, they're never sent back to any browser, including yours.</p>
        <div className="field mt-3"><label>Enabled</label>
          <select value={s.payfastEnabled ? "on" : "off"} onChange={(e) => setS({ ...s, payfastEnabled: e.target.value === "on" })}>
            <option value="off">Off</option><option value="on">On</option>
          </select>
        </div>
        <div className="field mt-3"><label>Mode</label>
          <select value={s.payfastMode} onChange={(e) => setS({ ...s, payfastMode: e.target.value })}>
            <option value="sandbox">Sandbox</option><option value="live">Live</option>
          </select>
        </div>
        <div className="field mt-3"><label>Merchant ID</label><input value={merchantId} onChange={(e) => setMerchantId(e.target.value)} placeholder="10000100" /></div>
        <div className="field mt-3"><label>Merchant Key</label><input type="password" value={merchantKey} onChange={(e) => setMerchantKey(e.target.value)} /></div>
        <div className="field mt-3"><label>Passphrase</label><input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} /></div>
      </div>

      {saved && <p className="text-teal">✓ Settings saved</p>}
      <button className="btn-primary" onClick={save}>Save settings</button>
    </div>
  );
}
