import { test } from "node:test";
import assert from "node:assert/strict";
import { groupAmountCents, validSeatCount, normaliseDomain, emailAllowed, newGroupRef, isGroupRef } from "../lib/group";

test("group price is seats × course price, no discount", () => {
  assert.equal(groupAmountCents(15, 620000), 9_300_000); // 15 × R6,200 = R93,000
  assert.equal(groupAmountCents(2, 200000), 400000);
});
test("seat count limited to 2–50 integers", () => {
  for (const n of [2, 10, 50]) assert.ok(validSeatCount(n));
  for (const n of [0, 1, 51, 2.5, NaN, "5", null]) assert.ok(!validSeatCount(n as any));
});
test("domain normalisation", () => {
  assert.equal(normaliseDomain(" @Acme.CO.za "), "acme.co.za");
  assert.equal(normaliseDomain("jo@Acme.co.za"), "acme.co.za"); // pasted email → domain
  assert.equal(normaliseDomain(""), null);
  assert.equal(normaliseDomain("not a domain"), null);
  assert.equal(normaliseDomain("nodot"), null);
});
test("domain lock matches exact domain only", () => {
  assert.ok(emailAllowed("a@acme.co.za", "acme.co.za"));
  assert.ok(emailAllowed("A@ACME.co.za", "acme.co.za"));
  assert.ok(!emailAllowed("a@evilacme.co.za", "acme.co.za"));
  assert.ok(!emailAllowed("a@acme.co.za.evil.com", "acme.co.za"));
  assert.ok(emailAllowed("anyone@x.com", null));
});
test("group refs are recognised and distinct from booking refs", () => {
  const r = newGroupRef();
  assert.ok(isGroupRef(r));
  assert.ok(!isGroupRef("AUK-ABC-12"));
});
