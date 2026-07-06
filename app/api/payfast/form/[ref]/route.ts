import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildSignature, paymentUrl } from "@/lib/payfast";

// GET /api/payfast/form/[ref]
// Returns a full HTML page that immediately auto-submits a POST form to PayFast.
// This bypasses all client-side JavaScript encoding and JSON serialization — the
// server computes the signature and embeds it directly in the HTML form values.
export async function GET(req: NextRequest, { params }: { params: { ref: string } }) {
  try {
    const booking = await prisma.booking.findFirst({
      where: { ref: params.ref },
      include: {
        course: { select: { code: true, title: true } },
        learner: { select: { name: true, email: true } },
      },
    });
    if (!booking) {
      return new NextResponse("Booking not found", { status: 404 });
    }

    const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    const secret   = await prisma.payfastSecret.findUnique({ where: { id: "singleton" } });

    if (!settings?.payfastEnabled || !secret?.merchantId || !secret?.merchantKey) {
      return new NextResponse("PayFast not configured", { status: 400 });
    }

    const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get("host")}`;
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

    // Remove empty values before signing and before sending
    const fields: Record<string, string> = Object.fromEntries(
      Object.entries(rawFields).filter(([, v]) => v !== "" && v != null)
    );

    const passphrase = secret.passphrase || "";
    const signature  = buildSignature(fields, passphrase);
    const actionUrl  = paymentUrl(settings.payfastMode as "sandbox" | "live");

    // Log for debugging
    const sigFields = Object.entries(fields).filter(([, v]) => v !== "" && v != null);
    console.error("PF_HTML_FIELDS:", JSON.stringify(sigFields.map(([k, v]) => `${k}=${v}`)));
    console.error("PF_HTML_PASSPHRASE_LEN:", passphrase.length);
    console.error("PF_HTML_SIGNATURE:", signature);

    // Escape HTML attribute values
    function esc(v: string) {
      return v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    const inputs = Object.entries({ ...fields, signature })
      .map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`)
      .join("\n      ");

    const html = `<!DOCTYPE html>
<html>
<head><title>Redirecting to PayFast…</title></head>
<body style="font-family:sans-serif;text-align:center;padding:60px">
  <p>Redirecting you to PayFast to complete payment…</p>
  <form id="pf" method="POST" action="${esc(actionUrl)}">
      ${inputs}
  </form>
  <script>document.getElementById("pf").submit();</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (e: any) {
    console.error("PF_HTML_ERROR:", e?.message);
    return new NextResponse("Server error: " + e?.message, { status: 500 });
  }
}
