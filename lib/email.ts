/**
 * Sends real email via Resend (resend.com — free tier covers this easily).
 * Uses fetch directly against their HTTP API, so there's no extra dependency.
 * If RESEND_API_KEY isn't set, this quietly no-ops so bookings still work.
 *
 * FROM ADDRESS: using onboarding@resend.dev until auk-maritime.com is fully
 * verified in Resend (DKIM + SPF both green). Once verified, change to:
 * "AUK Marine Training <training@auk-maritime.com>"
 */
export async function sendEmail(opts: { to: string; subject: string; html: string; from?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email:", opts.subject);
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: opts.from || "AUK Marine Training <onboarding@resend.dev>",
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      console.warn("Email send failed:", await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.warn("Email send error:", e);
    return { ok: false };
  }
}

export function bookingReceivedEmail(learnerName: string, learnerEmail: string, courseTitle: string, ref: string, amountCents: number) {
  const amount = amountCents === 0 ? "Free / Learnership" : `R${(amountCents / 100).toLocaleString()}`;
  return `<div style="font-family:sans-serif;max-width:520px">
    <h2 style="color:#0B2A3D">New booking received</h2>
    <p><b>${learnerName}</b> (${learnerEmail}) has booked:</p>
    <p style="background:#f2f6f7;padding:12px;border-radius:8px"><b>${courseTitle}</b><br>Ref: ${ref} · Amount: ${amount}</p>
    <p>Review in Admin → Bookings.</p>
  </div>`;
}

export function bookingConfirmedEmail(name: string, courseTitle: string, ref: string) {
  return `<div style="font-family:sans-serif;max-width:520px">
    <h2 style="color:#0B2A3D">You're booked in ✓</h2>
    <p>Hi ${name},</p>
    <p>Your booking for <b>${courseTitle}</b> is confirmed. Keep this reference for any queries:</p>
    <p style="font-family:monospace;font-size:20px;background:#f2f6f7;padding:12px;border-radius:8px;text-align:center">${ref}</p>
    <p>You can start pre-reading now under My Learning.</p>
  </div>`;
}

export function paymentConfirmedEmail(name: string, courseTitle: string, ref: string) {
  return `<div style="font-family:sans-serif;max-width:520px">
    <h2 style="color:#0B2A3D">Payment confirmed ✓</h2>
    <p>Hi ${name},</p>
    <p>Payment received for <b>${courseTitle}</b>. Booking ref: <b>${ref}</b>.</p>
    <p>You now have full access under My Learning.</p>
  </div>`;
}

export function facilitatorApplicationAdminEmail(name: string, email: string, role: string) {
  return `<div style="font-family:sans-serif;max-width:520px">
    <h2 style="color:#0B2A3D">New facilitator application</h2>
    <p><b>${name}</b> (${email}) applied to facilitate.</p>
    <p>Role: ${role}</p>
    <p>Review in Admin → Facilitators.</p>
  </div>`;
}
