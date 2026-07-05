import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { requireAdmin } from "@/lib/auth";
import { sendEmail, bookingConfirmedEmail } from "@/lib/email";

function generateRef() {
  return "AUK-" + nanoid(6).toUpperCase();
}

// Public: anyone booking a course calls this. No admin data is exposed or required.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { courseId, mode, date, seats, name, email, phone, org, consent, method } = body;

  if (!courseId || !name || !email || !consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields or consent" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });

  const learner = await prisma.learner.upsert({
    where: { email },
    update: { name, phone, org },
    create: { name, email, phone, org, consentAt: new Date() },
  });

  const amountCents = (course.price || 0) * (seats || 1);
  const isFree = amountCents === 0;

  const booking = await prisma.booking.create({
    data: {
      ref: generateRef(),
      courseId,
      learnerId: learner.id,
      mode: mode || "virtual",
      date: date ? new Date(date) : new Date(),
      seats: seats || 1,
      amountCents,
      method: isFree ? "free" : method || "payfast",
      status: isFree ? "Enrolled" : "Pending",
    },
  });

  if (isFree) {
    await prisma.enrollment.upsert({
      where: { learnerId_courseId: { learnerId: learner.id, courseId } },
      update: {},
      create: { learnerId: learner.id, courseId },
    });
  }

  sendEmail({
    to: learner.email,
    subject: `Booking ${isFree ? "confirmed" : "received"} — ${course.code}`,
    html: bookingConfirmedEmail(learner.name, course.title, booking.ref),
  }).catch(() => {});

  return NextResponse.json({ ok: true, booking, learnerId: learner.id });
}

// Admin: list bookings — scoped to the admin's own provider, unless super-admin.
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: session.providerId ? { course: { providerId: session.providerId } } : {},
    include: { course: true, learner: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, bookings });
}
