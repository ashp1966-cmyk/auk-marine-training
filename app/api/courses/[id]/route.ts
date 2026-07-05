import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { provider: true, sessions: true },
  });
  if (!course) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, course });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const course = await prisma.course.update({
    where: { id: params.id },
    data: {
      code: body.code,
      title: body.title,
      category: body.category,
      providerId: body.providerId,
      durationLabel: body.durationLabel,
      nqfLevel: body.nqfLevel || null,
      credits: body.credits || null,
      modes: body.modes,
      price: body.price,
      summary: body.summary,
      outcomes: body.outcomes,
      modules: body.modules,
      photos: body.photos,
      videos: body.videos,
      materials: body.materials,
      practical: body.practical,
      quiz: body.quiz,
      featured: !!body.featured,
      published: body.published !== false,
    },
  });
  return NextResponse.json({ ok: true, course });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  await prisma.course.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
