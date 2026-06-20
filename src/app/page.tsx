import Categories from '@/components/Categories';
import Industries from '@/components/Industries';
import HowWeWork from '@/components/HowWeWork';
import SectionHeading from '@/components/SectionHeading';
import ClientLogo from '@/components/ClientLogo';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { getContent, bg } from '@/lib/content';

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
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Fixed background image for md+ */}
        <div className="hidden md:block fixed inset-0 -z-10 bg-[var(--foreground)]">
          <Image
            src={pageContent.hero.heroImage}
            alt="Packaging products showcase"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-end hero-h w-full px-4 md:px-10 lg:px-16 py-12">
          <div className="swiss-grid-pattern md:bg-[var(--background)] w-full max-w-xl md:max-w-2xl px-8 py-12 md:px-14 md:py-16 text-left md:border-2 md:border-[var(--foreground)]">
            <div className="mb-7 h-1.5 w-16 bg-[var(--accent)]" />
            <span className="kicker mb-5 block">Plastic &amp; Paper Packaging</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] break-words hyphens-none text-[var(--foreground)]">
              {pageContent.hero.title}{' '}
              <span className="text-[var(--accent)]">{pageContent.hero.subtitle}</span>
            </h1>

            {pageContent.hero.paragraphs.map((text, idx) => (
              <p
                key={idx}
                className={`${idx === 0 ? 'mt-7' : 'mt-3'} text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md`}
              >
                {text}
              </p>
            ))}

            <a href={pageContent.hero.ctaLink} className="btn-solid mt-9 h-14 w-full sm:w-auto">
              {pageContent.hero.ctaText} →
            </a>
          </div>
        </div>
      </section>

      {/* Stats — black band */}
      <section className="bg-[var(--foreground)] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading num="01" kicker="By the Numbers" title="Measured in trust." align="left" light />
          </Reveal>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t-2 border-white/20">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="border-b-2 border-white/20 py-8 md:border-b-0 md:py-0 md:pr-8 md:[&:not(:first-child)]:border-l-2 md:[&:not(:first-child)]:border-white/20 md:[&:not(:first-child)]:pl-8">
                  <p className="font-display text-6xl md:text-7xl text-white leading-none">{stat.value}</p>
                  <p className="text-mono mt-4 text-xs uppercase tracking-[0.15em] text-white/50">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meckon — capability highlights */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg(content, 'highlights')} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15] grayscale" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading num="02" kicker="Why Meckon" title="Packaging done right." align="left" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l-2 border-t-2 border-[var(--foreground)]">
            {highlights.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group h-full border-b-2 border-r-2 border-[var(--foreground)] bg-white/85 p-7 transition-colors duration-150 hover:bg-[var(--accent)]">
                  <span className="text-mono text-sm font-bold text-[var(--accent)] transition-colors group-hover:text-white">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-[var(--foreground)] transition-colors group-hover:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] transition-colors group-hover:text-white/90">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <Categories categories={categories} bgImage={bg(content, 'homeCategories')} />

      {/* Industries We Serve */}
      <Industries industries={industries} bgImage={bg(content, 'industries')} />

      {/* How We Work */}
      <HowWeWork processSteps={processSteps} />

      {/* Clients and Partners — logo wall */}
      <section className="swiss-grid-pattern relative overflow-hidden bg-[var(--surface)] py-20 md:py-28 border-t-2 border-[var(--foreground)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg(content, 'clients')}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15] grayscale"
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading num="06" kicker="In Good Company" title="Trusted by leading brands." align="left" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 border-l-2 border-t-2 border-[var(--foreground)] sm:grid-cols-3 md:grid-cols-5">
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
