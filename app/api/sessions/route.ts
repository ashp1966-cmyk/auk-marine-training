import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");

  if (courseId) {
    // Public: used by the booking form to show cohort options for one course.
    const sessions = await prisma.session.findMany({ where: { courseId }, orderBy: { date: "asc" } });
    return NextResponse.json({ ok: true, sessions });
  }

  // Listing everything is an admin action — scoped to their own provider unless super-admin.
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const sessions = await prisma.session.findMany({
    where: session.providerId ? { course: { providerId: session.providerId } } : {},
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ ok: true, sessions });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const course = await prisma.course.findUnique({ where: { id: body.courseId } });
  if (!course) return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });
  if (session.providerId && course.providerId !== session.providerId) {
    return NextResponse.json({ ok: false, error: "You can only schedule sessions for your own courses" }, { status: 403 });
  }

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
