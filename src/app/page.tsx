import Carousel from '@/components/Carousel';
import Categories from '@/components/Categories';
import Image from 'next/image';
import { pageContent, stats, clients } from '../data';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Image for small devices */}
        <div className="block md:hidden w-full h-60 relative">
          <Image
            src={pageContent.hero.heroImage}
            alt="Packaging products showcase"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Fixed background image for md+ */}
        <div className="hidden md:block fixed inset-0 -z-10">
          <Image
            src={pageContent.hero.heroImage}
            alt="Packaging products showcase"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-end md:pr-0 h-full max-w-7xl mx-auto px-4 -my-10 py-0 md:py-10">
          <div className="md:bg-white text-[var(--brand-red)] rounded-md max-w-2xl w-full md:w-auto px-8 py-12 md:px-15 md:py-30 text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {pageContent.hero.title}{' '}
              <span className="text-black">{pageContent.hero.subtitle}</span>
            </h1>

            {pageContent.hero.paragraphs.map((text, idx) => (
              <p
                key={idx}
                className={`mt-${idx === 0 ? '6' : '4'} text-lg text-gray-700 max-w-lg mx-auto md:mx-0`}
              >
                {text}
              </p>
            ))}

            <a
              href={pageContent.hero.ctaLink}
              className="inline-block mt-10 border-2 border-[var(--brand-red)] text-[var(--brand-red)] px-8 py-3 rounded font-semibold hover:bg-[var(--brand-red)] hover:text-white transition-all duration-300"
            >
              {pageContent.hero.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-0 animate-fadeIn">
        <h2 className="h-20 text-3xl font-bold bg-[var(--brand-red)] text-white flex items-center justify-center">
          Our Experience
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="h-50 group transition-transform transform transition-colors duration-300 p-4 cursor-pointer hover:bg-[var(--brand-red)]"
            >
              <p className="mt-10 text-3xl font-bold text-[var(--brand-red)] group-hover:text-white transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-gray-700 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <Categories />

      {/* Clients and Partners */}
      <section className="bg-white mt-12 pb-10">
        <h2 className="h-20 text-3xl font-bold bg-[var(--brand-red)] text-white mb-12 flex items-center justify-center">
          Our Partners & Clients
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {clients.map(({ name, logo }) => (
            <div
              key={name}
              className="w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
              title={name}
            >
              <img
                src={logo}
                alt={name}
                className="max-h-25 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
