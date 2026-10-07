"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Re-runs the server component every `ms` while this page is mounted.
// Unlike <meta http-equiv="refresh">, it stops the moment the user navigates away.
export default function AutoRefresh({ ms = 4000 }: { ms?: number }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), ms);
    return () => clearInterval(t);
  }, [router, ms]);
  return null;
}
