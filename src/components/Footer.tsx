// Footer.tsx
'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { quickLinks, productsData, contacts } from '../data';

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-ink)] text-gray-300 pt-14 pb-8 border-t-4 border-[var(--brand-red)]">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Meckon Flexipack" className="w-12 h-12 object-contain" />
            <span className="text-white font-bold leading-tight">
              <span className="block">Meckon</span>
              <span className="block">Flexipack</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            High-quality plastic &amp; paper packaging solutions, crafted with sustainability in mind.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Products */}
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Our Products</h3>
          <ul className="space-y-2 text-sm">
            {productsData.categories.map(({ name, link }) => (
              <li key={link}>
                <Link href={link} className="text-gray-400 hover:text-white transition-colors">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${contacts.company.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <FaPhone className="text-[var(--brand-red)] flex-shrink-0" />
                {contacts.company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.company.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors break-all">
                <FaEnvelope className="text-[var(--brand-red)] flex-shrink-0" />
                {contacts.company.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <FaMapMarkerAlt className="text-[var(--brand-red)] flex-shrink-0" />
              {contacts.company.gstin}
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Meckon Flexipack. All rights reserved.
      </div>
    </footer>
  );
}
