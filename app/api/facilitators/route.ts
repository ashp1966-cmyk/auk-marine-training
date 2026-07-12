import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET — returns active facilitators (public) or all (admin with ?pending=1)
export async function GET(req: NextRequest) {
  const wantAll = req.nextUrl.searchParams.get("pending") === "1";
  if (wantAll) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
    const facilitators = await prisma.facilitator.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json({ ok: true, facilitators });
  }
  // Public page: only the two core facilitators
  const facilitators = await prisma.facilitator.findMany({
    where: { id: { in: ["capt-ashwani", "kalpana-pathak"] } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ ok: true, facilitators });
}
// POST removed — facilitator applications are closed
