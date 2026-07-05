import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");
  const sessions = await prisma.session.findMany({
    where: courseId ? { courseId } : {},
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ ok: true, sessions });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const created = await prisma.session.create({
    data: {
      courseId: body.courseId,
      date: new Date(body.date),
      mode: body.mode,
      capacity: body.capacity || 20,
      facilitator: body.facilitator || "",
      venue: body.venue || null,
      platform: body.platform || null,
    },
  });
  return NextResponse.json({ ok: true, session: created });
}
