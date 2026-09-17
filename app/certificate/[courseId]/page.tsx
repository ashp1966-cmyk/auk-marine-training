import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getLearnerSession } from "@/lib/learnerAuth";
import ConfirmCertificateName from "./confirm-name";

/**
 * app/certificate/[courseId]/page.tsx
 *
 * Loads the enrollment and hands off to the client component that asks the
 * learner to check their name before anything is written.
 */

export default async function Page({ params }: { params: { courseId: string } }) {
  const session = await getLearnerSession();
  if (!session) {
    redirect(`/learner/login?next=/certificate/${params.courseId}`);
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId: params.courseId } },
    include: { learner: true, course: true },
  });

  if (!enrollment) {
    return (
      <div style={{ maxWidth: "34rem", margin: "0 auto", padding: "3rem 1.25rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Course not found</h1>
        <p style={{ color: "#555", lineHeight: 1.6 }}>
          You are not enrolled on this course.{" "}
          <Link href="/my-learning">Back to my learning</Link>
        </p>
      </div>
    );
  }

  // Already issued — send them straight to it rather than through the name step
  // again. The name is frozen and cannot be changed from here.
  const existing = await prisma.certificate.findUnique({
    where: { learnerId_courseId: { learnerId: session.learnerId, courseId: params.courseId } },
    select: { verifyToken: true },
  });
  if (existing) {
    redirect(`/verify/${existing.verifyToken}`);
  }

  return (
    <ConfirmCertificateName
      courseId={params.courseId}
      initialName={enrollment.learner.name}
      courseTitle={enrollment.course.title}
      courseCode={enrollment.course.code}
      startedOn={enrollment.createdAt.toISOString()}
    />
  );
}
