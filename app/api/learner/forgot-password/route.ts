import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createResetToken } from "@/lib/passwordReset";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = await checkRateLimit(`learner-forgot:${ip}`, 5, 15 * 60 * 1000); // 5 per 15 min
  if (!rl.allowed) return NextResponse.json({ ok: true, message: "If that email has an account, a reset link is on its way." }); // Don't reveal rate limit
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

  const learner = await prisma.learner.findUnique({ where: { email } });
  if (learner?.passwordHash) {
    const token = await createResetToken("learner", learner.id);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://" + req.headers.get("host");
    await sendEmail({
      to: learner.email,
      subject: "Reset your AUK Marine Training password",
      html: `<div style="font-family:sans-serif;max-width:520px">
        <h2 style="color:#0B2A3D">Reset your password</h2>
        <p>Click below to set a new password. This link expires in 1 hour and only works once.</p>
        <p><a href="${siteUrl}/learn/reset?token=${token}" style="background:#C98A3B;color:#241505;padding:11px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reset password</a></p>
        <p style="font-size:12px;color:#888">If you didn't request this, you can ignore this email.</p>
      </div>`,
    });
  }

  return NextResponse.json({ ok: true, message: "If that email has an account, a reset link is on its way." });
}
