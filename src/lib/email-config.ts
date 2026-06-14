import { Redis } from '@upstash/redis';

// Stored under its OWN Redis key, completely separate from the public site
// content. The Resend API key is a secret and must never be bundled into the
// content document that public pages fetch.
const EMAIL_KEY = 'email-config';

export type EmailConfig = {
  resendApiKey: string;
  contactEmail: string;
};

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Read the email config from Redis, falling back to env vars (so it keeps
// working before anything is saved in the admin).
export async function getEmailConfig(): Promise<EmailConfig> {
  const redis = getRedis();
  let stored: Partial<EmailConfig> = {};
  if (redis) {
    try {
      stored = (await redis.get<EmailConfig>(EMAIL_KEY)) || {};
    } catch {
      /* not reachable → env fallback */
    }
  }
  return {
    resendApiKey: stored.resendApiKey || process.env.RESEND_API_KEY || '',
    contactEmail: stored.contactEmail || process.env.CONTACT_EMAIL || '',
  };
}

export async function saveEmailConfig(cfg: EmailConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('Email config store (Redis) is not configured');
  await redis.set(EMAIL_KEY, cfg);
}
