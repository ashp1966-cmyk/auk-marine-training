import { promises as dns } from "dns";

/**
 * Is this request coming from PayFast?
 *
 * PayFast's documented method is to resolve their published hostnames and
 * compare the caller's IP to the result, because their addresses change. The
 * old code compared against a short hard-coded list that is out of date, so a
 * genuine payment confirmation could be refused with 403 and the booking never
 * flipped to Paid. This does both: the live DNS answer (cached 10 min) and a
 * static list of PayFast's published ranges as a fallback.
 *
 * This check is defence in depth. The strong checks, which stay unchanged, are
 * the signature, PayFast's server-to-server validate call, and the amount.
 */
const PAYFAST_HOSTS = ["www.payfast.co.za", "sandbox.payfast.co.za", "w1w.payfast.co.za", "w2w.payfast.co.za"];

// Published PayFast source ranges (CIDR) plus the older single addresses.
const STATIC_RANGES = [
  "197.97.145.144/28", "41.74.179.192/27", "102.216.36.0/28", "102.216.36.128/28",
  "144.126.193.139/32", "196.33.227.224/28",
];

export function ipToInt(ip: string): number | null {
  const m = ip.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const p = m.slice(1).map(Number);
  if (p.some((n) => n > 255)) return null;
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}

export function inCidr(ip: string, cidr: string): boolean {
  const [base, bitsStr] = cidr.split("/");
  const bits = bitsStr === undefined ? 32 : Number(bitsStr);
  const a = ipToInt(ip), b = ipToInt(base);
  if (a === null || b === null || !(bits >= 0 && bits <= 32)) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return ((a & mask) >>> 0) === ((b & mask) >>> 0);
}

export function inStaticRanges(ip: string): boolean {
  return STATIC_RANGES.some((c) => inCidr(ip, c));
}

let cache: { at: number; ips: Set<string> } | null = null;

async function resolvedIps(): Promise<Set<string>> {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.ips;
  const ips = new Set<string>();
  await Promise.all(PAYFAST_HOSTS.map(async (h) => {
    try { (await dns.resolve4(h)).forEach((a) => ips.add(a)); } catch { /* ignore a host that fails */ }
  }));
  cache = { at: Date.now(), ips };
  return ips;
}

export async function isPayfastIp(ip: string): Promise<boolean> {
  if (!ip) return false;
  if (inStaticRanges(ip)) return true;
  return (await resolvedIps()).has(ip);
}
