import crypto from "crypto";

/**
 * PayFast integration notes:
 * - `buildSignature` creates the MD5 signature PayFast requires on the way OUT
 *   (when we send the customer to PayFast to pay).
 * - `verifyItnSignature` checks the signature PayFast sends back on the way IN
 *   (the "Instant Transaction Notification" webhook) — this is what makes a
 *   booking's paid status trustworthy, instead of just believing the browser.
 * Docs: https://developers.payfast.co.za/docs#step_2_signature
 */

function pfEncode(value: string) {
  // PayFast requires PHP-style urlencode: spaces as '+', uppercase hex escapes.
  return encodeURIComponent(value).replace(/%20/g, "+").replace(/[!'()*]/g, (c) =>
    "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

export function buildSignature(params: Record<string, string>, passphrase: string) {
  const ordered = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
  let base = ordered.map(([k, v]) => `${k}=${pfEncode(String(v))}`).join("&");
  if (passphrase) base += `&passphrase=${pfEncode(passphrase)}`;
  return crypto.createHash("md5").update(base).digest("hex");
}

/** Verifies an inbound ITN POST body against PayFast's signature scheme.
 *  Pass the raw form fields (as received, in the order PayFast sent them) minus `signature`. */
export function verifyItnSignature(fields: Record<string, string>, passphrase: string) {
  const { signature, ...rest } = fields;
  const expected = buildSignature(rest, passphrase);
  return signature === expected;
}

export function paymentUrl(mode: "sandbox" | "live") {
  return mode === "live"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process";
}
