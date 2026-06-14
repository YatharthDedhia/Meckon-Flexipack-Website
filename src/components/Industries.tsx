import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Industry = { key: string; name: string; description?: string; icon?: string };

export default function Industries({ industries }: { industries: Industry[] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading kicker="Industries We Serve" title="Packaging for every sector." align="left" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-l border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, idx) => (
            <Reveal key={item.name} delay={(idx % 3) * 80}>
              <Link
                href={`/products?industry=${item.key}`}
                className="group flex h-full flex-col border-b border-r border-[var(--border)] p-8 transition-colors duration-200 hover:bg-[var(--muted)]"
              >
                <span className="text-mono text-xs text-[var(--accent)]">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 flex items-center gap-2 font-display text-2xl text-[var(--foreground)]">
                  {item.name}
                  <FaArrowRight
                    size={13}
                    className="text-[var(--accent)] opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                  />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{item.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
