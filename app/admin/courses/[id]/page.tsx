"use client";
import { useEffect, useState } from "react";
import CourseForm from "@/components/CourseForm";

export default function EditCourse({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/courses/${params.id}`).then((r) => r.json()).then((d) => setCourse(d.course));
  }, [params.id]);

  if (!course) return <div className="p-10 text-gray-400">Loading…</div>;

  return (
    <div>
      <h1 className="mb-5 font-serif text-2xl font-bold">Edit course</h1>
      <CourseForm existing={course} />
    </div>
  );
}
