import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Public: view active facilitators (used on the public Facilitators page).
export async function GET(req: NextRequest) {
  const wantPending = req.nextUrl.searchParams.get("pending") === "1";
  if (wantPending) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
    const facilitators = await prisma.facilitator.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json({ ok: true, facilitators });
  }
  const facilitators = await prisma.facilitator.findMany({ where: { status: "active" } });
  return NextResponse.json({ ok: true, facilitators });
}

// Public: anyone can apply to be a facilitator — lands as "pending" for admin review.
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email || !body.consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields or consent" }, { status: 400 });
  }
  const facilitator = await prisma.facilitator.create({
    data: {
      name: body.name,
      email: body.email,
      role: body.role || "Facilitator",
      country: body.country || "",
      years: body.years || 1,
      expertise: body.expertise || [],
      availability: body.availability || [],
      bio: body.bio || "",
      status: "pending",
    },
  });
  return NextResponse.json({ ok: true, facilitator });
}
