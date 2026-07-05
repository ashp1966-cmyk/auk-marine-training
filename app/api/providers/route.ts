import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const providers = await prisma.provider.findMany();
  return NextResponse.json({ ok: true, providers });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const provider = await prisma.provider.create({
    data: { name: body.name, tagline: body.tagline || "", location: body.location || "", color: body.color || "#12808c", verified: false },
  });
  return NextResponse.json({ ok: true, provider });
}
