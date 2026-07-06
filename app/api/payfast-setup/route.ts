import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Dedicated endpoint just for PayFast credentials — keeps it completely
// separate from SiteSettings so neither can break the other.
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
    }
    if (session.providerId !== null) {
      return NextResponse.json({ ok: false, error: "Only the platform admin can change PayFast settings" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const merchantId  = String(body.merchantId  || "").trim();
    const merchantKey = String(body.merchantKey || "").trim();
    const passphrase  = String(body.passphrase  || "").trim();
    const enabled     = body.enabled === true || body.enabled === "on" || body.enabled === "true";
    const mode        = body.mode === "live" ? "live" : "sandbox";

    // Update the enabled/mode flags on SiteSettings
    await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { payfastEnabled: enabled, payfastMode: mode },
      create: { id: "singleton", payfastEnabled: enabled, payfastMode: mode },
    });

    // Save the secrets in their dedicated table
    if (merchantId || merchantKey || passphrase) {
      await prisma.payfastSecret.upsert({
        where: { id: "singleton" },
        update: {
          ...(merchantId  ? { merchantId  } : {}),
          ...(merchantKey ? { merchantKey } : {}),
          ...(passphrase  ? { passphrase  } : {}),
        },
        create: { id: "singleton", merchantId, merchantKey, passphrase },
      });
    }

    return NextResponse.json({ ok: true, message: "PayFast settings saved" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || "Error") }, { status: 500 });
  }
}
