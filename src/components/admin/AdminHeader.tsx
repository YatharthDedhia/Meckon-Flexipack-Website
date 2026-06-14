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
 <header className="sticky top-0 z-30 border-b-2 border-[var(--foreground)] bg-white">
 <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
 <Link href="/admin" className="text-mono inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)]">
 <FaArrowLeft size={12} /> Dashboard
 </Link>
 <div className="flex items-center gap-4">
 {status && <span className="text-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">{status}</span>}
 {dirty && <span className="text-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">Unsaved</span>}
 <button onClick={onSave} disabled={saving || !dirty} className="btn-solid disabled:opacity-50">
 <FaSave size={13} /> {saving ? 'Saving…' : 'Save changes'}
 </button>
 </div>
 </div>
 </header>
 );
}
