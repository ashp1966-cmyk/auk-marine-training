import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createResetToken } from "@/lib/passwordReset";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

  const admin = await prisma.admin.findUnique({ where: { email } });
  // Always respond the same way whether or not the account exists — otherwise
  // this endpoint could be used to check which emails have admin accounts.
  if (admin) {
    const token = await createResetToken("admin", admin.id);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://" + req.headers.get("host");
    await sendEmail({
      to: admin.email,
      subject: "Reset your AUK Marine Training admin passcode",
      html: `<div style="font-family:sans-serif;max-width:520px">
        <h2 style="color:#0B2A3D">Reset your passcode</h2>
        <p>Click below to set a new passcode. This link expires in 1 hour and only works once.</p>
        <p><a href="${siteUrl}/admin/reset?token=${token}" style="background:#C98A3B;color:#241505;padding:11px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reset passcode</a></p>
        <p style="font-size:12px;color:#888">If you didn't request this, you can ignore this email.</p>
      </div>`,
    });
  }

  return NextResponse.json({ ok: true, message: "If that email has an account, a reset link is on its way." });
}
