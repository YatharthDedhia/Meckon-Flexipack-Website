'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import type { Category } from '@/lib/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group cursor-pointer mx-auto w-full max-w-md">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.overview.img}
          alt={category.overview.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--brand-red)] backdrop-blur-sm">
          {category.products.length} products
        </span>
        <h3 className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 px-5 py-4 text-xl font-semibold text-white">
          <span>{category.overview.name}</span>
          <FaArrowRight className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </h3>
      </div>
    </div>
  );
}

export default function Categories({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const handleClick = (id: string) => router.push(`/products#${id}`);

  const topRow = categories.slice(0, 3);
  const restRow = categories.slice(3);

  return (
    <section className="bg-[var(--surface)] py-20">
      <Reveal>
        <SectionHeading kicker="What We Make" title="Categories we cover" />
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {topRow.map((category, idx) => (
            <Reveal key={category.id} delay={idx * 100}>
              <CategoryCard category={category} onClick={() => handleClick(category.id)} />
            </Reveal>
          ))}
        </div>

        {restRow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {restRow.map((category, idx) => (
              <Reveal key={category.id} delay={idx * 100}>
                <CategoryCard category={category} onClick={() => handleClick(category.id)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
