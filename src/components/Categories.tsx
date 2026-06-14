'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import type { Category } from '@/lib/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group block w-full border-2 border-[var(--foreground)] text-left">
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[var(--foreground)] bg-[var(--surface)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.overview.img}
          alt={category.overview.name}
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
        <span className="text-mono absolute left-4 top-4 bg-white px-3 py-1 text-[11px] uppercase tracking-wider text-[var(--foreground)]">
          {String(category.products.length).padStart(2, '0')} products
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 bg-white p-5 transition-colors duration-150 group-hover:bg-[var(--accent)]">
        <h3 className="font-display text-xl text-[var(--foreground)] group-hover:text-white">{category.overview.name}</h3>
        <FaArrowRight
          size={14}
          className="flex-shrink-0 text-[var(--foreground)] opacity-0 -translate-x-2 transition-all duration-150 group-hover:text-white group-hover:opacity-100 group-hover:translate-x-0"
        />
      </div>
    </button>
  );
}

export default function Categories({ categories, bgImage }: { categories: Category[]; bgImage: string }) {
  const router = useRouter();
  const handleClick = (id: string) => router.push(`/products#${id}`);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15] grayscale"
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading num="03" kicker="What We Make" title="Categories we cover." align="left" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <Reveal key={category.id} delay={(idx % 3) * 100}>
              <CategoryCard category={category} onClick={() => handleClick(category.id)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
