import { NextResponse } from "next/server";
import { clearLearnerSession } from "@/lib/learnerAuth";

export async function POST() {
  clearLearnerSession();
  return NextResponse.json({ ok: true });
}
