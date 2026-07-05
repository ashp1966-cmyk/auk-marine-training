import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyItnSignature, validateWithPayfast } from "@/lib/payfast";
import { sendEmail, paymentConfirmedEmail } from "@/lib/email";

/**
 * PayFast calls THIS endpoint directly, server-to-server, after a payment —
 * never the customer's browser. That's what makes it trustworthy: we verify
 * PayFast's signature AND perform PayFast's own recommended server-to-server
 * "validate" callback before ever marking a booking as paid, so nobody can
 * fake a "payment successful" message from their own browser or a leaked
 * passphrase alone.
 *
 * One further hardening step PayFast's docs mention and this doesn't yet do:
 * restricting accepted requests to PayFast's published source IP ranges.
 * Worth adding before very high-value transactions:
 * https://developers.payfast.co.za/docs#step_3_confirm_payment
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const params = new URLSearchParams(raw);
  const fields: Record<string, string> = {};
  for (const [k, v] of params.entries()) fields[k] = v;

  const secret = await prisma.payfastSecret.findUnique({ where: { id: "singleton" } });
  if (!secret) return new NextResponse("no config", { status: 500 });

  const signatureOk = verifyItnSignature(fields, secret.passphrase);
  if (!signatureOk) {
    console.warn("PayFast ITN: signature mismatch — rejected", fields.m_payment_id);
    return new NextResponse("invalid signature", { status: 400 });
  }

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  const validated = await validateWithPayfast(raw, (settings?.payfastMode as "sandbox" | "live") || "sandbox");
  if (!validated) {
    console.warn("PayFast ITN: server-to-server validation failed — rejected", fields.m_payment_id);
    return new NextResponse("failed validation", { status: 400 });
  }

  const ref = fields.m_payment_id;
  const booking = await prisma.booking.findUnique({ where: { ref } });
  if (!booking) return new NextResponse("booking not found", { status: 404 });

  const paidAmountCents = Math.round(parseFloat(fields.amount_gross || "0") * 100);
  if (Math.abs(paidAmountCents - booking.amountCents) > 1) {
    console.warn("PayFast ITN: amount mismatch", ref, paidAmountCents, booking.amountCents);
    return new NextResponse("amount mismatch", { status: 400 });
  }

  if (fields.payment_status === "COMPLETE") {
    await prisma.booking.update({
      where: { ref },
      data: { status: "Paid", payfastPfPaymentId: fields.pf_payment_id || null },
    });
    const full = await prisma.booking.findUnique({
      where: { ref },
      include: { course: true, learner: true },
    });
    await prisma.enrollment.upsert({
      where: { learnerId_courseId: { learnerId: booking.learnerId, courseId: booking.courseId } },
      update: {},
      create: { learnerId: booking.learnerId, courseId: booking.courseId },
    });
    if (full) {
      sendEmail({
        to: full.learner.email,
        subject: `Payment received — ${full.course.code}`,
        html: paymentConfirmedEmail(full.learner.name, full.course.title, full.ref),
      }).catch(() => {});
    }
  } else {
    await prisma.booking.update({ where: { ref }, data: { status: fields.payment_status || "Pending" } });
  }

  return new NextResponse("OK", { status: 200 });
}
