'use client';

import Link from 'next/link';

type FooterProps = {
  quickLinks: { label: string; href: string }[];
  categories: { name: string; id?: string; link?: string }[];
  company: { phone?: string; email?: string; gstin?: string };
};

const colTitle = 'text-mono mb-5 text-[11px] uppercase tracking-[0.2em] text-white/40';
const linkCls = 'text-sm text-white/60 transition-colors hover:text-white';

export default function Footer({ quickLinks, categories, company }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t-2 border-[var(--accent)] bg-[var(--foreground)] pt-16 pb-8 text-white">
      {/* Oversized faded wordmark */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 -left-2 select-none text-[8rem] leading-none text-white opacity-[0.04] md:text-[14rem]"
      >
        MECKON
      </span>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Meckon Flexipack" className="w-11 h-11 object-contain" />
            <span className="leading-none">
              <span className="font-display block text-xl text-white">Meckon</span>
              <span className="text-mono block text-[0.6rem] uppercase tracking-[0.35em] text-white/50">Flexipack</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            High-quality plastic &amp; paper packaging solutions, crafted with sustainability in mind.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={colTitle}>Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={linkCls}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Products */}
        <div>
          <h3 className={colTitle}>Our Products</h3>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.id ?? c.name}>
                <Link href={c.link ?? `/products#${c.id ?? ''}`} className={linkCls}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className={colTitle}>Contact</h3>
          <ul className="space-y-3">
            {company.phone && (
              <li>
                <a href={`tel:${company.phone}`} className={linkCls}>{company.phone}</a>
              </li>
            )}
            {company.email && (
              <li>
                <a href={`mailto:${company.email}`} className={`${linkCls} break-all`}>{company.email}</a>
              </li>
            )}
            {company.gstin && (
              <li className="text-mono text-xs uppercase tracking-wider text-white/40">GSTIN {company.gstin}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mt-14 pt-6 border-t border-white/10">
        <p className="text-mono text-[11px] uppercase tracking-wider text-white/30">
          © {new Date().getFullYear()} Meckon Flexipack — All rights reserved
        </p>
      </div>
    </footer>
  );
}
