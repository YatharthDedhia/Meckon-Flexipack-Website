import Link from 'next/link';
import {
  FaUtensils,
  FaShoppingBag,
  FaBriefcaseMedical,
  FaSeedling,
  FaTruck,
  FaTshirt,
  FaIndustry,
  FaArrowRight,
} from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Industry = { key: string; name: string; description?: string; icon?: string };

const industryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  food: FaUtensils,
  retail: FaShoppingBag,
  pharma: FaBriefcaseMedical,
  agri: FaSeedling,
  ecom: FaTruck,
  apparel: FaTshirt,
};

export default function Industries({ industries, bgImage }: { industries: Industry[]; bgImage: string }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Faded photo backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.15] grayscale"
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading num="04" kicker="Industries We Serve" title="Packaging for every sector." align="left" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-l-2 border-t-2 border-[var(--foreground)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, idx) => {
            const Icon = industryIcons[item.icon ?? item.key] ?? FaIndustry;
            return (
              <Reveal key={item.name} delay={(idx % 3) * 80}>
                <Link
                  href={`/products?industry=${item.key}`}
                  className="group flex h-full flex-col border-b-2 border-r-2 border-[var(--foreground)] bg-white/85 p-8 transition-colors duration-150 hover:bg-[var(--accent)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-mono text-xs font-bold text-[var(--accent)] transition-colors group-hover:text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center border-2 border-[var(--foreground)] text-[var(--foreground)] transition-colors group-hover:border-white group-hover:text-white">
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className="mt-6 flex items-center gap-2 font-display text-2xl text-[var(--foreground)] transition-colors group-hover:text-white">
                    {item.name}
                    <FaArrowRight
                      size={13}
                      className="opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] transition-colors group-hover:text-white/90">{item.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
