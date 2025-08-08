'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const categories = [
  {
    name: 'Paper Bags',
    id: 'paperbags',
    products: [
      { name: 'Brown Kraft Paper Bag', img: '/products/paper_bag.jpg' },
      { name: 'White Paper Bag with Handle', img: '/products/paper_bag.jpg' },
      { name: 'Recycled Paper Bag', img: '/products/paper_bag.jpg' },
      { name: 'Custom Printed Paper Bag', img: '/products/paper_bag.jpg' },
    ],
  },
  {
    name: 'Plastic Bags',
    id: 'plasticbags',
    products: [
      { name: 'Clear Plastic Bag', img: '/products/plastic_bag.jpg' },
      { name: 'Zip Lock Plastic Bag', img: '/products/plastic_bag.jpg' },
      { name: 'Biodegradable Plastic Bag', img: '/products/plastic_bag.jpg' },
    ],
  },
  {
    name: 'Flexible Packaging',
    id: 'flexiblepackaging',
    products: [
      { name: 'Stand-up Pouch', img: '/products/flexible_packaging.png' },
      { name: 'Resealable Bag', img: '/products/flexible_packaging.png' },
      { name: 'Vacuum Sealed Bag', img: '/products/flexible_packaging.png' },
      { name: 'Printed Flexible Film', img: '/products/flexible_packaging.png' },
      { name: 'Retort Pouch', img: '/products/flexible_packaging.png' },
    ],
  },
  {
    name: 'Paper Packaging',
    id: 'paperpackaging',
    products: [
      { name: 'Corrugated Box', img: '/products/paper_packaging.jpg' },
      { name: 'Folding Carton', img: '/products/paper_packaging.jpg' },
      { name: 'Paper Sleeve', img: '/products/paper_packaging.jpg' },
    ],
  },
];

export default function ProductsPage() {
  const router = useRouter();

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

  const handleClick = () => {
    router.push('/contact');
  };

  return (
    <section className="max-w-7xl mx-auto px-4">
      {categories.map(({ id, name, products }) => (
        <div key={id} id={id} className="mb-16 scroll-mt-20">
          <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 mb-6">
            {name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map(({ name: productName, img }) => (
              <div
                key={productName}
                className="cursor-pointer group"
                onClick={handleClick}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={img}
                    alt={productName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                    priority={false}
                  />
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900 text-center
                             group-hover:bg-[var(--brand-red)] group-hover:text-white transition-colors duration-100 px-2 py-3 rounded">
                  {productName}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
