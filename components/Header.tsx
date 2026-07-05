"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setSignedIn(!!d.signedIn))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-hull text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-teal">⚓</span>
          AUK Marine Training
        </Link>
        <nav className="hidden gap-4 text-sm sm:flex">
          <Link href="/catalog" className="hover:text-brass2">Catalogue</Link>
          <Link href="/learn" className="hover:text-brass2">My Learning</Link>
          <Link href="/research" className="hover:text-brass2">Research Lab</Link>
          <Link href="/facilitators" className="hover:text-brass2">Facilitators</Link>
        </nav>
        <Link href="/admin" className="ml-auto rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10">
          {signedIn ? "🔓 Admin" : "Admin sign-in"}
        </Link>
      </div>
    </header>
  );
}
