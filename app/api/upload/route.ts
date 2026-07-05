import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth";

const ALLOWED = new Set(["jpg", "jpeg", "png", "gif", "webp", "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "mp4", "webm", "mov"]);
const MAX_BYTES = 50 * 1024 * 1024; // 50MB — raise if needed, Vercel Blob has no meaningful ceiling for this use case

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ ok: false, error: "No file received" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 });

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED.has(ext)) return NextResponse.json({ ok: false, error: `File type not allowed: .${ext}` }, { status: 415 });

  const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ ok: true, url: blob.url, name: file.name, ext, size: file.size });
}
