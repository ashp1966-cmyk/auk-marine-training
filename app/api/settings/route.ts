import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// Public: site content/branding needed to render the homepage — no secrets included.
export async function GET() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
  return NextResponse.json({ ok: true, settings });
}

// Admin only: update site settings AND PayFast credentials in one call.
// PayFast secret fields are written to a separate table and never echoed back.
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  if (session.providerId !== null) {
    return NextResponse.json({ ok: false, error: "Only the AUK platform admin can change platform settings" }, { status: 403 });
  }

  const body = await req.json();
  const { merchantId, merchantKey, passphrase, ...siteFields } = body;

  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: siteFields,
    create: { id: "singleton", ...siteFields },
  });

  if (merchantId !== undefined || merchantKey !== undefined || passphrase !== undefined) {
    await prisma.payfastSecret.upsert({
      where: { id: "singleton" },
      update: {
        ...(merchantId !== undefined ? { merchantId } : {}),
        ...(merchantKey !== undefined ? { merchantKey } : {}),
        ...(passphrase !== undefined ? { passphrase } : {}),
      },
      create: { id: "singleton", merchantId: merchantId || "", merchantKey: merchantKey || "", passphrase: passphrase || "" },
    });
  }

  return NextResponse.json({ ok: true, settings });
}
