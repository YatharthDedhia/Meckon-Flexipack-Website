import { NextRequest, NextResponse } from 'next/server';
import { getEmailConfig, saveEmailConfig } from '@/lib/email-config';

export const runtime = 'nodejs';

const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

const mask = (key: string) =>
  key ? `${key.slice(0, 3)}••••••${key.slice(-4)}` : '';

// Never returns the full secret — only whether one is set + a masked hint.
export async function GET() {
  const cfg = await getEmailConfig();
  return NextResponse.json({
    contactEmail: cfg.contactEmail,
    hasKey: Boolean(cfg.resendApiKey),
    keyMasked: mask(cfg.resendApiKey),
  });
}

export async function PUT(req: NextRequest) {
  let body: { contactEmail?: string; resendApiKey?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const contactEmail = String(body.contactEmail || '').trim();
  if (!isEmail(contactEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Only overwrite the key if a new one was actually typed in; otherwise keep
  // the existing one (the UI never shows the real key back).
  const current = await getEmailConfig();
  const typedKey = String(body.resendApiKey || '').trim();
  const resendApiKey = typedKey || current.resendApiKey;

  if (!resendApiKey) {
    return NextResponse.json({ error: 'A Resend API key is required.' }, { status: 400 });
  }

  await saveEmailConfig({ resendApiKey, contactEmail });
  return NextResponse.json({ ok: true });
}
