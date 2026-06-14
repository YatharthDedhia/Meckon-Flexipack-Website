'use client';

import Link from 'next/link';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function AdminHeader({
  dirty,
  saving,
  status,
  onSave,
}: {
  dirty: boolean;
  saving: boolean;
  status: string;
  onSave: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--brand-red)]">
          <FaArrowLeft size={12} /> Dashboard
        </Link>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-gray-500">{status}</span>}
          {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
          <button onClick={onSave} disabled={saving || !dirty} className="btn-primary disabled:opacity-50">
            <FaSave size={13} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </header>
  );
}
