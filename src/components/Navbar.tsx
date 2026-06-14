'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type NavCategory = { name: string; id: string; products: { name: string }[] };

export default function Navbar({ categories = [] }: { categories?: NavCategory[] }) {
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
  ];

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b-2 border-[var(--foreground)] transition-all duration-200"
    >
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 relative transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-7'
        }`}
      >
        {/* Brand lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Meckon Flexipack Logo"
            className={`object-contain transition-all duration-300 ${scrolled ? 'w-11 h-11' : 'w-16 h-16'}`}
          />
          <span className="leading-none">
            <span className={`font-display block text-[var(--accent)] transition-all duration-300 ${scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>Meckon</span>
            <span className="text-mono block text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-[var(--foreground)]">
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
        <ul className="hidden md:flex gap-9 items-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const isProducts = item.path === '/products';
            return (
              <li key={item.label} className={isProducts ? 'group/prod relative' : ''}>
                <Link
                  href={item.path}
                  className={`group relative flex items-center py-1 text-base font-bold uppercase tracking-[0.08em] transition-colors duration-150 ${
                    active ? 'text-[var(--accent)]' : 'text-[var(--foreground)] hover:text-[var(--accent)]'
                  }`}
                >
                  {item.label}
                  {isProducts && <span className="ml-1.5 text-xs">▾</span>}
                  <span
                    className={`absolute left-0 right-0 -bottom-1 h-[3px] bg-[var(--accent)] transition-transform duration-150 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>

                {/* Products mega-dropdown */}
                {isProducts && categories.length > 0 && (
                  <div className="invisible absolute right-0 top-full z-50 pt-5 opacity-0 transition-opacity duration-150 group-hover/prod:visible group-hover/prod:opacity-100">
                    <div className="w-[40rem] border-2 border-[var(--foreground)] bg-white">
                      <div className="flex items-center justify-between border-b-2 border-[var(--foreground)] px-6 py-3">
                        <span className="kicker">Our Products</span>
                        <Link href="/products" className="text-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)]">
                          View all →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2">
                        {categories.map((c, i) => (
                          <div
                            key={c.id}
                            className={`border-[var(--foreground)] p-5 ${i % 2 === 0 ? 'border-r-2' : ''} ${i < categories.length - (categories.length % 2 === 0 ? 2 : 1) ? 'border-b-2' : ''}`}
                          >
                            <Link href={`/products#${c.id}`} className="font-display text-base text-[var(--foreground)] hover:text-[var(--accent)]">
                              {c.name}
                            </Link>
                            <ul className="mt-2 space-y-1">
                              {c.products.slice(0, 4).map((p) => (
                                <li key={p.name}>
                                  <Link href={`/products#${c.id}`} className="text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)]">
                                    {p.name}
                                  </Link>
                                </li>
                              ))}
                              {c.products.length > 4 && (
                                <li className="text-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">+{c.products.length - 4} more</li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="inline-flex items-center bg-[var(--foreground)] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-150 hover:bg-[var(--accent)] active:translate-y-px"
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
            <li>
              <Link
                href="/contact"
                onClick={() => toggleMenu()}
                className="text-mono flex items-center justify-between bg-[var(--foreground)] px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-150 hover:bg-[var(--accent)]"
              >
                Enquire Now
                <span>→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
