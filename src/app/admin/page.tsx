import Link from 'next/link';
import { cookies } from 'next/headers';
import { FaBox, FaThLarge, FaFileAlt, FaEnvelope, FaHistory } from 'react-icons/fa';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import LogoutButton from '@/components/admin/LogoutButton';

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

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="font-heading text-lg font-extrabold text-[var(--brand-red)]">Meckon Flexipack</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline">
              Signed in as <strong className="text-gray-700">{session?.u}</strong>
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">Manage your website</h1>
        <p className="mt-1 text-gray-500">Choose what you&apos;d like to edit.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {cards.map(({ href, title, desc, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)]">
                <Icon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--brand-ink)] group-hover:text-[var(--brand-red)]">{title}</h2>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
