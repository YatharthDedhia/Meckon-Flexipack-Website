import Link from 'next/link';
import { cookies } from 'next/headers';
import { FaBox, FaThLarge, FaFileAlt, FaEnvelope, FaHistory } from 'react-icons/fa';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import { getContentFresh, bg } from '@/lib/content';
import LogoutButton from '@/components/admin/LogoutButton';

export const dynamic = 'force-dynamic';

const cards = [
 { href: '/admin/products', title: 'Products', desc: 'Add, edit, reorder products and images', icon: FaBox },
 { href: '/admin/categories', title: 'Categories', desc: 'Manage product categories', icon: FaThLarge },
 { href: '/admin/content', title: 'Site Content', desc: 'Hero, about, history, stats, clients, contact', icon: FaFileAlt },
 { href: '/admin/email', title: 'Email Settings', desc: 'Where contact-form enquiries are sent', icon: FaEnvelope },
 { href: '/admin/history', title: 'Version History', desc: 'View past versions and roll back changes', icon: FaHistory },
];

export default async function AdminDashboard() {
 const store = await cookies();
 const session = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
 const content = await getContentFresh();

 return (
 <div className="relative min-h-dvh overflow-hidden bg-[var(--surface)]">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img src={bg(content, 'admin')} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15] grayscale" />
 <header className="relative border-b-2 border-[var(--foreground)] bg-white/80 backdrop-blur-sm">
 <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
 <a href="/" className="group">
 <p className="font-display text-xl text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">Meckon Flexipack</p>
 <p className="kicker mt-1">Admin Dashboard</p>
 </a>
 <div className="flex items-center gap-4">
 <span className="text-mono hidden text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] sm:inline">
 Signed in — <strong className="text-[var(--foreground)]">{session?.u}</strong>
 </span>
 <LogoutButton />
 </div>
 </div>
 </header>

 <main className="relative mx-auto max-w-5xl px-6 py-14">
 <span className="kicker">Control Panel</span>
 <h1 className="mt-4 font-display text-4xl md:text-5xl text-[var(--foreground)]">Manage your website.</h1>
 <p className="mt-3 text-[var(--muted-foreground)]">Choose what you&apos;d like to edit.</p>

 <div className="mt-10 grid border-l-2 border-t-2 border-[var(--foreground)] sm:grid-cols-2">
 {cards.map(({ href, title, desc, icon: Icon }, idx) => (
 <Link
 key={href}
 href={href}
 className="group flex items-start gap-5 border-b-2 border-r-2 border-[var(--foreground)] bg-white p-8 transition-colors duration-150 hover:bg-[var(--accent)]"
 >
 <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-[var(--foreground)] text-[var(--foreground)] transition-colors group-hover:border-white group-hover:text-white">
 <Icon size={20} />
 </div>
 <div>
 <span className="text-mono text-xs font-bold text-[var(--accent)] transition-colors group-hover:text-white">{String(idx + 1).padStart(2, '0')}</span>
 <h2 className="mt-1 font-display text-xl text-[var(--foreground)] transition-colors group-hover:text-white">{title}</h2>
 <p className="mt-1 text-sm text-[var(--muted-foreground)] transition-colors group-hover:text-white/90">{desc}</p>
 </div>
 </Link>
 ))}
 </div>
 </main>
 </div>
 );
}
