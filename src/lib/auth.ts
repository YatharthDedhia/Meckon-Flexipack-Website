import bcrypt from 'bcryptjs';

// Node-runtime only (bcrypt). Used by the login route.
export function verifyCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!u || !hash) return false;
  return username === u && bcrypt.compareSync(password, hash);
}
