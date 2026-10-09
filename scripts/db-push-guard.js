#!/usr/bin/env node
/**
 * Safety guard for `npm run db:push`.
 *
 * The live database (Neon project "neon-teal-pillow") is SHARED with the Ship
 * Inspection Platform. This app's Prisma schema only knows the LMS tables, so
 * `prisma db push` against it offers to DROP the inspection tables (inspections,
 * vessels, users, organizations, template_*, password_reset_tokens...).
 *
 * This guard refuses to push to that database. Make LMS schema changes there
 * with the Neon SQL Editor instead. To push to any OTHER database (a local or
 * test one) it simply runs `prisma db push`.
 *
 * Note: it protects `npm run db:push` only; running `npx prisma db push`
 * directly bypasses it.
 */
const { spawnSync } = require("child_process");

const SHARED_HOST_MARKERS = ["ep-sparkling-wildflower-asr0stm8"];
// Prisma uses a shell DATABASE_URL first, then the one in .env. Do the same.
let url = process.env.DATABASE_URL || "";
if (!url) {
  try {
    const env = require("fs").readFileSync(".env", "utf8");
    const m = env.match(/^\s*DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/m);
    if (m) url = m[1].trim();
  } catch { /* no .env */ }
}
let host = "";
try { host = new URL(url).host; } catch { /* leave blank */ }

if (SHARED_HOST_MARKERS.some((m) => host.includes(m))) {
  console.error("\n  REFUSED: this DATABASE_URL points at the SHARED live database (neon-teal-pillow).");
  console.error("  It also holds the Ship Inspection Platform's tables, and `prisma db push`");
  console.error("  would offer to DROP them.\n");
  console.error("  Apply LMS schema changes with the Neon SQL Editor instead.\n");
  process.exit(1);
}

const r = spawnSync("npx", ["prisma", "db", "push", ...process.argv.slice(2)], { stdio: "inherit", shell: true });
process.exit(r.status === null ? 1 : r.status);
