"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CourseForm from "@/components/CourseForm";
import Link from "next/link";

function EditCourseInner({ id }: { id: string }) {
  const [course, setCourse] = useState<any>(null);
  const params = useSearchParams();
  const tab = params.get("tab") as any;

  useEffect(() => {
    fetch(`/api/courses/${id}`).then((r) => r.json()).then((d) => setCourse(d.course));
  }, [id]);

  if (!course) return <div className="p-10 text-gray-400">Loading course…</div>;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Edit course</h1>
          <p className="text-sm text-gray-500 mt-0.5">{course.code} · {course.title}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/course/${course.id}`} target="_blank" className="btn-ghost text-xs">Preview ↗</Link>
          <Link href="/admin/courses" className="btn-ghost text-xs">← All courses</Link>
        </div>
      </div>

      {/* Quick tab guide */}
      <div className="mb-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
        Use the <b>4 tabs below</b> to build your course:
        <span className="ml-2 font-semibold">📋 Basic info</span> →
        <span className="ml-2 font-semibold">📖 Lessons</span> →
        <span className="ml-2 font-semibold">🎬 Videos & files</span> →
        <span className="ml-2 font-semibold">✅ Quiz</span>
      </div>

      <CourseForm existing={course} initialTab={tab || "basic"} />
    </div>
  );
}

export default function EditCourse({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="p-10 text-gray-400">Loading…</div>}>
      <EditCourseInner id={params.id} />
    </Suspense>
  );
}
