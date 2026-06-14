'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { productsData } from '@/data';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ProductModal, { Product } from '@/components/ProductModal';

export default function ProductsPage() {
  const categories = productsData.categories;
  const [selected, setSelected] = useState<{ product: Product; category: string } | null>(null);

  // Scroll to hash section on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <Reveal className="mb-10">
        <SectionHeading kicker="Our Range" title="Products" />
      </Reveal>

      {/* Category jump nav */}
      <Reveal className="mb-16" delay={100}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <Reveal key={product.name} delay={(idx % 3) * 100}>
                <button
                  type="button"
                  onClick={() => setSelected({ product, category: name })}
                  className="group block w-full text-left"
                  aria-label={`View details for ${product.name}`}
                >
                  <div className="relative h-80 overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1024px) 50vw,
                             33vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 px-5 py-4">
                      <p className="text-xl font-semibold text-white">{product.name}</p>
                      <span className="flex-shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        View details →
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <ProductModal
        product={selected?.product ?? null}
        category={selected?.category}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
