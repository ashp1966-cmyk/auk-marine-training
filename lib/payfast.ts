import crypto from "crypto";

/**
 * PayFast integration notes:
 * - `buildSignature` creates the MD5 signature PayFast requires on the way OUT
 *   (when we send the customer to PayFast to pay).
 * - `verifyItnSignature` checks the signature PayFast sends back on the way IN
 *   (the "Instant Transaction Notification" webhook).
 *
 * IMPORTANT: PayFast's PHP library applies ksort() to fields before signing —
 * meaning they sort ALL keys alphabetically. We must do the same, otherwise
 * the signature we compute and the one PayFast verifies will never match.
 * Docs: https://developers.payfast.co.za/docs#step_2_signature
 */

function pfEncode(value: string) {
  // Matches PHP's urlencode: spaces as +, special chars as %XX uppercase
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

export function buildSignature(params: Record<string, string>, passphrase: string) {
  // Filter empty values, then sort alphabetically — PayFast's PHP lib uses ksort()
  const sorted = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b));

  let base = sorted.map(([k, v]) => `${k}=${pfEncode(String(v))}`).join("&");
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

/** PayFast's own docs recommend a second layer beyond signature checking: post
 *  the raw ITN body back to PayFast itself and confirm it echoes "VALID". This
 *  catches a forged request that somehow reproduced a correct signature (e.g.
 *  a leaked passphrase) but didn't actually originate from a real PayFast
 *  transaction. Failing this check is treated as suspicious, not silently ignored. */
export async function validateWithPayfast(rawBody: string, mode: "sandbox" | "live") {
  const url = mode === "live"
    ? "https://www.payfast.co.za/eng/query/validate"
    : "https://sandbox.payfast.co.za/eng/query/validate";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });
    const text = (await res.text()).trim();
    return text === "VALID";
  } catch {
    return false;
  }
}
