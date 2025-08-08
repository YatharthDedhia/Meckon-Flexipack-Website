'use client';

import { useRouter } from 'next/navigation';

export default function Categories() {
  const router = useRouter();

  const products = [
    { name: 'Paper Bags', img: '/products/paper_bag.jpg', id: 'paperbags' },
    { name: 'Plastic Bags', img: '/products/plastic_bag.jpg', id: 'plasticbags' },
    { name: 'Flexible Packaging', img: '/products/flexible_packaging.png', id: 'flexiblepackaging' },
    { name: 'Paper Packaging', img: '/products/paper_packaging.jpg', id: 'paperpackaging' },
    { name: 'Paper Bags2', img: '/products/paper_bag.jpg', id: 'paperbags2' },
  ];

  const handleClick = (id:string) => {
    router.push(`/products#${id}`);
  };

  return (
    <section className="bg-white animate-fadeIn mt-10 pb-10">
      <h2 className="bg-[var(--brand-red)] text-white h-20 text-3xl font-bold text-center mb-12 flex items-center justify-center">
        Categories we cover
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {/* Top row: 3 bigger boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.name}
              onClick={() => handleClick(product.id)}
              className="group cursor-pointer mx-auto max-w-md overflow-hidden transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900 text-center
                             group-hover:bg-[var(--brand-red)] group-hover:text-white transition-colors duration-100 px-2 py-3 rounded">
                {product.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 bigger boxes centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {products.slice(3, 5).map((product) => (
            <div
              key={product.name}
              onClick={() => handleClick(product.id)}
              className="group cursor-pointer mx-auto max-w-md overflow-hidden transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900 text-center
                             group-hover:bg-[var(--brand-red)] group-hover:text-white transition-colors duration-100 px-2 py-3 rounded">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
