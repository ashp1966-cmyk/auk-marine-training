import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendEmail, bookingReceivedEmail } from "@/lib/email";

// POST /api/bookings — create a booking (public, used by BookingForm)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { courseId, mode, seats, date, name, email, phone, org, consent, method } = body;

  if (!courseId || !name || !email || !consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ ok: false, error: "Course not found" }, { status: 404 });

  // Upsert a learner record — matches by email so repeat bookers keep one account
  let learner = await prisma.learner.findUnique({ where: { email } });
  if (!learner) {
    learner = await prisma.learner.create({ data: { name, email, phone: phone || "", org: org || "", consentAt: consent ? new Date() : null } });
  } else {
    learner = await prisma.learner.update({ where: { email }, data: { name, phone: phone || undefined, org: org || undefined } });
  }

  // Generate human-readable booking ref
  const ref = `AUK-${Math.random().toString(36).slice(2, 5).toUpperCase()}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

  const isFree = course.price === 0;
  const booking = await prisma.booking.create({
    data: {
      ref,
      courseId,
      learnerId: learner.id,
      mode: mode || "virtual",
      seats: seats || 1,
      date: date ? new Date(date) : new Date(),
      amountCents: course.price,
      method: isFree ? "free" : (method || "payfast"),
      status: isFree ? "Confirmed" : "Pending",
    },
  });

  if (isFree) {
    await prisma.enrollment.upsert({
      where: { learnerId_courseId: { learnerId: learner.id, courseId } },
      update: {},
      create: { learnerId: learner.id, courseId },
    });
  }

  // Notify admin
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (settings?.notifyEmail) {
    sendEmail({
      to: settings.notifyEmail,
      subject: `Booking received — ${ref}`,
      html: bookingReceivedEmail(name, email, course.title, ref, course.price),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, booking: { id: booking.id, ref: booking.ref } });
}

// GET /api/bookings — list bookings (admin only)
export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: session.providerId ? { course: { providerId: session.providerId } } : undefined,
    include: {
      course: { select: { title: true, code: true } },
      learner: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ ok: true, bookings });
}
