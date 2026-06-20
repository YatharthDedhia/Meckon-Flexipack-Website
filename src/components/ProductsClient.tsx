'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  FaCookieBite,
  FaMortarPestle,
  FaWineBottle,
  FaSeedling,
  FaSnowflake,
  FaBoxOpen,
  FaTshirt,
  FaShoppingBag,
  FaBriefcaseMedical,
  FaTruck,
  FaIndustry,
  FaTimes,
  FaPaperPlane,
} from 'react-icons/fa';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ProductModal, { Product } from '@/components/ProductModal';
import type { Category } from '@/lib/content';

const useCaseIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  snacks: FaCookieBite,
  spices: FaMortarPestle,
  liquids: FaWineBottle,
  grains: FaSeedling,
  frozen: FaSnowflake,
  dryfoods: FaBoxOpen,
  apparel: FaTshirt,
  retail: FaShoppingBag,
  pharma: FaBriefcaseMedical,
  ecom: FaTruck,
  industrial: FaIndustry,
};

// Auto-detect a category's background texture from its NAME, so new categories
// added later get a sensible material texture automatically. First match wins;
// an explicit per-category `textureImg` (set in the admin) always overrides.
const TEXTURE_RULES: [RegExp, string][] = [
  [/corrugat|carton|cardboard|\bbox|crate/i, '/textures/corrugated.jpg'],
  [/bubble|cushion|protective|fragile|wrap|flexible|film/i, '/textures/bubble.jpg'],
  [/pouch|sachet/i, '/textures/bubble.jpg'],
  [/paper|kraft/i, '/textures/paper.jpg'],
  [/plastic|poly|woven|sack|\bbag|ldpe|hdpe|laminate/i, '/textures/plastic.jpg'],
];
function textureForCategory(name: string, override?: string): string | undefined {
  if (override) return override;
  for (const [re, img] of TEXTURE_RULES) if (re.test(name)) return img;
  return undefined;
}

type UseCase = { key: string; label: string; icon: string };
type Industry = { key: string; name: string; icon?: string };
type Filter = { type: 'usecase' | 'industry'; key: string; label: string };
type TaggedProduct = Product & { category: string; industries?: string[]; useCases?: string[] };

