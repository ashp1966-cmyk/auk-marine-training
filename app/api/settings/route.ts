import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  if (session.providerId !== null) {
    return NextResponse.json({ ok: false, error: "Only the AUK platform admin can change settings" }, { status: 403 });
  }

  const body = await req.json();

  // Only update known fields — never spread the whole body into Prisma
  const siteData: any = {};
  if (body.heroTitle    !== undefined) siteData.heroTitle    = String(body.heroTitle);
  if (body.heroAccent   !== undefined) siteData.heroAccent   = String(body.heroAccent);
  if (body.heroLead     !== undefined) siteData.heroLead     = String(body.heroLead);
  if (body.badge        !== undefined) siteData.badge        = String(body.badge);
  if (body.footerAbout  !== undefined) siteData.footerAbout  = String(body.footerAbout);
  if (body.fromEmail    !== undefined) siteData.fromEmail    = String(body.fromEmail);
  if (body.notifyEmail  !== undefined) siteData.notifyEmail  = String(body.notifyEmail);
  if (body.whatsapp     !== undefined) siteData.whatsapp     = String(body.whatsapp);
  if (body.orgName      !== undefined) siteData.orgName      = String(body.orgName);
  if (body.payfastEnabled !== undefined) siteData.payfastEnabled = Boolean(body.payfastEnabled);
  if (body.payfastMode  !== undefined) siteData.payfastMode  = String(body.payfastMode);

  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: siteData,
      create: { id: "singleton", ...siteData },
    });

    if (body.merchantId || body.merchantKey || body.passphrase) {
      await prisma.payfastSecret.upsert({
        where: { id: "singleton" },
        update: {
          ...(body.merchantId  ? { merchantId:  String(body.merchantId)  } : {}),
          ...(body.merchantKey ? { merchantKey: String(body.merchantKey) } : {}),
          ...(body.passphrase  ? { passphrase:  String(body.passphrase)  } : {}),
        },
        create: {
          id: "singleton",
          merchantId:  String(body.merchantId  || ""),
          merchantKey: String(body.merchantKey || ""),
          passphrase:  String(body.passphrase  || ""),
        },
      });
    }

    return NextResponse.json({ ok: true, settings });
  } catch (e: any) {
    console.error("Settings save error:", e?.message);
    return NextResponse.json({ ok: false, error: e?.message || "Database error saving settings" }, { status: 500 });
  }
}
