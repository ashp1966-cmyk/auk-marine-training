"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [admin, setAdmin]     = useState<{ signedIn: boolean; email?: string } | null>(null);
  const [learner, setLearner] = useState<{ signedIn: boolean; name?: string } | null>(null);
  const pathname = usePathname();

  function checkAuth() {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAdmin({ signedIn: !!d.signedIn, email: d.email }))
      .catch(() => setAdmin({ signedIn: false }));

    fetch("/api/learner/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setLearner({ signedIn: !!d.signedIn, name: d.learner?.name }))
      .catch(() => setLearner({ signedIn: false }));
  }

  useEffect(() => {
    checkAuth();
    // Re-check when user navigates back to this tab
    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, [pathname]); // re-check on every route change so the banner is always current

  return (
    <header className="sticky top-0 z-50 bg-hull text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-teal">⚓</span>
          AUK Marine Training
        </Link>

        <nav className="hidden gap-4 text-sm sm:flex">
          <Link href="/catalog" className="hover:text-brass2">Catalogue</Link>
          <Link href="/learn" className="hover:text-brass2 flex items-center gap-1">
            My Learning
            {learner?.signedIn && (
              <span className="ml-1 rounded-full bg-teal px-2 py-0.5 text-xs font-semibold text-white">
                {learner.name?.split(" ")[0] || "Signed in"}
              </span>
            )}
          </Link>
          <Link href="/research" className="hover:text-brass2">Research Lab</Link>
          <Link href="/facilitators" className="hover:text-brass2">Facilitators</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Learner sign-out when signed in on mobile */}
          {learner?.signedIn && (
            <button
              onClick={async () => {
                await fetch("/api/learner/logout", { method: "POST" });
                setLearner({ signedIn: false });
                window.location.href = "/";
              }}
              className="hidden sm:block text-xs text-white/60 hover:text-white">
              Sign out ({learner.name?.split(" ")[0]})
            </button>
          )}

          {/* Admin button — hidden when a learner is signed in (learners have no admin role) */}
          {(!learner?.signedIn || admin?.signedIn) && (
            <Link href="/admin"
              className={`rounded-md border px-3 py-1.5 text-sm hover:bg-white/10 transition ${admin?.signedIn ? "border-teal bg-teal/20 text-white" : "border-white/20"}`}>
              {admin?.signedIn ? `🔓 Admin` : "Admin sign-in"}
            </Link>
          )}
        </div>
      </div>

      {/* Signed-in banners */}
      {(admin?.signedIn || learner?.signedIn) && (
        <div className="bg-teal/20 border-t border-white/10 px-5 py-1 text-xs text-white/80 flex gap-4 max-w-6xl mx-auto">
          {admin?.signedIn && (
            <span>🔓 Admin signed in</span>
          )}
          {learner?.signedIn && (
            <span className="flex items-center gap-2">
              👤 Signed in as <b>{learner.name}</b>
              <button
                onClick={async () => {
                  await fetch("/api/learner/logout", { method: "POST" });
                  setLearner({ signedIn: false });
                  window.location.href = "/";
                }}
                className="underline hover:no-underline ml-1">
                Sign out
              </button>
            </span>
          )}
        </div>
      )}
    </header>
  );
}
