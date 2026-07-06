import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const FALLBACK = NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 });

export async function GET() {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
    });
    return NextResponse.json({ ok: true, settings });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "DB error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
    if (session.providerId !== null) {
      return NextResponse.json({ ok: false, error: "Only the platform super-admin can change settings" }, { status: 403 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
    }

    // Build a safe update payload with only known SiteSettings fields
    const siteData: Record<string, any> = {};
    if (typeof body.heroTitle    === "string") siteData.heroTitle    = body.heroTitle;
    if (typeof body.heroAccent   === "string") siteData.heroAccent   = body.heroAccent;
    if (typeof body.heroLead     === "string") siteData.heroLead     = body.heroLead;
    if (typeof body.badge        === "string") siteData.badge        = body.badge;
    if (typeof body.footerAbout  === "string") siteData.footerAbout  = body.footerAbout;
    if (typeof body.fromEmail    === "string") siteData.fromEmail    = body.fromEmail;
    if (typeof body.notifyEmail  === "string") siteData.notifyEmail  = body.notifyEmail;
    if (typeof body.whatsapp     === "string") siteData.whatsapp     = body.whatsapp;
    if (typeof body.orgName      === "string") siteData.orgName      = body.orgName;
    if (typeof body.payfastMode  === "string") siteData.payfastMode  = body.payfastMode;
    if (body.payfastEnabled !== undefined) siteData.payfastEnabled = body.payfastEnabled === true || body.payfastEnabled === "on";

    // Save site settings
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: siteData,
      create: { id: "singleton", ...siteData },
    });

    // Save PayFast secrets separately if provided
    const mid = typeof body.merchantId  === "string" ? body.merchantId.trim()  : "";
    const mk  = typeof body.merchantKey === "string" ? body.merchantKey.trim() : "";
    const pp  = typeof body.passphrase  === "string" ? body.passphrase.trim()  : "";

    if (mid || mk || pp) {
      await prisma.payfastSecret.upsert({
        where: { id: "singleton" },
        update: {
          ...(mid ? { merchantId:  mid } : {}),
          ...(mk  ? { merchantKey: mk  } : {}),
          ...(pp  ? { passphrase:  pp  } : {}),
        },
        create: { id: "singleton", merchantId: mid, merchantKey: mk, passphrase: pp },
      });
    }

    return NextResponse.json({ ok: true, settings });
  } catch (e: any) {
    console.error("[settings PUT]", e?.message);
    return NextResponse.json({ ok: false, error: e?.message || "Database error" }, { status: 500 });
  }
}
