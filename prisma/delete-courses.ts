/**
 * prisma/delete-courses.ts
 *
 * Permanently deletes retired courses and everything attached to them.
 *
 * RUN IT TWICE:
 *   npx tsx --env-file=.env prisma/delete-courses.ts            <- report only, changes nothing
 *   npx tsx --env-file=.env prisma/delete-courses.ts --confirm  <- performs the delete
 *
 * The report run is not optional politeness. Booking, Enrollment and Certificate
 * all reference Course WITHOUT onDelete: Cascade, so a course with any of them
 * attached will throw a foreign-key error rather than delete. Worse, if you then
 * force it, you destroy learner records — and schema.prisma states that an issued
 * certificate is "never deleted", because it is the proof behind a QR code that
 * may already be printed on paper in someone's hand.
 *
 * Read the report. If any course shows enrollments, bookings or certificates,
 * stop and decide deliberately. Setting `published: false` retires a course from
 * the catalogue while preserving the learner record, and is almost always the
 * right answer where real learners are attached.
 *
 * NOTE: these courses have also been removed from the arrays in seed.ts. Deleting
 * the rows without that change is pointless — upsertCourse() recreates any course
 * whose row is missing on the next `npm run db:seed`.
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CODES = [
  "AUK S 7",     // Computer Literacy
  "AUK S 9",     // SAP/ERP
  "AUK S 50",    // Digital Transformation & IR 4.0
  "AUK S 55",    // Development Platform
  "AUK S 56",    // Oracle Database & Design with SQL
  "AUK S 58",    // VLSI Design Training & Manufacturing
  "AUK S 60",    // Hybrid, Mobile & Web App Development
  "AUK AUT01",   // Robotics
  "AUK AUT03",   // Mechatronics
  "AUK AUT05",   // Advanced Tool Maintenance & Repair
  "AUK AUT07",   // 3D Design & Printing
  "AUK B12",     // Lean Six Sigma
  "AUK FIN01",   // Financial & Derivative Modelling
  "AUK SK04",    // Presentation Skills (5 P's)
  "AUK SK06",    // Lean Co-creation
  "AUK SK15",    // Confidence & Empathy
];

async function main() {
  const confirm = process.argv.includes("--confirm");

  const courses = await prisma.course.findMany({
    where: { code: { in: CODES } },
    select: {
      id: true,
      code: true,
      title: true,
      _count: {
        select: { sessions: true, bookings: true, enrollments: true, certificates: true },
      },
    },
    orderBy: { code: "asc" },
  });

  const found = courses.map((c) => c.code);
  const missing = CODES.filter((c) => !found.includes(c));

  console.log(`\nMatched ${courses.length} of ${CODES.length} courses.`);
  if (missing.length) console.log(`Not in database: ${missing.join(", ")}`);

  console.log("\nCode         Sess  Book  Enrol  Cert   Title");
  console.log("─".repeat(78));
  for (const c of courses) {
    const n = c._count;
    console.log(
      `${c.code.padEnd(12)} ${String(n.sessions).padStart(4)}  ${String(n.bookings).padStart(4)}` +
        `  ${String(n.enrollments).padStart(5)}  ${String(n.certificates).padStart(4)}   ${c.title.slice(0, 34)}`
    );
  }

  const blocked = courses.filter(
    (c) => c._count.bookings + c._count.enrollments + c._count.certificates > 0
  );

  if (blocked.length) {
    console.log(
      `\n⚠  ${blocked.length} course(s) have learner records attached:\n` +
        blocked.map((c) => `     ${c.code}`).join("\n")
    );
    console.log(
      "\n   Deleting these destroys booking, enrollment and certificate records.\n" +
        "   A certificate is the proof behind a QR code that may already be printed.\n" +
        "   Consider `published: false` for these instead — it removes them from the\n" +
        "   catalogue and keeps the learner history intact.\n" +
        "\n   Aborting. Remove those codes from CODES if you have decided to proceed."
    );
    return;
  }

  const totalSessions = courses.reduce((s, c) => s + c._count.sessions, 0);
  console.log(`\nClean to delete. ${courses.length} courses, ${totalSessions} scheduled session(s).`);
  console.log("Sessions cascade automatically (onDelete: Cascade on Session.courseId).");

  if (!confirm) {
    console.log("\nReport only — nothing changed.");
    console.log("Re-run with --confirm to delete permanently.\n");
    return;
  }

  const result = await prisma.course.deleteMany({ where: { code: { in: CODES } } });
  console.log(`\n✓ Deleted ${result.count} course(s) permanently.`);

  const remaining = await prisma.course.count();
  const byCategory = await prisma.course.groupBy({
    by: ["category"],
    _count: { id: true },
    orderBy: { category: "asc" },
  });
  console.log("\nRemaining catalogue:");
  byCategory.forEach((c) => console.log(`  ${c.category.padEnd(16)} ${c._count.id}`));
  console.log(`  ${"TOTAL".padEnd(16)} ${remaining}\n`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
