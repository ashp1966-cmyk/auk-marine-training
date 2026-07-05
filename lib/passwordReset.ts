import crypto from "crypto";
import { prisma } from "@/lib/db";

const TOKEN_HOURS = 1; // reset links expire quickly — if you didn't request it, it stops mattering fast

function hashToken(raw: string) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/** Creates a one-time reset token and returns the RAW value (only this call ever
 *  sees it) — only its hash is stored, so a database leak alone can't be used
 *  to reset anyone's password. */
export async function createResetToken(userType: "admin" | "learner", userId: string) {
  const raw = crypto.randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      tokenHash: hashToken(raw),
      userType,
      userId,
      expiresAt: new Date(Date.now() + TOKEN_HOURS * 60 * 60 * 1000),
    },
  });
  return raw;
}

/** Verifies a raw token from a reset link: must exist, be unused, and unexpired.
 *  Marks it used immediately so it can never be replayed, even if the reset
 *  that follows fails partway through. */
export async function consumeResetToken(raw: string, expectedType: "admin" | "learner") {
  const tokenHash = hashToken(raw);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.userType !== expectedType) return null;
  if (record.usedAt) return null;
  if (record.expiresAt < new Date()) return null;

  await prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
  return record.userId;
}
