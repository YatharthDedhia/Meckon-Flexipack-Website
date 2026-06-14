import { SignJWT, jwtVerify } from 'jose';

// Edge-safe session helpers (no bcrypt here, so middleware can use them).
export const SESSION_COOKIE = 'meckon_admin';

const getSecret = () =>
  new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-insecure-change-me');

export async function createSessionToken(username: string) {
  return new SignJWT({ u: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { u: string };
  } catch {
    return null;
  }
}
