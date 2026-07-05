"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminReset() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  async function submit() {
    setMsg("");
    if (password.length < 8) return setMsg("Password must be at least 8 characters");
    if (password !== password2) return setMsg("Passwords don't match");
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await res.json();
    if (!data.ok) return setMsg(data.error);
    setDone(true);
    setTimeout(() => router.push("/admin"), 2000);
  }

  if (!token) return <main className="mx-auto max-w-md px-5 py-16 text-center text-gray-500">Missing or invalid reset link.</main>;

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <div className="card p-8">
        <h1 className="font-serif text-2xl font-bold">Set a new passcode</h1>
        {done ? (
          <p className="mt-3 text-teal">✓ Passcode updated — redirecting to sign in…</p>
        ) : (
          <div className="mt-4 space-y-3">
            <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="New passcode" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Confirm passcode" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            {msg && <p className="text-sm text-red-600">{msg}</p>}
            <button className="btn-primary w-full justify-center" onClick={submit}>Set new passcode</button>
          </div>
        )}
      </div>
    </main>
  );
}
