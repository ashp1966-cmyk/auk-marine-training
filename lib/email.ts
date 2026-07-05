/**
 * Sends real email via Resend (resend.com — free tier covers this easily).
 * Uses fetch directly against their HTTP API, so there's no extra dependency
 * to install. If RESEND_API_KEY isn't set yet, this quietly no-ops and logs
 * a warning instead of crashing anything that calls it — so bookings and
 * applications still work even before email is configured.
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
        from: opts.from || "AUK Marine Training <training@auk-maritime.com>",
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
    <h2 style="color:#0B2A3D">Payment received ✓</h2>
    <p>Hi ${name},</p>
    <p>We've received your payment for <b>${courseTitle}</b> (ref ${ref}). You're fully enrolled — see you in class.</p>
  </div>`;
}

export function facilitatorApplicationAdminEmail(name: string, email: string, role: string) {
  return `<div style="font-family:sans-serif;max-width:520px">
    <h2 style="color:#0B2A3D">New facilitator application</h2>
    <p><b>${name}</b> (${email}) applied as <b>${role}</b>. Review it in Admin → Facilitators.</p>
  </div>`;
}
