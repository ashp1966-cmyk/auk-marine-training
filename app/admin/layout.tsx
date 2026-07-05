"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "setup" | "login" | "in">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  async function refresh() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setStatus(data.setupNeeded ? "setup" : data.signedIn ? "in" : "login");
  }

  useEffect(() => { refresh(); }, []);

  async function doSetup() {
    setError("");
    if (password.length < 8) return setError("Passcode must be at least 8 characters");
    if (password !== password2) return setError("Passcodes don't match");
    const res = await fetch("/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.ok) return setError(data.error);
    refresh();
  }

  async function doLogin() {
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.ok) return setError(data.error);
    refresh();
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    refresh();
  }

  if (status === "loading") return <div className="p-10 text-gray-400">Loading…</div>;

  if (status === "setup" || status === "login") {
    return (
      <main className="mx-auto max-w-md px-5 py-16">
        <div className="card p-8">
          <h1 className="font-serif text-2xl font-bold">{status === "setup" ? "Set up admin access" : "Admin sign-in"}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {status === "setup" ? "No administrator exists yet. Create the one AUK Marine admin account now." : "Restricted to AUK Marine administrators."}
          </p>
          <div className="mt-5 space-y-3">
            <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Passcode" value={password} onChange={(e) => setPassword(e.target.value)} />
            {status === "setup" && (
              <input type="password" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Confirm passcode" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="btn-primary w-full justify-center" onClick={status === "setup" ? doSetup : doLogin}>
              {status === "setup" ? "Create admin account" : "Sign in"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const nav = [
    ["/admin", "Dashboard"],
    ["/admin/courses", "Courses"],
    ["/admin/bookings", "Bookings"],
    ["/admin/facilitators", "Facilitators"],
    ["/admin/settings", "Settings"],
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-[200px_1fr]">
      <aside className="space-y-1">
        {nav.map(([href, label]) => (
          <Link key={href} href={href} className={`block rounded-md px-3 py-2 text-sm font-medium ${pathname === href ? "bg-hull text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            {label}
          </Link>
        ))}
        <button onClick={signOut} className="mt-4 block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">
          🔒 Sign out
        </button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
