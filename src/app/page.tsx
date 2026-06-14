import Categories from '@/components/Categories';
import Industries from '@/components/Industries';
import HowWeWork from '@/components/HowWeWork';
import SectionHeading from '@/components/SectionHeading';
import ClientLogo from '@/components/ClientLogo';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getContent();
  const pageContent = content.pageContent as {
    hero: { title: string; subtitle: string; paragraphs: string[]; heroImage: string; ctaText: string; ctaLink: string };
  };
  const stats = content.stats as { value: string; label: string }[];
  const clients = content.clients as { name: string }[];
  const highlights = content.highlights as { title: string; description: string; icon: string }[];
  const categories = content.productsData.categories;
  const industries = content.industries;
  const processSteps = content.processSteps as { step: number; title: string; description: string; icon: string }[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-h">
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
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-end hero-h w-full px-4 md:px-10 lg:px-16 py-12">
          <div className="md:bg-[var(--background)]/95 md:backdrop-blur-sm max-w-2xl w-full md:w-auto px-8 py-12 md:px-14 md:py-16 text-left md:border-t-2 md:border-[var(--accent)]">
            <span className="kicker mb-6 block">Plastic &amp; Paper Packaging</span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--foreground)]">
              {pageContent.hero.title}{' '}
              <span className="text-[var(--accent)]">{pageContent.hero.subtitle}</span>
            </h1>

            {pageContent.hero.paragraphs.map((text, idx) => (
              <p
                key={idx}
                className={`mt-${idx === 0 ? '7' : '3'} text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md`}
              >
                {text}
              </p>
            ))}

            <a href={pageContent.hero.ctaLink} className="btn-solid mt-9">
              {pageContent.hero.ctaText} →
            </a>
          </div>
        </div>
      </section>

      {/* Stats — editorial dark band */}
      <section className="bg-[var(--brand-ink)] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <span className="kicker text-[var(--brand-red)]">Our Experience</span>
            <h2 className="font-display mt-4 max-w-xl text-3xl md:text-4xl text-white">
              Decades of packaging, measured in trust.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="md:px-8 md:[&:not(:first-child)]:border-l border-white/10">
                  <p className="font-display text-6xl md:text-7xl text-white leading-none">{stat.value}</p>
                  <p className="text-mono mt-4 text-xs uppercase tracking-[0.15em] text-white/50">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meckon — capability highlights */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading kicker="Why Meckon" title="Packaging done right." align="left" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {highlights.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group">
                  <div className="tile-rule mb-6" />
                  <span className="text-mono text-sm text-[var(--accent)]">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 font-display text-2xl text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <Categories categories={categories} />

      {/* Industries We Serve */}
      <Industries industries={industries} />

      {/* How We Work */}
      <HowWeWork processSteps={processSteps} />

      {/* Clients and Partners — logo wall */}
      <section className="relative overflow-hidden bg-[var(--surface)] py-20 md:py-24 border-t border-[var(--line)]">
        {/* Oversized faded backdrop word (layered-type depth) */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -right-4 -top-6 select-none text-[9rem] leading-none text-[var(--foreground)] opacity-[0.03] md:text-[16rem]"
        >
          CLIENTS
        </span>

        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading kicker="In Good Company" title="Trusted by leading brands." align="left" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 border-l border-t border-[var(--border)] sm:grid-cols-3 md:grid-cols-5">
            {clients.map(({ name }, idx) => (
              <Reveal key={name} delay={idx * 40}>
                <ClientLogo name={name} index={idx} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
