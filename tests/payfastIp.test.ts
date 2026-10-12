import { test } from "node:test";
import assert from "node:assert/strict";
import { inCidr, inStaticRanges } from "../lib/payfastIp";

test("cidr matching", () => {
  assert.equal(inCidr("197.97.145.150", "197.97.145.144/28"), true);
  assert.equal(inCidr("197.97.145.160", "197.97.145.144/28"), false);
  assert.equal(inCidr("41.74.179.210", "41.74.179.192/27"), true);
  assert.equal(inCidr("144.126.193.139", "144.126.193.139/32"), true);
  assert.equal(inCidr("144.126.193.140", "144.126.193.139/32"), false);
});
test("static ranges accept PayFast and reject others", () => {
  assert.equal(inStaticRanges("102.216.36.5"), true);
  assert.equal(inStaticRanges("8.8.8.8"), false);
  assert.equal(inStaticRanges("not-an-ip"), false);
});
