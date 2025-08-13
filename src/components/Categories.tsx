'use client';

import { useRouter } from 'next/navigation';
import { productsData } from '../data';

export default function Categories() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/products#${id}`);
  };

  const categories = productsData.categories;

  return (
    <section className="bg-white animate-fadeIn mt-10 pb-10">
      <h2 className="bg-[var(--brand-red)] text-white h-20 text-3xl font-bold text-center mb-12 flex items-center justify-center">
        Categories we cover
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {/* Top row: first 3 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              onClick={() => handleClick(category.id)}
              className="group cursor-pointer mx-auto max-w-md overflow-hidden transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img
                  src={category.overview.img}
                  alt={category.overview.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900 text-center
                             group-hover:bg-[var(--brand-red)] group-hover:text-white transition-colors duration-100 px-2 py-3 rounded">
                {category.overview.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom row: next 2 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {categories.slice(3, 5).map((category) => (
            <div
              key={category.id}
              onClick={() => handleClick(category.id)}
              className="group cursor-pointer mx-auto max-w-md overflow-hidden transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img
                  src={category.overview.img}
                  alt={category.overview.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900 text-center
                             group-hover:bg-[var(--brand-red)] group-hover:text-white transition-colors duration-100 px-2 py-3 rounded">
                {category.overview.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
