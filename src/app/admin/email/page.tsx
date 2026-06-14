'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const field =
  'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--brand-red)] focus:ring-2 focus:ring-[var(--brand-red)]/20';

export default function EmailSettingsPage() {
  const [email, setEmail] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [keyMasked, setKeyMasked] = useState('');
  const [newKey, setNewKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const load = () =>
    fetch('/api/admin/email-config')
      .then((r) => r.json())
      .then((d) => {
        setEmail(d.contactEmail || '');
        setHasKey(Boolean(d.hasKey));
        setKeyMasked(d.keyMasked || '');
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/email-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactEmail: email, resendApiKey: newKey }),
      });
      const d = await res.json();
      if (res.ok) {
        setNewKey('');
        await load();
        setStatus({ ok: true, msg: 'Settings saved.' });
      } else {
        setStatus({ ok: false, msg: d.error || 'Could not save.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Could not save.' });
    } finally {
      setSaving(false);
    }
  };

  const sendTest = async () => {
    setTesting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test message',
          phone: '—',
          email: '',
          company: 'Admin panel',
          message: 'This is a test email sent from the Meckon admin Email Settings page. If you can read this, enquiries are working.',
        }),
      });
      const d = await res.json();
      if (res.ok && d.success) {
        setStatus({ ok: true, msg: `Test email sent to ${email}. Check the inbox (and spam folder).` });
      } else {
        setStatus({ ok: false, msg: d.error || 'Test email failed.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Test email failed.' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <Link href="/admin" className="text-gray-400 hover:text-[var(--brand-red)]">
            <FaArrowLeft />
          </Link>
          <h1 className="font-heading text-lg font-bold text-[var(--brand-ink)]">Email settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)]">
              <FaEnvelope size={16} />
            </div>
            <p className="text-sm text-gray-500">
              When a visitor submits the contact form, the enquiry is emailed to the address below. We use Resend to deliver it.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Send enquiries to *</label>
                <input
                  className={field}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="meckonflexipack@gmail.com"
                />
                <p className="mt-1 text-xs text-gray-400">The inbox that receives every contact-form enquiry.</p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Resend API key {hasKey ? <span className="font-normal text-emerald-600">(set: {keyMasked})</span> : <span className="font-normal text-[var(--brand-red)]">(not set)</span>}
                </label>
                <input
                  className={field}
                  type="password"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder={hasKey ? 'Leave blank to keep the current key' : 're_…'}
                  autoComplete="off"
                />
                <p className="mt-1 text-xs text-gray-400">
                  From your Resend dashboard (resend.com → API Keys). Leave blank to keep the existing key.
                </p>
              </div>

              {status && (
                <p className={`text-sm font-semibold ${status.ok ? 'text-emerald-600' : 'text-[var(--brand-red)]'}`}>
                  {status.msg}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">
                <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save settings'}
                </button>
                <button
                  onClick={sendTest}
                  disabled={testing || !hasKey || !email}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] disabled:opacity-50"
                  title={!hasKey ? 'Save an API key first' : 'Send a test email'}
                >
                  <FaPaperPlane size={12} />
                  {testing ? 'Sending…' : 'Send test email'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
