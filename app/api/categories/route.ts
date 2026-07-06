import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const categories = await prisma.categoryMeta.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ ok: true, categories });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  if (!body.name) return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });

  const category = await prisma.categoryMeta.upsert({
    where: { name: body.name },
    update: { photoUrl: body.photoUrl, description: body.description, color: body.color },
    create: { name: body.name, photoUrl: body.photoUrl, description: body.description || "", color: body.color || "#12808c" },
  });
  return NextResponse.json({ ok: true, category });
}
