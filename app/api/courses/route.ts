import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Public: anyone can browse published courses — no admin data is exposed here.
export async function GET(req: NextRequest) {
  const includeUnpublished = req.nextUrl.searchParams.get("all") === "1";
  const session = includeUnpublished ? await requireAdmin() : null;
  if (includeUnpublished && !session) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  const where = includeUnpublished
    ? (session!.providerId ? { providerId: session!.providerId } : {})
    : { published: true };

  const courses = await prisma.course.findMany({
    where,
    include: { provider: true, sessions: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, courses });
}

// Admin only: create a course. A scoped admin can only create it under their own
// provider, regardless of what providerId they send — the server decides this,
// not the client.
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const providerId = session.providerId || body.providerId;
  if (!body.title || !providerId) {
    return NextResponse.json({ ok: false, error: "Title and provider are required" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      code: body.code || "AUK-NEW",
      title: body.title,
      category: body.category || "Business",
      providerId,
      durationLabel: body.durationLabel || "1 day",
      nqfLevel: body.nqfLevel || null,
      credits: body.credits || null,
      modes: body.modes || ["virtual", "classroom"],
      price: body.price ?? 0,
      summary: body.summary || "",
      outcomes: body.outcomes || [],
      modules: body.modules || [],
      photos: body.photos || [],
      videos: body.videos || [],
      materials: body.materials || [],
      practical: body.practical || {},
      quiz: body.quiz || [],
      featured: !!body.featured,
      published: body.published !== false,
    },
  });

  return NextResponse.json({ ok: true, course });
}
