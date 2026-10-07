import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";

// POST /api/group/manage { manageToken, action: "regenerate" }
// Buyer-only (the manage link is the credential). Issues a new join link and
// kills the old one — use if the link leaks outside the company.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = await checkRateLimit(`group-manage:${ip}`, 20, 10 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });

  const { manageToken, action } = await req.json().catch(() => ({}));
  if (!manageToken || action !== "regenerate") return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });

  const group = await prisma.groupBooking.findUnique({ where: { manageToken: String(manageToken) } });
  if (!group) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (group.status !== "Paid") return NextResponse.json({ ok: false, error: "Order not paid yet" }, { status: 409 });

  const joinToken = crypto.randomBytes(18).toString("hex");
  await prisma.groupBooking.update({ where: { id: group.id }, data: { joinToken } });
  return NextResponse.json({ ok: true, joinToken });
}
