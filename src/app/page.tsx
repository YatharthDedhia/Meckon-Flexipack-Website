import Categories from '@/components/Categories';
import Industries from '@/components/Industries';
import HowWeWork from '@/components/HowWeWork';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import {
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaBoxOpen,
  FaLeaf,
  FaPrint,
  FaIndustry,
  FaShieldAlt,
} from 'react-icons/fa';
import { pageContent, stats, clients, highlights } from '../data';

const statIcons = [FaAward, FaUsers, FaCheckCircle, FaBoxOpen];

const highlightIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  leaf: FaLeaf,
  print: FaPrint,
  factory: FaIndustry,
  shield: FaShieldAlt,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Image for small devices */}
        <div className="block md:hidden w-full h-72 relative">
          <Image
            src={pageContent.hero.heroImage}
            alt="Packaging products showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Fixed background image for md+ */}
        <div className="hidden md:block fixed inset-0 -z-10">
          <Image
            src={pageContent.hero.heroImage}
            alt="Packaging products showcase"
            fill
            className="object-cover"
            priority
          />
          {/* Scrim for depth + contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-end md:pr-0 min-h-screen max-w-7xl mx-auto px-4 py-12">
          <div className="md:bg-white/95 md:backdrop-blur-sm text-[var(--brand-red)] rounded-2xl md:shadow-2xl max-w-2xl w-full md:w-auto px-8 py-12 md:px-14 md:py-24 text-left">
            <span className="mb-4 inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[var(--brand-red)]">
              Meckon Flexipack
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {pageContent.hero.title}{' '}
              <span className="text-[var(--brand-ink)]">{pageContent.hero.subtitle}</span>
            </h1>

            {pageContent.hero.paragraphs.map((text, idx) => (
              <p
                key={idx}
                className={`mt-${idx === 0 ? '6' : '4'} text-lg text-gray-600 leading-relaxed max-w-lg`}
              >
                {text}
              </p>
            ))}

            <a href={pageContent.hero.ctaLink} className="btn-primary mt-10">
              {pageContent.hero.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20">
        <Reveal>
          <SectionHeading kicker="Our Experience" title="Trusted by the numbers" />
        </Reveal>
        <div className="max-w-6xl mx-auto mt-14 px-4 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
          {stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="group h-full bg-white py-12 px-4 text-center transition-colors duration-300 hover:bg-[var(--surface-tint)]">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-tint)] text-[var(--brand-red)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <p className="font-heading text-4xl font-extrabold text-[var(--brand-red)]">{stat.value}</p>
                  <p className="mt-1 text-gray-500 font-medium">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why Meckon — capability highlights */}
      <section className="bg-[var(--surface-tint)] py-20">
        <Reveal>
          <SectionHeading kicker="Why Meckon" title="Packaging done right" />
        </Reveal>
        <div className="max-w-6xl mx-auto mt-14 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = highlightIcons[item.icon] ?? FaCheckCircle;
            return (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group h-full rounded-2xl bg-white p-7 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-red)] text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--brand-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <Categories />

      {/* Industries We Serve */}
      <Industries />

      {/* How We Work */}
      <HowWeWork />

      {/* Clients and Partners */}
      <section className="bg-white py-20">
        <Reveal>
          <SectionHeading kicker="In Good Company" title="Our Partners & Clients" />
        </Reveal>
        <div className="max-w-6xl mx-auto mt-14 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {clients.map(({ name }, idx) => (
            <Reveal key={name} delay={idx * 50}>
              <div
                className="group flex h-20 items-center justify-center rounded-xl border border-gray-100 bg-[var(--surface)] px-4 text-center transition-all duration-300 hover:border-[var(--brand-red)] hover:bg-white hover:shadow-md"
                title={name}
              >
                <span className="text-base font-bold tracking-tight text-gray-400 transition-colors duration-300 group-hover:text-[var(--brand-red)]">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
