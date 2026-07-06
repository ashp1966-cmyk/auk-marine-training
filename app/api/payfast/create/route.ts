import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildSignature, paymentUrl } from "@/lib/payfast";

// Public: called right after a booking is created, to get the fields needed
// to redirect the customer to PayFast. The merchant key/passphrase never
// leave the server — only the finished, signed field set is returned.
export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();
  const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { course: true, learner: true } });
  if (!booking) return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  const secret = await prisma.payfastSecret.findUnique({ where: { id: "singleton" } });

  if (!settings?.payfastEnabled || !secret?.merchantId || !secret?.merchantKey) {
    return NextResponse.json({ ok: false, error: "PayFast is not configured yet — ask AUK Marine to set it up in Settings" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://" + req.headers.get("host");
  const nameParts = booking.learner.name.trim().split(/\s+/);

  const rawFields: Record<string, string> = {
    merchant_id:   secret.merchantId,
    merchant_key:  secret.merchantKey,
    return_url:    `${siteUrl}/booking/${booking.ref}/thanks`,
    cancel_url:    `${siteUrl}/booking/${booking.ref}/cancelled`,
    notify_url:    `${siteUrl}/api/payfast/notify`,
    name_first:    nameParts[0] || "",
    name_last:     nameParts.slice(1).join(" ") || "",
    email_address: booking.learner.email,
    m_payment_id:  booking.ref,
    amount:        (booking.amountCents / 100).toFixed(2),
    item_name:     `${booking.course.code} ${booking.course.title}`.slice(0, 100),
  };

  // Remove empty values — PayFast's signature calculation excludes blank fields,
  // and we must send exactly the same set of fields we sign, otherwise the
  // signatures won't match even with correct credentials.
  const fields: Record<string, string> = Object.fromEntries(
    Object.entries(rawFields).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );

  const signature = buildSignature(fields, secret.passphrase);

  // TEMPORARY DIAGNOSTIC — remove after PayFast is working
  const sorted = Object.entries(fields)
    .filter(([, v]) => v !== "" && v != null)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const sigStr = sorted.map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, "+")}`).join("&");
  console.error("PAYFAST_FIELDS:", JSON.stringify(sorted.map(([k, v]) => `${k}=${v}`)));
  console.error("PAYFAST_SIG_STRING:", sigStr);
  console.error("PAYFAST_SIGNATURE:", signature);
  console.error("PAYFAST_PASSPHRASE_LEN:", secret.passphrase?.length || 0);
  // END DIAGNOSTIC

  return NextResponse.json({
    ok: true,
    actionUrl: paymentUrl(settings.payfastMode as "sandbox" | "live"),
    fields: { ...fields, signature },
  });
}
