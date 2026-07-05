import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSignature, verifyItnSignature } from "../lib/payfast";

test("buildSignature produces a consistent MD5 hex string", () => {
  const sig = buildSignature({ merchant_id: "10000100", amount: "100.00", m_payment_id: "AUK-TEST1" }, "mypassphrase");
  assert.match(sig, /^[a-f0-9]{32}$/, "should be a 32-character hex MD5 hash");
});

test("buildSignature changes if any field changes", () => {
  const a = buildSignature({ merchant_id: "10000100", amount: "100.00" }, "pass");
  const b = buildSignature({ merchant_id: "10000100", amount: "200.00" }, "pass");
  assert.notEqual(a, b, "different amount must produce a different signature");
});

test("buildSignature changes if the passphrase changes", () => {
  const fields = { merchant_id: "10000100", amount: "100.00" };
  const a = buildSignature(fields, "correct-passphrase");
  const b = buildSignature(fields, "wrong-passphrase");
  assert.notEqual(a, b, "a different passphrase must produce a different signature — this is what stops a forged ITN with the right fields but no real passphrase");
});

test("verifyItnSignature accepts a signature that matches", () => {
  const passphrase = "shared-secret";
  const fields = { merchant_id: "10000100", m_payment_id: "AUK-ABC123", amount_gross: "620.00", payment_status: "COMPLETE" };
  const signature = buildSignature(fields, passphrase);
  const incoming = { ...fields, signature };
  assert.equal(verifyItnSignature(incoming, passphrase), true);
});

test("verifyItnSignature rejects a tampered field (e.g. amount changed after signing)", () => {
  const passphrase = "shared-secret";
  const fields = { merchant_id: "10000100", m_payment_id: "AUK-ABC123", amount_gross: "620.00" };
  const signature = buildSignature(fields, passphrase);
  const tampered = { ...fields, amount_gross: "6200.00", signature }; // attacker raises the "paid" amount
  assert.equal(verifyItnSignature(tampered, passphrase), false, "changing a field after signing must invalidate the signature");
});

test("verifyItnSignature rejects the right fields signed with the wrong passphrase", () => {
  const fields = { merchant_id: "10000100", m_payment_id: "AUK-ABC123" };
  const signature = buildSignature(fields, "attackers-guess");
  const incoming = { ...fields, signature };
  assert.equal(verifyItnSignature(incoming, "real-passphrase"), false, "a forged signature made with the wrong passphrase must be rejected");
});

test("pfEncode-driven signature handles spaces and special characters consistently", () => {
  const fields = { item_name: "AUK SPM 001 — Shipping, Port & Ships Agency" };
  const sig1 = buildSignature(fields, "pass");
  const sig2 = buildSignature({ ...fields }, "pass");
  assert.equal(sig1, sig2, "identical input must always produce an identical signature");
});
