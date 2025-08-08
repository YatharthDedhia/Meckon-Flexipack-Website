'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  const toggleMenu = () => {
    if (open) {
      setAnimatingOut(true);
      setTimeout(() => {
        setOpen(false);
        setAnimatingOut(false);
        setShowMenu(false);
      }, 200);
    } else {
      setOpen(true);
      setShowMenu(true);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact Us', path: '/contact' },
  ];


  return (
    <nav className="bg-white shadow z-50 text-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-8 relative">
        <Link href="/" className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Meckon Flexipack Logo"
            className="w-15 h-15 object-contain"
            loading="lazy"
          />
          <span className="text-[var(--brand-red)] leading-relaxed tracking-wider">
            <span className="block text-2xl font-semibold">Meckon</span>
            <span className="block text-2xl font-semibold">Flexipack</span>
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--brand-red)] focus:outline-none z-30 text-3xl select-none"
          aria-label="Toggle Menu"
          style={{ position: 'relative', lineHeight: 1 }}
        >
          {open ? '✕' : '☰'}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 font-medium tracking-wide h-16 items-center">
          {navItems.map((item) => (
            <li key={item.label} className="h-full">
              <Link
                href={item.path}
                className="flex items-center h-full px-2 rounded transition-colors duration-100
                   hover:bg-[var(--brand-red)] hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div
          className={`w-full bg-white shadow-md md:hidden z-10 border-t border-gray-200 ${open && !animatingOut
            ? 'animate-slideDownFadeIn'
            : animatingOut
              ? 'animate-slideUpFadeOut'
              : ''
            }`}
          style={{ overflow: 'hidden' }}
        >
          <ul className="flex flex-col items-center justify-center tracking-wide text-lg border-l border-r border-gray-200">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="h-full w-full border-b border-gray-200 last:border-b-0"
              >
                <Link
                  href={item.path}
                  className="flex justify-center items-center w-full h-full p-3 rounded transition-colors duration-100
                   hover:bg-[var(--brand-red)] hover:text-white"
                  onClick={() => toggleMenu()}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
