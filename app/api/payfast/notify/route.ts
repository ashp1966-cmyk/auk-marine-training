import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyItnSignature } from "@/lib/payfast";

/**
 * PayFast calls THIS endpoint directly, server-to-server, after a payment —
 * never the customer's browser. That's what makes it trustworthy: we verify
 * PayFast's signature here before ever marking a booking as paid, so nobody
 * can fake a "payment successful" message from their own browser.
 *
 * This performs the two checks PayFast's own docs recommend for a basic
 * integration: signature verification, and an amount cross-check against
 * our own booking record. For maximum assurance PayFast also recommends an
 * additional server-to-server "validate" callback and source-IP allowlist —
 * both worth adding before very high-value transactions, documented at
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
    await prisma.enrollment.upsert({
      where: { learnerId_courseId: { learnerId: booking.learnerId, courseId: booking.courseId } },
      update: {},
      create: { learnerId: booking.learnerId, courseId: booking.courseId },
    });
  } else {
    await prisma.booking.update({ where: { ref }, data: { status: fields.payment_status || "Pending" } });
  }

  return new NextResponse("OK", { status: 200 });
}
