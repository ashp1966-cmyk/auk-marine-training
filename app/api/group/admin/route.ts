import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendEmail, groupPaidEmail } from "@/lib/email";

/**
 * Admin-only team-order tools.
 *   GET  → list of team orders (newest first)
 *   POST → { ref, to? } re-sends the "Team payment received" email for a PAID
 *          order. `to` is optional and overrides the contact email, so an
 *          admin can test delivery without emailing the customer.
 */
async function superAdmin() {
  const s = await requireAdmin();
  // Facilitator (provider) admins must not see other companies' orders.
  if (!s || s.providerId !== null) return null;
  return s;
}

export async function GET() {
  if (!(await superAdmin())) return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  const groups = await prisma.groupBooking.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: { select: { code: true, title: true } } },
    take: 200,
  });
  return NextResponse.json({
    ok: true,
    groups: groups.map((g) => ({
      ref: g.ref, company: g.company, contactName: g.contactName, contactEmail: g.contactEmail,
      course: `${g.course.code} ${g.course.title}`, seats: g.seats, claimed: g.claimed,
      amountCents: g.amountCents, status: g.status, createdAt: g.createdAt, paidAt: g.paidAt,
    })),
  });
}

export async function POST(req: NextRequest) {
  if (!(await superAdmin())) return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const ref = String(body.ref || "");
  const override = String(body.to || "").trim();
  if (override && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(override)) {
    return NextResponse.json({ ok: false, error: "That email address looks invalid" }, { status: 400 });
  }
  const group = await prisma.groupBooking.findUnique({ where: { ref }, include: { course: true } });
  if (!group) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
  if (group.status !== "Paid") {
    return NextResponse.json({ ok: false, error: "Only PAID orders can be re-sent" }, { status: 400 });
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get("host")}`;
  const to = override || group.contactEmail;
  const r: any = await sendEmail({
    to,
    subject: `Team payment received — ${group.course.code}`,
    html: groupPaidEmail(group.contactName, group.company, group.course.title, group.seats, group.ref,
      `${siteUrl}/join/${group.joinToken}`, `${siteUrl}/group/${group.manageToken}`, group.domainLock),
  });
  if (!r?.ok) {
    return NextResponse.json({
      ok: false,
      error: r?.skipped
        ? "RESEND_API_KEY is not set on Vercel"
        : "Resend refused the email — open Resend → Logs (or Vercel → Logs) for the reason",
    }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sentTo: to });
}
