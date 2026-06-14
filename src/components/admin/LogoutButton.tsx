'use client';

import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutButton() {
 const router = useRouter();
 const logout = async () => {
 await fetch('/api/admin/logout', { method: 'POST' });
 router.push('/admin/login');
 router.refresh();
 };
 return (
 <button
 onClick={logout}
 className="inline-flex items-center gap-2 border border-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
 >
 <FaSignOutAlt size={13} /> Sign out
 </button>
 );
}
