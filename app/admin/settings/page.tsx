"use client";
import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [loaded, setLoaded]             = useState(false);
  const [heroTitle, setHeroTitle]       = useState("");
  const [heroAccent, setHeroAccent]     = useState("");
  const [heroLead, setHeroLead]         = useState("");
  const [notifyEmail, setNotifyEmail]   = useState("");
  const [whatsapp, setWhatsapp]         = useState("");
  const [orgName, setOrgName]           = useState("");

  // PayFast — separate save, separate endpoint
  const [payfastEnabled, setPayfastEnabled] = useState(false);
  const [payfastMode, setPayfastMode]   = useState("sandbox");
  const [merchantId, setMerchantId]     = useState("");
  const [merchantKey, setMerchantKey]   = useState("");
  const [passphrase, setPassphrase]     = useState("");

  const [saved, setSaved]         = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving]       = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => {
      const s = d.settings || {};
      setHeroTitle(s.heroTitle   || "");
      setHeroAccent(s.heroAccent || "");
      setHeroLead(s.heroLead     || "");
      setNotifyEmail(s.notifyEmail || "");
      setWhatsapp(s.whatsapp     || "");
      setOrgName(s.orgName       || "");
      setPayfastEnabled(!!s.payfastEnabled);
      setPayfastMode(s.payfastMode || "sandbox");
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  async function saveContent() {
    setSaving(true); setSaved(""); setSaveError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroAccent, heroLead, notifyEmail, whatsapp, orgName }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (data.ok) setSaved("content");
      else setSaveError(data.error || "Could not save content settings");
    } catch (e: any) { setSaveError(e.message); }
    setSaving(false);
  }

  async function savePayfast() {
    setSaving(true); setSaved(""); setSaveError("");
    try {
      const res = await fetch("/api/payfast-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled: payfastEnabled,
          mode: payfastMode,
          merchantId: merchantId.trim(),
          merchantKey: merchantKey.trim(),
          passphrase: passphrase.trim(),
        }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (data.ok) { setSaved("payfast"); setMerchantId(""); setMerchantKey(""); setPassphrase(""); }
      else setSaveError(data.error || "Could not save PayFast settings");
    } catch (e: any) { setSaveError(e.message); }
    setSaving(false);
  }

  if (!loaded) return <div className="p-10 text-gray-400">Loading…</div>;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-serif text-2xl font-bold">Settings</h1>

      <div className="card p-5">
        <h2 className="font-semibold">Site content</h2>
        <div className="field mt-3"><label>Headline</label>
          <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
        </div>
        <div className="field mt-3"><label>Headline highlight (italic)</label>
          <input value={heroAccent} onChange={(e) => setHeroAccent(e.target.value)} />
        </div>
        <div className="field mt-3"><label>Intro paragraph</label>
          <textarea rows={3} value={heroLead} onChange={(e) => setHeroLead(e.target.value)} />
        </div>
        <div className="field mt-3"><label>Organisation name</label>
          <input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </div>
        <div className="field mt-3"><label>WhatsApp number</label>
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        </div>
        <div className="field mt-3"><label>Notification email (for booking alerts)</label>
          <input type="email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} />
        </div>
        {saved === "content" && <p className="mt-2 text-sm font-semibold text-teal">✓ Content saved</p>}
        <button className="btn-primary mt-4" onClick={saveContent} disabled={saving}>
          {saving ? "Saving…" : "Save content"}
        </button>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold">Payments — PayFast</h2>
        <p className="mt-1 text-xs text-gray-500">
          Merchant ID/Key/Passphrase are write-only. Leave credential fields blank to keep existing values.
        </p>
        <div className="field mt-3"><label>Status</label>
          <select value={payfastEnabled ? "on" : "off"} onChange={(e) => setPayfastEnabled(e.target.value === "on")}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
        <div className="field mt-3"><label>Mode</label>
          <select value={payfastMode} onChange={(e) => setPayfastMode(e.target.value)}>
            <option value="sandbox">Sandbox (testing)</option>
            <option value="live">Live (real payments)</option>
          </select>
        </div>
        <div className="field mt-3">
          <label>Merchant ID — the number from PayFast → Settings → Integration</label>
          <input value={merchantId} onChange={(e) => setMerchantId(e.target.value)}
            placeholder="e.g. 12953670" />
        </div>
        <div className="field mt-3"><label>Merchant Key</label>
          <input type="password" value={merchantKey} onChange={(e) => setMerchantKey(e.target.value)}
            placeholder="Leave blank to keep existing" />
        </div>
        <div className="field mt-3"><label>Passphrase</label>
          <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Leave blank to keep existing" />
        </div>
        {saved === "payfast" && <p className="mt-2 text-sm font-semibold text-teal">✓ PayFast settings saved</p>}
        {saveError && <p className="mt-2 text-sm text-red-600">❌ {saveError}</p>}
        <button className="btn-primary mt-4" onClick={savePayfast} disabled={saving}>
          {saving ? "Saving…" : "Save PayFast settings"}
        </button>
      </div>
    </div>
  );
}
