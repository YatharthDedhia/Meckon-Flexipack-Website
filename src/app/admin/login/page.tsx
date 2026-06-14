'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
 const router = useRouter();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [busy, setBusy] = useState(false);

 const submit = async (e: React.FormEvent) => {
 e.preventDefault();
 setBusy(true);
 setError('');
 try {
 const res = await fetch('/api/admin/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ username, password }),
 });
 if (res.ok) {
 router.push('/admin');
 router.refresh();
 } else {
 const data = await res.json().catch(() => ({}));
 setError(data.error || 'Login failed');
 }
 } catch {
 setError('Something went wrong. Try again.');
 } finally {
 setBusy(false);
 }
 };

 return (
 <div className="swiss-grid-pattern min-h-dvh flex items-center justify-center bg-[var(--surface)] px-4">
 <form onSubmit={submit} className="swiss-card w-full max-w-sm bg-white p-8">
 <div className="mb-8 flex items-center gap-3 border-b-2 border-[var(--foreground)] pb-6">
 <Image src="/logo.png" alt="Meckon Flexipack" width={44} height={46} className="object-contain" />
 <div className="leading-tight">
 <p className="font-display text-lg text-[var(--foreground)]">Meckon Flexipack</p>
 <p className="kicker mt-0.5">Admin</p>
 </div>
 </div>

 <label className="mb-4 block">
 <span className="swiss-label">Username</span>
 <input
 type="text"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 autoComplete="username"
 className="swiss-input"
 required
 />
 </label>

 <label className="mb-6 block">
 <span className="swiss-label">Password</span>
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 autoComplete="current-password"
 className="swiss-input"
 required
 />
 </label>

 {error && (
 <p className="text-mono mb-4 border-2 border-[var(--accent)] px-3 py-2 text-[11px] uppercase tracking-wider text-[var(--accent)]">{error}</p>
 )}

 <button type="submit" disabled={busy} className="btn-solid w-full disabled:opacity-60">
 {busy ? 'Signing in…' : 'Sign in'}
 </button>
 </form>
 </div>
 );
}
