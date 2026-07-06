import crypto from "crypto";

/**
 * PayFast integration:
 * - buildSignature: MD5 over all non-empty fields in INSERTION ORDER (no sort).
 *   PayFast verifies incoming payments by iterating $_POST in received order.
 *   NOTE: PayFast's PHP ksort() is only used in their *ITN webhook handler*,
 *   not when verifying the outbound payment signature we generate here.
 * - verifyItnSignature: for the incoming ITN callback we sort alphabetically
 *   to match PayFast's ksort() before they send us the signature.
 */

function pfEncode(value: string) {
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

export function buildSignature(params: Record<string, string>, passphrase: string) {
  // Exclude merchant_key from signature — sorted alphabetically.
  // The merchant_key is sent in the form but some PayFast implementations
  // exclude it from the MD5 calculation.
  const nonEmpty = Object.entries(params)
    .filter(([k, v]) => k !== "merchant_key" && v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  let base = nonEmpty.map(([k, v]) => `${k}=${pfEncode(String(v))}`).join("&");
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
