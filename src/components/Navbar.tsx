'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Publish the navbar's (unscrolled) height as --nav-h so the hero can size
  // itself dynamically on any device. Only capture while at the top, since the
  // bar shrinks on scroll.
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const el = navRef.current;
      if (el && window.scrollY <= 8) {
        root.style.setProperty('--nav-h', `${el.offsetHeight}px`);
      }
    };
    update();
    const raf = window.requestAnimationFrame(update);
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
    };
  }, []);

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

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 relative transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Brand lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Meckon Flexipack Logo"
            className={`object-contain transition-all duration-300 ${scrolled ? 'w-11 h-11' : 'w-14 h-14'}`}
          />
          <span className="leading-none">
            <span className="font-heading block text-xl md:text-2xl font-extrabold tracking-tight text-[var(--brand-red)]">
              Meckon
            </span>
            <span className="block text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-ink)]">
              Flexipack
            </span>
          </span>
        </Link>

        {/* Animated hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--brand-red)] transition-colors hover:bg-[var(--surface-tint)] focus:outline-none z-30"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-1 text-base font-medium items-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`relative flex items-center px-4 py-2 rounded-full transition-colors duration-200 ${
                    active
                      ? 'text-[var(--brand-red)]'
                      : 'text-gray-600 hover:text-[var(--brand-red)] hover:bg-[var(--surface-tint)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-[var(--brand-red)] transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center rounded-full bg-[var(--brand-red)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Enquire Now
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div
          className={`w-full bg-white md:hidden z-10 border-t border-gray-100 shadow-lg ${open && !animatingOut
            ? 'animate-slideDownFadeIn'
            : animatingOut
              ? 'animate-slideUpFadeOut'
              : ''
            }`}
          style={{ overflow: 'hidden' }}
        >
          <ul className="flex flex-col px-3 py-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 my-0.5 text-lg font-medium transition-colors duration-150 ${
                      active
                        ? 'bg-[var(--brand-red)] text-white'
                        : 'text-gray-700 hover:bg-[var(--surface-tint)] hover:text-[var(--brand-red)]'
                    }`}
                    onClick={() => toggleMenu()}
                  >
                    {item.label}
                    <span className={`text-sm ${active ? 'text-white' : 'text-[var(--brand-red)]'}`}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
