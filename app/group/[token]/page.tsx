import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import Link from "next/link";
import GroupManageClient from "@/components/GroupManageClient";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function GroupManage({ params }: { params: { token: string } }) {
  const group = await prisma.groupBooking.findUnique({
    where: { manageToken: params.token },
    include: { course: true, claims: { include: { learner: true }, orderBy: { createdAt: "asc" } } },
  });
  if (!group) {
    return <main className="mx-auto max-w-md px-5 py-20 text-center"><h1 className="font-serif text-2xl font-bold text-hull">Order not found</h1>
      <p className="mt-2 text-sm text-gray-500">Check the link from your confirmation email.</p></main>;
  }

  const rand = (c: number) => `R${(c / 100).toLocaleString("en-ZA")}`;

  if (group.status !== "Paid") {
    return (
      <main className="mx-auto max-w-md px-5 py-20 text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-teal text-3xl text-white animate-pulse">⏳</div>
        <h1 className="font-serif text-2xl font-bold text-hull">Waiting for payment confirmation</h1>
        <p className="mt-3 text-sm text-gray-500">{group.seats} seats · {group.course.title} · {rand(group.amountCents)}<br />
          If you've just paid, this page updates by itself within a minute.</p>
        <Link href={`/api/payfast/form/${group.ref}`} className="mt-5 inline-block text-sm text-teal underline">Not paid yet? Continue to PayFast</Link>
        <p className="mt-4 font-mono text-xs text-gray-400">{group.ref}</p>
        <meta httpEquiv="refresh" content="5" />
      </main>
    );
  }

  const host = headers().get("host");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${host}`;
  const joinUrl = `${origin}/join/${group.joinToken}`;

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId: group.courseId, learnerId: { in: group.claims.map((c) => c.learnerId) } },
  });
  const progress = new Map<string, number>(enrollments.map((e: { learnerId: string; progress: number }) => [e.learnerId, e.progress] as [string, number]));
  const done = group.claims.filter((c) => (progress.get(c.learnerId) ?? 0) >= 100).length;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="text-xs font-mono text-teal">{group.course.code} · {group.ref}</div>
      <h1 className="font-serif text-3xl font-bold text-hull">{group.company}</h1>
      <p className="mt-1 text-sm text-gray-500">{group.course.title}</p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="card p-4 text-center"><div className="font-serif text-2xl font-bold text-hull">{group.seats}</div><div className="text-xs text-gray-400">Seats bought</div></div>
        <div className="card p-4 text-center"><div className="font-serif text-2xl font-bold text-amber-600">{group.claimed}</div><div className="text-xs text-gray-400">Claimed</div></div>
        <div className="card p-4 text-center"><div className="font-serif text-2xl font-bold text-teal">{done}</div><div className="text-xs text-gray-400">Completed</div></div>
      </div>

      <div className="card mt-6 p-5">
        <h2 className="font-serif text-lg font-bold text-hull">Your team's join link</h2>
        <p className="mb-3 mt-1 text-sm text-gray-500">
          Send this to your employees. {group.seats - group.claimed} seat{group.seats - group.claimed === 1 ? "" : "s"} remaining.
          {group.domainLock && <> Only <b>@{group.domainLock}</b> emails can join.</>}
        </p>
        <GroupManageClient manageToken={group.manageToken} joinUrl={joinUrl} origin={origin} />
      </div>

      <div className="card mt-6 overflow-hidden">
        <h2 className="border-b border-gray-100 px-5 py-3 font-serif text-lg font-bold text-hull">Team progress</h2>
        {group.claims.length === 0 ? (
          <p className="p-5 text-sm text-gray-400">No one has joined yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {group.claims.map((c) => {
                const p = progress.get(c.learnerId) ?? 0;
                return (
                  <tr key={c.id}>
                    <td className="px-5 py-3"><div className="font-semibold text-gray-900">{c.learner.name}</div><div className="text-xs text-gray-400">{c.learner.email}</div></td>
                    <td className="w-40 px-5 py-3">
                      <div className="h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full bg-teal" style={{ width: `${p}%` }} /></div>
                      <div className="mt-1 text-right text-xs text-gray-500">{p >= 100 ? "✓ Completed" : `${p}%`}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-6 text-center text-xs text-gray-400">Keep this page's link private — it shows your team's details.</p>
    </main>
  );
}
