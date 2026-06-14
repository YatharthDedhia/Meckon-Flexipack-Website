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
import { productsData, useCases, industries } from '@/data';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ProductModal, { Product } from '@/components/ProductModal';

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

type Filter = { type: 'usecase' | 'industry'; key: string; label: string };
type TaggedProduct = Product & { category: string; industries?: string[]; useCases?: string[] };

export default function ProductsPage() {
  const categories = productsData.categories;
  const [selected, setSelected] = useState<{ product: Product; category: string } | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);

  const allProducts = useMemo<TaggedProduct[]>(
    () => categories.flatMap((c) => c.products.map((p) => ({ ...p, category: c.name }))),
    [categories]
  );

  // Apply ?use= / ?industry= deep links, else scroll to #category hash
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
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return null;
    return allProducts.filter((p) =>
      filter.type === 'usecase'
        ? p.useCases?.includes(filter.key)
        : p.industries?.includes(filter.key)
    );
  }, [filter, allProducts]);

  const toggleUse = (key: string, label: string) =>
    setFilter((f) => (f?.type === 'usecase' && f.key === key ? null : { type: 'usecase', key, label }));
  const toggleInd = (key: string, label: string) =>
    setFilter((f) => (f?.type === 'industry' && f.key === key ? null : { type: 'industry', key, label }));

  const card = (product: TaggedProduct, idx: number, showCategory: boolean) => (
    <Reveal key={`${product.category}-${product.name}`} delay={(idx % 3) * 80}>
      <button
        type="button"
        onClick={() => setSelected({ product, category: product.category })}
        className="group block w-full text-left"
        aria-label={`View details for ${product.name}`}
      >
        <div className="relative h-80 overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          {showCategory && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--brand-red)] backdrop-blur-sm">
              {product.category}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 px-5 py-4">
            <p className="text-xl font-semibold text-white">{product.name}</p>
            <span className="flex-shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              View details →
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Discovery */}
      <Reveal className="mb-10">
        <SectionHeading kicker="Find Your Packaging" title="What are you packaging?" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Tell us what you&apos;re packing and we&apos;ll point you to the products that fit — or browse the full range below.
        </p>
      </Reveal>

      <Reveal className="mb-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {useCases.map((u) => {
            const Icon = useCaseIcons[u.icon] ?? FaBoxOpen;
            const active = filter?.type === 'usecase' && filter.key === u.key;
            return (
              <button
                key={u.key}
                type="button"
                onClick={() => toggleUse(u.key, u.label)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${
                  active
                    ? 'border-[var(--brand-red)] bg-[var(--brand-red)] text-white shadow-md'
                    : 'border-gray-200 bg-white text-[var(--brand-ink)] hover:-translate-y-0.5 hover:border-[var(--brand-red)] hover:shadow-md'
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-semibold leading-tight">{u.label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm font-semibold text-gray-400">Or shop by industry:</span>
          {industries.map((i) => {
            const active = filter?.type === 'industry' && filter.key === i.key;
            return (
              <button
                key={i.key}
                type="button"
                onClick={() => toggleInd(i.key, i.name)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'border-[var(--brand-red)] bg-[var(--brand-red)] text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]'
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
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200"
            >
              <FaTimes size={11} /> Clear
            </button>
          )}
        </div>
      </Reveal>

      {/* Filtered results */}
      {filter && filtered && (
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--brand-ink)]">
              {filtered.length} product{filtered.length === 1 ? '' : 's'} for{' '}
              <span className="text-[var(--brand-red)]">{filter.label}</span>
            </h2>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((p, idx) => card(p, idx, true))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[var(--surface)] p-10 text-center">
              <p className="text-lg font-semibold text-[var(--brand-ink)]">No exact match — but we likely make it.</p>
              <p className="mt-2 text-gray-500">Tell us about your product and we&apos;ll recommend the right packaging.</p>
            </div>
          )}
        </div>
      )}

      {/* Full catalogue (only when not filtering) */}
      {!filter && (
        <>
          <Reveal className="mb-10">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(({ id, name, products }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] hover:text-white"
                >
                  {name}
                  <span className="ml-2 text-xs opacity-60">{products.length}</span>
                </a>
              ))}
            </div>
          </Reveal>

          {categories.map(({ id, name, description, products }) => (
            <div key={id} id={id} className="mb-20 scroll-mt-28">
              <Reveal className="mb-10">
                <SectionHeading kicker="Category" title={name} align="left" />
                {description && (
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">{description}</p>
                )}
              </Reveal>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {products.map((p, idx) => card({ ...p, category: name }, idx, false))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Assisted recommendation CTA */}
      <Reveal>
        <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl bg-[var(--brand-ink)] px-8 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white">Not sure what you need?</h3>
            <p className="mt-2 text-gray-300">
              Tell us about your product, quantity and branding — we&apos;ll recommend the ideal packaging.
            </p>
          </div>
          <Link
            href="/contact?product=the right packaging for my product"
            className="btn-primary flex-shrink-0"
          >
            <FaPaperPlane size={14} />
            Get a recommendation
          </Link>
        </div>
      </Reveal>

      <ProductModal
        product={selected?.product ?? null}
        category={selected?.category}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
