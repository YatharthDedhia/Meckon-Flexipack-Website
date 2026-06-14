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
      className={`sticky top-0 z-50 bg-[var(--background)]/85 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--border)]' : 'border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 relative transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Brand lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Meckon Flexipack Logo"
            className={`object-contain transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
          />
          <span className="leading-none">
            <span className="font-display block text-xl md:text-2xl text-[var(--accent)]">Meckon</span>
            <span className="text-mono block text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.35em] text-[var(--foreground)]">
              Flexipack
            </span>
          </span>
        </Link>

        {/* Animated hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative flex h-11 w-11 items-center justify-center text-[var(--accent)] transition-colors hover:bg-[var(--muted)] focus:outline-none z-30"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`text-mono group relative flex items-center py-1 text-[11px] uppercase tracking-[0.15em] transition-colors duration-150 ${
                    active ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[var(--accent)] transition-transform duration-150 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="text-mono inline-flex items-center bg-[var(--accent)] px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white transition-all duration-150 hover:brightness-90 active:translate-y-px"
            >
              Enquire Now
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div
          className={`w-full bg-[var(--background)] md:hidden z-10 border-t border-[var(--border)] ${open && !animatingOut
            ? 'animate-slideDownFadeIn'
            : animatingOut
              ? 'animate-slideUpFadeOut'
              : ''
            }`}
          style={{ overflow: 'hidden' }}
        >
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`text-mono flex items-center justify-between border-b border-[var(--border)] px-5 py-4 text-xs uppercase tracking-[0.15em] transition-colors duration-150 ${
                      active
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }`}
                    onClick={() => toggleMenu()}
                  >
                    {item.label}
                    <span className={active ? 'text-white' : 'text-[var(--accent)]'}>→</span>
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
