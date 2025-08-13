// Footer.tsx
'use client';

import Link from 'next/link';
import { quickLinks, productsData, contacts } from '../data';

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-red)] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Products */}
        <div>
          <h3 className="font-bold text-lg mb-2">Our Products</h3>
          <ul className="space-y-1 text-sm">
            {productsData.categories.map(({ name, link }) => (
              <li key={link}>
                <Link href={link} className="hover:underline">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm">
            <a href={`tel:${contacts.company.phone}`} className="hover:underline">
              {contacts.company.phone}
            </a>
          </p>
          <p className="text-sm">
            <a href={`mailto:${contacts.company.email}`} className="hover:underline">
              {contacts.company.email}
            </a>
          </p>
          {/* <p className="text-sm mt-2">{contacts.company.address}</p> */}
          <p className="text-sm">{contacts.company.gstin}</p>
        </div>

      </div>
      <div className="text-center mt-6 text-xs">
        © {new Date().getFullYear()} Meckon Flexipack. All rights reserved.
      </div>
    </footer>
  );
}
