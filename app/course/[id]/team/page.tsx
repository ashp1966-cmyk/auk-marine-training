import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import GroupBuyForm from "@/components/GroupBuyForm";
import { GROUP_MIN_SEATS, GROUP_MAX_SEATS } from "@/lib/group";

export const dynamic = "force-dynamic";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course || !course.published || course.price <= 0) return notFound();
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <Link href={`/course/${course.id}`} className="text-xs text-gray-400 hover:text-teal">← {course.title}</Link>
      <h1 className="mt-3 font-serif text-3xl font-bold text-hull">Buy for your team</h1>
      <p className="mt-2 text-sm text-gray-600">
        Pay once for {GROUP_MIN_SEATS}–{GROUP_MAX_SEATS} seats on <b>{course.title}</b>. You receive one link to share —
        each employee signs up and claims a seat, then learns at their own pace and earns their own certificate.
      </p>
      <div className="mt-6">
        <GroupBuyForm courseId={course.id} priceCents={course.price} minSeats={GROUP_MIN_SEATS} maxSeats={GROUP_MAX_SEATS} />
      </div>
    </main>
  );
}
