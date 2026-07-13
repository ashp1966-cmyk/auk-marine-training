import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Thanks({ params }: { params: { ref: string } }) {
  const booking = await prisma.booking.findUnique({
    where: { ref: params.ref },
    include: { course: true, learner: true },
  });

  // If payment confirmed and enrollment exists → go straight to the LMS player
  if (booking?.status === "Paid" || booking?.status === "Confirmed" || booking?.status === "Enrolled") {
    const enrollment = await prisma.enrollment.findUnique({
      where: { learnerId_courseId: { learnerId: booking.learnerId, courseId: booking.courseId } },
    });
    if (enrollment) redirect(`/course/${booking.courseId}/learn`);
  }

  // Still processing — show a brief holding page that auto-refreshes
  return (
    <main className="mx-auto max-w-md px-5 py-20 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-teal text-white text-3xl animate-pulse">✓</div>
      <h1 className="font-serif text-2xl font-bold text-hull">Payment received!</h1>
      {booking && (
        <>
          <p className="mt-3 text-gray-500">
            Confirming your enrolment in <b>{booking.course.title}</b>.<br />
            This takes just a moment…
          </p>
          <p className="mt-3 font-mono text-sm text-gray-400">{booking.ref}</p>
        </>
      )}
      <p className="mt-6 text-xs text-gray-400">You will be redirected to your course automatically.</p>
      {/* Auto-refresh every 3 seconds until enrollment is ready */}
      <meta httpEquiv="refresh" content="3" />
    </main>
  );
}
