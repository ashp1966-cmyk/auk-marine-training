import crypto from "crypto";

export const GROUP_MIN_SEATS = 2;
export const GROUP_MAX_SEATS = 50;

/** PayFast m_payment_id for a team order — the GRP- prefix routes the ITN. */
export function newGroupRef() {
  return "GRP-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

export function isGroupRef(ref: string) {
  return ref.startsWith("GRP-");
}

/** Total in cents. No volume discount (owner decision) — plain seats × price. */
export function groupAmountCents(seats: number, coursePriceCents: number) {
  return seats * coursePriceCents;
}

export function validSeatCount(n: unknown): n is number {
  return Number.isInteger(n) && (n as number) >= GROUP_MIN_SEATS && (n as number) <= GROUP_MAX_SEATS;
}

/** "@Acme.co.za", "acme.co.za ", "jo@acme.co.za" → "acme.co.za". Returns null if blank/invalid. */
export function normaliseDomain(raw: unknown): string | null {
  let d = String(raw ?? "").trim().toLowerCase();
  if (d.includes("@")) d = d.slice(d.lastIndexOf("@") + 1);
  if (!d) return null;
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(d) ? d : null;
}

/** True when no lock is set, or the email is exactly on the locked domain. */
export function emailAllowed(email: string, domainLock: string | null | undefined) {
  if (!domainLock) return true;
  return email.trim().toLowerCase().endsWith("@" + domainLock);
}

export function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
