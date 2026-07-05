import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  const adminExists = (await prisma.admin.count()) > 0;
  return NextResponse.json({
    ok: true,
    signedIn: !!session,
    email: session?.email ?? null,
    setupNeeded: !adminExists,
  });
}
