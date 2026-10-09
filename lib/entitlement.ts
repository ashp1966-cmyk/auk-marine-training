/**
 * Who may be enrolled on a course.
 *
 * Enrolment used to be open: POST /api/enrollments created one for any email
 * and course, so anyone could skip payment by calling it directly. It now
 * requires one of:
 *   - the course is free (price 0);
 *   - the learner holds a booking that is paid or confirmed by an admin;
 *   - the learner has claimed a seat from a paid team order.
 * Pending, cancelled and invoice-sent bookings do NOT qualify.
 */
export const ENTITLED_BOOKING_STATUSES = ["Paid", "Confirmed", "Enrolled"] as const;

export function canEnrol(opts: {
  coursePriceCents: number;
  bookingStatuses: string[];
  hasGroupSeat: boolean;
}): boolean {
  if (opts.coursePriceCents <= 0) return true;
  if (opts.hasGroupSeat) return true;
  return opts.bookingStatuses.some((s) => (ENTITLED_BOOKING_STATUSES as readonly string[]).includes(s));
}
