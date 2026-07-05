import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "auk_admin_session";
const SESSION_HOURS = 4; // admin sessions expire automatically — re-login required after this

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    // Fails loudly rather than silently running with a weak/default secret.
    throw new Error(
      "SESSION_SECRET is missing or too short. Set a random 32+ character string as an environment variable in Vercel."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createAdminSession(adminId: string, email: string) {
  const token = await new SignJWT({ adminId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}

/** The ONLY function that should ever be trusted to decide "is this request an admin?".
 *  Every admin API route calls this itself — never trust a client-supplied flag. */
export async function getAdminSession(): Promise<{ adminId: string; email: string } | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { adminId: payload.adminId as string, email: payload.email as string };
  } catch {
    return null; // expired, tampered, or wrong secret — always fail closed
  }
}

export async function requireAdmin() {
  // Returns the session, or null. Callers must check and return their own
  // 401 response — Next.js route handlers don't auto-catch thrown Responses.
  return getAdminSession();
}
