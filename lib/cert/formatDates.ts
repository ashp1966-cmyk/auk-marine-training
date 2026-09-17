/**
 * lib/cert/formatDates.ts
 *
 * Formats the completion date line for the certificate, matching the printed
 * template's style: "On 13 May – 16 May 2025".
 *
 * Shared by the API route (server) and the confirmation preview (client), so
 * what the learner checks is exactly what gets printed.
 */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parts(d: Date) {
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}

export function formatCompletionDates(
  startedOn: Date | string | null | undefined,
  completedOn: Date | string
): string {
  const end = new Date(completedOn);
  const e = parts(end);

  if (!startedOn) {
    return `On ${e.day} ${e.month} ${e.year}`;
  }

  const start = new Date(startedOn);
  const s = parts(start);

  // Same calendar day — a single date reads better than "13 May – 13 May"
  if (s.day === e.day && s.month === e.month && s.year === e.year) {
    return `On ${e.day} ${e.month} ${e.year}`;
  }

  // Different years
  if (s.year !== e.year) {
    return `On ${s.day} ${s.month} ${s.year} – ${e.day} ${e.month} ${e.year}`;
  }

  // Same year — matches the printed template, which repeats the month
  return `On ${s.day} ${s.month} – ${e.day} ${e.month} ${e.year}`;
}
