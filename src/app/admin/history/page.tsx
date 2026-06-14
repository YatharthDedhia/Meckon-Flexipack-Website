'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaHistory, FaUndo } from 'react-icons/fa';

type Version = {
  id: string;
  savedAt: number;
  summary: { categories: number; products: number };
};

const fmt = (ms: number) =>
  new Date(ms).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export default function HistoryPage() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const load = () =>
    fetch('/api/admin/history')
      .then((r) => r.json())
      .then((d) => setVersions(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const restore = async (v: Version) => {
    if (!confirm(`Restore the website to the version from ${fmt(v.savedAt)}?\n\nYour current version is kept in history, so you can undo this.`)) return;
    setRestoringId(v.id);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: v.id }),
      });
      const d = await res.json();
      if (res.ok) {
        await load();
        setStatus({ ok: true, msg: 'Restored. The website now shows this version.' });
      } else {
        setStatus({ ok: false, msg: d.error || 'Could not restore.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Could not restore.' });
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <Link href="/admin" className="text-gray-400 hover:text-[var(--brand-red)]">
            <FaArrowLeft />
          </Link>
          <h1 className="font-heading text-lg font-bold text-[var(--brand-ink)]">Version history</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)]">
            <FaHistory size={16} />
          </div>
          <p className="text-sm text-gray-500">
            Every time you save changes, a snapshot is kept here (last {30}). If something goes wrong, restore an
            earlier version with one click. The latest {30} are kept.
          </p>
        </div>

        {status && (
          <p className={`mb-4 text-sm font-semibold ${status.ok ? 'text-emerald-600' : 'text-[var(--brand-red)]'}`}>
            {status.msg}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : versions.length === 0 ? (
          <p className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
            No saved versions yet. The first snapshot will appear here the next time you save changes.
          </p>
        ) : (
          <ul className="space-y-3">
            {versions.map((v, i) => (
              <li
                key={v.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
              >
                <div>
                  <p className="flex items-center gap-2 font-semibold text-[var(--brand-ink)]">
                    {fmt(v.savedAt)}
                    {i === 0 && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {v.summary.categories} categories · {v.summary.products} products
                  </p>
                </div>
                {i === 0 ? (
                  <span className="text-xs font-semibold text-gray-300">live</span>
                ) : (
                  <button
                    onClick={() => restore(v)}
                    disabled={restoringId !== null}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] disabled:opacity-50"
                  >
                    <FaUndo size={11} />
                    {restoringId === v.id ? 'Restoring…' : 'Restore'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
