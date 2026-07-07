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
// PayFast published source IPs (sandbox and live) — updated July 2025
// https://developers.payfast.co.za/docs#step_3_confirm_payment
const PAYFAST_IPS = new Set([
  "197.97.145.144", "197.97.145.145", "197.97.145.146", "197.97.145.147",
  "196.33.227.224", "196.33.227.225", "196.33.227.226", "196.33.227.227",
  "41.74.179.192",  "41.74.179.193",  "41.74.179.194",  "41.74.179.195",
]);

export async function POST(req: NextRequest) {
  // Verify the request comes from a known PayFast IP
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const clientIp  = forwarded.split(",")[0].trim();
  const isSandbox = (await prisma.siteSettings.findUnique({ where: { id: "singleton" } }))?.payfastMode === "sandbox";
  if (!isSandbox && !PAYFAST_IPS.has(clientIp)) {
    console.warn("PayFast ITN: rejected from unknown IP", clientIp);
    return new NextResponse("forbidden", { status: 403 });
  }
  const raw = await req.text();
  const params = new URLSearchParams(raw);
  const fields: Record<string, string> = {};
  for (const [k, v] of params.entries()) fields[k] = v;

  const secret   = await prisma.payfastSecret.findUnique({ where: { id: "singleton" } });
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (!secret) return new NextResponse("no config", { status: 500 });

  const signatureOk = verifyItnSignature(fields, secret.passphrase);
  if (!signatureOk) {
    console.warn("PayFast ITN: signature mismatch — rejected", fields.m_payment_id);
    return new NextResponse("invalid signature", { status: 400 });
  }

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
