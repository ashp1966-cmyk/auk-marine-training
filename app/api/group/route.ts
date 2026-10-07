import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";
import { GROUP_MIN_SEATS, GROUP_MAX_SEATS, groupAmountCents, newGroupRef, normaliseDomain, validSeatCount } from "@/lib/group";
import { sendEmail, groupOrderAdminEmail } from "@/lib/email";

// POST /api/group — create a pending team order. The browser is then sent to
// /api/payfast/form/<ref>; seats only become claimable once PayFast's ITN
// confirms payment (see app/api/payfast/notify).
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = await checkRateLimit(`group-create:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ ok: false, error: "Too many requests — try again later" }, { status: 429 });

  const b = await req.json().catch(() => ({}));
  const company = String(b.company ?? "").trim().slice(0, 120);
  const contactName = String(b.contactName ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
  const contactEmail = String(b.contactEmail ?? "").trim().toLowerCase();
  const contactPhone = String(b.contactPhone ?? "").trim().slice(0, 40);
  const seats = Number(b.seats);
  const domainRaw = String(b.domainLock ?? "").trim();
  const domainLock = normaliseDomain(domainRaw);

  if (!b.courseId || !company || !contactName || !b.consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return NextResponse.json({ ok: false, error: "Enter a valid contact email" }, { status: 400 });
  }
  if (!validSeatCount(seats)) {
    return NextResponse.json({ ok: false, error: `Seats must be between ${GROUP_MIN_SEATS} and ${GROUP_MAX_SEATS}` }, { status: 400 });
  }
  if (domainRaw && !domainLock) {
    return NextResponse.json({ ok: false, error: "Email domain looks invalid — use e.g. company.co.za" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: String(b.courseId) } });
  if (!course || !course.published) return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });
  if (course.price <= 0) return NextResponse.json({ ok: false, error: "Team purchase is for paid courses only" }, { status: 400 });

  const amountCents = groupAmountCents(seats, course.price); // price is always read server-side
  const group = await prisma.groupBooking.create({
    data: {
      ref: newGroupRef(), courseId: course.id, company, contactName, contactEmail,
      contactPhone: contactPhone || null, seats, amountCents, domainLock,
    },
  });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (settings?.notifyEmail) {
    sendEmail({
      to: settings.notifyEmail,
      subject: `Team order started — ${group.ref}`,
      html: groupOrderAdminEmail(company, contactName, contactEmail, course.title, seats, amountCents, group.ref, "started"),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, ref: group.ref });
}
