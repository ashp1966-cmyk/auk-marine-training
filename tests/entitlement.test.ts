import { test } from "node:test";
import assert from "node:assert/strict";
import { canEnrol } from "../lib/entitlement";

test("free courses are open", () => {
  assert.equal(canEnrol({ coursePriceCents: 0, bookingStatuses: [], hasGroupSeat: false }), true);
});
test("paid course with no booking is blocked", () => {
  assert.equal(canEnrol({ coursePriceCents: 12000, bookingStatuses: [], hasGroupSeat: false }), false);
});
test("pending, cancelled and invoice-sent bookings are blocked", () => {
  for (const s of ["Pending", "Cancelled", "Invoice sent"])
    assert.equal(canEnrol({ coursePriceCents: 12000, bookingStatuses: [s], hasGroupSeat: false }), false);
});
test("paid, confirmed and enrolled bookings are allowed", () => {
  for (const s of ["Paid", "Confirmed", "Enrolled"])
    assert.equal(canEnrol({ coursePriceCents: 12000, bookingStatuses: [s], hasGroupSeat: false }), true);
});
test("a claimed team seat is allowed", () => {
  assert.equal(canEnrol({ coursePriceCents: 12000, bookingStatuses: [], hasGroupSeat: true }), true);
});
