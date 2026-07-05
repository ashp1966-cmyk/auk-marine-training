import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin, hashPassword } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

function tempPassword() {
  return crypto.randomBytes(9).toString("base64").replace(/[+/=]/g, "").slice(0, 12);
}

// Only the platform super-admin (providerId === null) can invite provider-scoped admins.
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  if (session.providerId !== null) {
    return NextResponse.json({ ok: false, error: "Only the AUK platform admin can invite provider admins" }, { status: 403 });
  }

  const { email, providerId } = await req.json();
  if (!email || !providerId) return NextResponse.json({ ok: false, error: "Email and provider are required" }, { status: 400 });

  const provider = await prisma.provider.findUnique({ where: { id: providerId } });
  if (!provider) return NextResponse.json({ ok: false, error: "Provider not found" }, { status: 404 });

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ ok: false, error: "An admin with this email already exists" }, { status: 409 });

  const password = tempPassword();
  const passwordHash = await hashPassword(password);
  await prisma.admin.create({ data: { email, passwordHash, providerId } });

  const emailResult = await sendEmail({
    to: email,
    subject: `Your AUK Marine Training admin access — ${provider.name}`,
    html: `<div style="font-family:sans-serif;max-width:520px">
      <h2 style="color:#0B2A3D">You've been given admin access</h2>
      <p>You can now manage <b>${provider.name}</b>'s courses, bookings and schedule on AUK Marine Training.</p>
      <p><b>Email:</b> ${email}<br><b>Temporary password:</b> <span style="font-family:monospace;font-size:16px">${password}</span></p>
      <p>Sign in at your admin URL and change this password immediately under Settings.</p>
    </div>`,
  });

  return NextResponse.json({
    ok: true,
    // Only shown here as a fallback in case email sending isn't configured yet —
    // the API response itself is only ever visible to the super-admin who made this call.
    temporaryPassword: emailResult.ok ? undefined : password,
    emailed: emailResult.ok,
  });
}
