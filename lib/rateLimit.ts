import { prisma } from "@/lib/db";

/** Checks and increments a rate-limit counter stored in the database, so it
 *  actually holds up across Vercel's serverless instances (an in-memory Map
 *  resets every time a new instance spins up, which happens often).
 *  Returns { allowed, remaining }. */
export async function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = new Date();

  const existing = await prisma.rateLimit.findUnique({ where: { key } });

  if (!existing || existing.resetAt < now) {
    await prisma.rateLimit.upsert({
      where: { key },
      update: { count: 1, resetAt: new Date(now.getTime() + windowMs) },
      create: { key, count: 1, resetAt: new Date(now.getTime() + windowMs) },
    });
    return { allowed: true, remaining: max - 1 };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.rateLimit.update({ where: { key }, data: { count: existing.count + 1 } });
  return { allowed: true, remaining: max - existing.count - 1 };
}

/** Call after a successful login so a correct password immediately clears
 *  the failed-attempt count, rather than making someone wait out the window
 *  after they've already proven who they are. */
export async function clearRateLimit(key: string) {
  await prisma.rateLimit.deleteMany({ where: { key } }).catch(() => {});
}
