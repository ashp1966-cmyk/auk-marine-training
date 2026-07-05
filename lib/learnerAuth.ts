import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "auk_learner_session";
const SESSION_DAYS = 30; // learners stay signed in much longer than admin — lower stakes, better convenience

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or too short.");
  }
  return new TextEncoder().encode(secret);
}

export async function createLearnerSession(learnerId: string, email: string) {
  const token = await new SignJWT({ learnerId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearLearnerSession() {
  cookies().set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}

export async function getLearnerSession(): Promise<{ learnerId: string; email: string } | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { learnerId: payload.learnerId as string, email: payload.email as string };
  } catch {
    return null;
  }
}
