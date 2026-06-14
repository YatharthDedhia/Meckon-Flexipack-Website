'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import type { Category } from '@/lib/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group block w-full text-left">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
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
      <div className="flex items-start justify-between gap-3 pt-5">
        <h3 className="font-display text-2xl text-[var(--foreground)]">{category.overview.name}</h3>
        <FaArrowRight
          size={14}
          className="mt-2 flex-shrink-0 text-[var(--accent)] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </div>
      <div className="tile-rule mt-4" />
    </button>
  );
}

export default function Categories({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const handleClick = (id: string) => router.push(`/products#${id}`);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading kicker="What We Make" title="Categories we cover." align="left" />
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