export default function ProductsClient({
  categories,
  useCases,
  industries,
  bgImage,
}: {
  categories: Category[];
  useCases: UseCase[];
  industries: Industry[];
  bgImage: string;
}) {
  const [selected, setSelected] = useState<{ product: Product; category: string } | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);

  const allProducts = useMemo<TaggedProduct[]>(
    () => categories.flatMap((c) => c.products.map((p) => ({ ...p, category: c.name }))),
    [categories]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uc = params.get('use');
    const ind = params.get('industry');
    if (uc) {
      const f = useCases.find((u) => u.key === uc);
      if (f) return setFilter({ type: 'usecase', key: f.key, label: f.label });
    }
    if (ind) {
      const f = industries.find((i) => i.key === ind);
      if (f) return setFilter({ type: 'industry', key: f.key, label: f.name });
    }
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return null;
    return allProducts.filter((p) =>
      filter.type === 'usecase' ? p.useCases?.includes(filter.key) : p.industries?.includes(filter.key)
    );
  }, [filter, allProducts]);

  const toggleUse = (key: string, label: string) =>
    setFilter((f) => (f?.type === 'usecase' && f.key === key ? null : { type: 'usecase', key, label }));
  const toggleInd = (key: string, label: string) =>
    setFilter((f) => (f?.type === 'industry' && f.key === key ? null : { type: 'industry', key, label }));

  const card = (product: TaggedProduct, idx: number, showCategory: boolean) => (
    <Reveal key={`${product.category}-${product.name}-${idx}`} delay={(idx % 3) * 80}>
      <button
        type="button"
        onClick={() => setSelected({ product, category: product.category })}
        className="group block w-full text-left"
        aria-label={`View details for ${product.name}`}
      >
        <div className="border-2 border-[var(--foreground)]">
          <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-[var(--foreground)] bg-[var(--surface)]">
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {showCategory && (
              <span className="text-mono absolute left-4 top-4 bg-white px-3 py-1 text-[11px] uppercase tracking-wider text-[var(--foreground)]">
                {product.category}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 p-4 transition-colors duration-150 group-hover:bg-[var(--accent)]">
            <p className="font-display text-lg text-[var(--foreground)] group-hover:text-white">{product.name}</p>
            <span className="text-mono flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--foreground)] opacity-0 -translate-x-1 transition-all duration-150 group-hover:text-white group-hover:opacity-100 group-hover:translate-x-0">
              View →
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );

  return (
    <section className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bgImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] grayscale" />
      <div className="relative max-w-7xl mx-auto px-4 py-16">
      <Reveal className="mb-12">
        <SectionHeading as="h1" num="01" kicker="Find Your Packaging" title="What are you packaging?" align="left" />
        <p className="mt-5 max-w-2xl text-base text-[var(--muted-foreground)] leading-relaxed">
          Tell us what you&apos;re packing and we&apos;ll point you to the products that fit — or browse the full range below.
        </p>
      </Reveal>

      <Reveal className="mb-5">
        <div className="grid grid-cols-2 gap-px border-2 border-[var(--foreground)] bg-[var(--border)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {useCases.map((u) => {
            const Icon = useCaseIcons[u.icon] ?? FaBoxOpen;
            const active = filter?.type === 'usecase' && filter.key === u.key;
            return (
              <button
                key={u.key}
                type="button"
                onClick={() => toggleUse(u.key, u.label)}
                className={`flex flex-col items-start gap-3 p-5 text-left transition-colors duration-150 ${
                  active
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-mono text-[11px] uppercase tracking-wider leading-tight">{u.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mb-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-mono mr-2 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">Or by industry —</span>
          {industries.map((i) => {
            const active = filter?.type === 'industry' && filter.key === i.key;
            return (
              <button
                key={i.key}
                type="button"
                onClick={() => toggleInd(i.key, i.name)}
                className={`text-mono border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                    : 'border-[var(--foreground)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white'
                }`}
              >
                {i.name}
              </button>
            );
          })}
          {filter && (
            <button
              type="button"
              onClick={() => setFilter(null)}
              className="text-mono inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-2 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
            >
              <FaTimes size={11} /> Clear
            </button>
          )}
        </div>
      </Reveal>

      {filter && filtered && (
        <div className="mb-16">
          <div className="mb-10 flex items-center justify-between border-b border-[var(--border)] pb-5">
            <h2 className="font-display text-2xl md:text-3xl text-[var(--foreground)]">
              {filtered.length} product{filtered.length === 1 ? '' : 's'} for{' '}
              <span className="text-[var(--accent)]">{filter.label}</span>
            </h2>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((p, idx) => card(p, idx, true))}
            </div>
          ) : (
            <div className="border border-[var(--border)] bg-[var(--muted)] p-12 text-center">
              <p className="font-display text-2xl text-[var(--foreground)]">No exact match — but we likely make it.</p>
              <p className="mt-3 text-[var(--muted-foreground)]">Tell us about your product and we&apos;ll recommend the right packaging.</p>
            </div>
          )}
        </div>
      )}

      {!filter && (
        <>
          <Reveal className="mb-12">
            <div className="flex flex-wrap gap-2 border-y border-[var(--border)] py-4">
              {categories.map(({ id, name, products }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-mono border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] transition-colors duration-150 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                >
                  {name}
                  <span className="ml-2 text-[var(--accent)]">{String(products.length).padStart(2, '0')}</span>
                </a>
              ))}
            </div>
          </Reveal>

          {categories.map(({ id, name, description, products, textureImg }, ci) => {
            const tex = textureForCategory(name, textureImg);
            return (
            <div key={id} id={id} className="relative mb-24 scroll-mt-28 py-8">
              {tex && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={tex}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-full w-screen max-w-none -translate-x-1/2 object-cover opacity-[0.2] grayscale"
                />
              )}
              <div className="relative">
                <Reveal className="mb-10">
                  <SectionHeading num={String(ci + 1).padStart(2, '0')} kicker="Category" title={name} align="left" />
                  {description && (
                    <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--muted-foreground)]">{description}</p>
                  )}
                </Reveal>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
                  {products.map((p, idx) => card({ ...p, category: name }, idx, false))}
                </div>
              </div>
            </div>
            );
          })}
        </>
      )}

      <Reveal>
        <div className="mt-4 flex flex-col items-start gap-6 bg-[var(--foreground)] px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <span className="kicker text-[var(--accent)]">Get in touch</span>
            <h3 className="mt-4 font-display text-3xl md:text-4xl text-white">Not sure what you need?</h3>
            <p className="mt-3 max-w-md text-white/60">
              Tell us about your product, quantity and branding — we&apos;ll recommend the ideal packaging.
            </p>
          </div>
          <Link href="/contact?product=the right packaging for my product" className="btn-solid flex-shrink-0">
            <FaPaperPlane size={13} />
            Get a recommendation
          </Link>
        </div>
      </Reveal>
      </div>

      <ProductModal
        product={selected?.product ?? null}
        category={selected?.category}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
