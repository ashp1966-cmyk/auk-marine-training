"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "setup" | "login" | "in">("loading");
  const [providerId, setProviderId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function refresh() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setProviderId(data.providerId ?? null);
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

  async function sendForgot() {
    await fetch("/api/admin/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setForgotSent(true);
  }

  if (pathname === "/admin/reset") {
    return <>{children}</>; // public password-reset form — must bypass the session gate below
  }

  if (status === "loading") return <div className="p-10 text-gray-400">Loading…</div>;

  if (status === "setup" || status === "login") {
    if (status === "login" && forgotMode) {
      return (
        <main className="mx-auto max-w-md px-5 py-16">
          <div className="card p-8">
            <h1 className="font-serif text-2xl font-bold">Reset your passcode</h1>
            {forgotSent ? (
              <p className="mt-3 text-sm text-teal">If that email has an account, a reset link is on its way. Check your inbox.</p>
            ) : (
              <>
                <p className="mt-2 text-sm text-gray-500">Enter your admin email and we'll send a reset link.</p>
                <input className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn-primary mt-3 w-full justify-center" onClick={sendForgot}>Send reset link</button>
              </>
            )}
            <button className="mt-4 text-sm text-gray-500 hover:underline" onClick={() => { setForgotMode(false); setForgotSent(false); }}>← Back to sign in</button>
          </div>
        </main>
      );
    }

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
            {status === "login" && (
              <button className="w-full text-center text-sm text-gray-500 hover:underline" onClick={() => setForgotMode(true)}>Forgot your passcode?</button>
            )}
          </div>
        </div>
      </main>
    );
  }

  const nav = [
    ["/admin", "Dashboard"],
    ["/admin/courses", "Courses"],
    ["/admin/schedule", "Schedule"],
    ["/admin/bookings", "Bookings"],
    ["/admin/research", "Research"],
    ["/admin/account", "Account"],
    ...(providerId === null
      ? [["/admin/facilitators", "Facilitators"], ["/admin/subscribers", "Subscribers"], ["/admin/settings", "Settings"]]
      : []),
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
