import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const research = await prisma.research.findMany({ include: { provider: true } });
  return NextResponse.json({ ok: true, research });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const project = await prisma.research.create({ data: body });
  return NextResponse.json({ ok: true, project });
}
