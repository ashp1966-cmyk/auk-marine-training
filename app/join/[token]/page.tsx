import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { getLearnerSession } from "@/lib/learnerAuth";
import JoinClient from "@/components/JoinClient";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function Msg({ title, body }: { title: string; body: string }) {
  return <main className="mx-auto max-w-md px-5 py-20 text-center"><h1 className="font-serif text-2xl font-bold text-hull">{title}</h1><p className="mt-2 text-sm text-gray-500">{body}</p></main>;
}

export default async function JoinPage({ params }: { params: { token: string } }) {
  const group = await prisma.groupBooking.findUnique({ where: { joinToken: params.token }, include: { course: true } });
  if (!group) return <Msg title="Link not valid" body="This link may have been replaced. Ask your team contact for the current one." />;
  if (group.status !== "Paid") return <Msg title="Link not active yet" body="Payment for this team order hasn't been confirmed. Please try again shortly." />;

  // Someone who already holds a seat just goes to the course.
  const session = await getLearnerSession();
  if (session) {
    const seat = await prisma.groupSeat.findUnique({ where: { groupId_learnerId: { groupId: group.id, learnerId: session.learnerId } } });
    if (seat) redirect(`/course/${group.courseId}/learn`);
  }

  const left = group.seats - group.claimed;
  if (left <= 0) return <Msg title="All seats taken" body={`All ${group.seats} seats on this link have been claimed. Contact ${group.company}'s training coordinator.`} />;

  return (
    <main className="mx-auto max-w-md px-5 py-12">
      <div className="card p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-teal">{group.company} · team enrolment</div>
        <h1 className="mt-1 font-serif text-2xl font-bold text-hull">{group.course.title}</h1>
        <p className="mb-5 mt-1 text-sm text-gray-500">{group.course.code} · self-paced online · {left} seat{left === 1 ? "" : "s"} left</p>
        <JoinClient joinToken={group.joinToken} domainLock={group.domainLock} />
      </div>
    </main>
  );
}
