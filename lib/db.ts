import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

/**
 * lib/db.ts
 *
 * Prisma client using Neon's serverless driver.
 *
 * WHY THE ADAPTER RATHER THAN A DIRECT CONNECTION
 * The standard Prisma client opens a TCP connection to Postgres on port 5432.
 * Plenty of networks block that outbound while allowing ordinary web traffic —
 * ship satellite links, hotel and airport wifi, corporate and guest networks.
 * The symptom is a connection timeout on every Neon IP while DNS resolves fine.
 *
 * Neon's serverless driver tunnels the same protocol over HTTPS/WSS on 443,
 * which almost nothing blocks. Same database, same queries, same connection
 * string — only the transport changes.
 *
 * Requires `previewFeatures = ["driverAdapters"]` in schema.prisma, and
 * @neondatabase/serverless, @prisma/adapter-neon and ws as dependencies.
 *
 * NOTE: this changes the app and scripts that import from here. Prisma Studio
 * and `prisma migrate` still use a direct 5432 connection and will keep failing
 * on a restricted network.
 */

// Node has no native WebSocket in the versions this project targets, so the
// driver needs one supplied.
neonConfig.webSocketConstructor = ws;

// Prevents creating a new database connection on every hot-reload in dev,
// and keeps a single pooled client in serverless production.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.AUK_DB_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — check .env is present and loaded");
  }
  // TEMPORARY DIAGNOSTIC - remove after debugging (never logs the password)
  try { const u = new URL(connectionString); console.log("DBCHECK using=" + (process.env.AUK_DB_URL ? "AUK_DB_URL" : "DATABASE_URL") + " host=" + u.host + " user=" + u.username + " pwlen=" + u.password.length + " search=" + u.search + " rawlen=" + connectionString.length + " first=" + JSON.stringify(connectionString.slice(0,12)) + " last=" + JSON.stringify(connectionString.slice(-5))); } catch (e) { console.log("DBCHECK invalid url"); }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
