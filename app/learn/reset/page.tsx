"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetForm() {
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
    const res = await fetch("/api/learner/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await res.json();
    if (!data.ok) return setMsg(data.error);
    setDone(true);
    setTimeout(() => router.push("/learn"), 2000);
  }

  if (!token) return <p className="text-center text-gray-500">Missing or invalid reset link.</p>;

  return (
    <div className="card p-8">
      <h1 className="font-serif text-2xl font-bold">Set a new password</h1>
      {done ? (
        <p className="mt-3 text-teal">✓ Password updated — redirecting to sign in…</p>
      ) : (
        <div className="mt-4 space-y-3">
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Confirm password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          {msg && <p className="text-sm text-red-600">{msg}</p>}
          <button className="btn-primary w-full justify-center" onClick={submit}>Set new password</button>
        </div>
      )}
    </div>
  );
}

export default function LearnerReset() {
  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <Suspense fallback={<div className="text-gray-400">Loading…</div>}>
        <ResetForm />
      </Suspense>
    </main>
  );
}
