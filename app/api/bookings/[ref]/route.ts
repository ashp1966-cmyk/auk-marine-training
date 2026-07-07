import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// PATCH /api/bookings/[ref] — update booking status
export async function PATCH(req: NextRequest, { params }: { params: { ref: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const body = await req.json();
  const booking = await prisma.booking.update({
    where: { ref: params.ref },
    data: { status: body.status },
  });
  return NextResponse.json({ ok: true, booking });
}

// DELETE /api/bookings/[ref] — delete a booking (admin only, not paid bookings)
export async function DELETE(_req: NextRequest, { params }: { params: { ref: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const booking = await prisma.booking.findUnique({ where: { ref: params.ref } });
  if (!booking) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (booking.status === "Paid") {
    return NextResponse.json({ ok: false, error: "Cannot delete a paid booking — cancel it instead" }, { status: 400 });
  }

  await prisma.booking.delete({ where: { ref: params.ref } });
  return NextResponse.json({ ok: true });
}
