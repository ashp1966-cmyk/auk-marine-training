import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Thanks({ params }: { params: { ref: string } }) {
  const booking = await prisma.booking.findUnique({ where: { ref: params.ref }, include: { course: true } });

  return (
    <main className="mx-auto max-w-md px-5 py-20 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-teal text-white text-2xl">✓</div>
      <h1 className="font-serif text-2xl font-bold">Thank you</h1>
      <p className="mt-2 text-gray-500">
        {booking
          ? <>Your booking for <b>{booking.course.title}</b> is being confirmed. PayFast notifies us directly, so this can take a minute or two to update.</>
          : "We couldn't find that booking reference."}
      </p>
      {booking && <p className="mt-4 font-mono text-lg font-bold text-hull">{booking.ref}</p>}
      <p className="mt-6 text-sm text-gray-400">
        Current status: <b>{booking?.status}</b>. Refresh this page in a moment if it still says "Pending".
      </p>
    </main>
  );
}
