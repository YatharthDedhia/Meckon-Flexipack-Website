import { FaLightbulb, FaPenNib, FaIndustry, FaClipboardCheck, FaTruck } from 'react-icons/fa';
import { processSteps } from '../data';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const stepIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  concept: FaLightbulb,
  design: FaPenNib,
  manufacture: FaIndustry,
  qc: FaClipboardCheck,
  delivery: FaTruck,
};

export default function HowWeWork() {
  return (
    <section className="bg-[var(--surface-tint)] py-20">
      <Reveal>
        <SectionHeading kicker="How We Work" title="From concept to doorstep" />
      </Reveal>

      <div className="max-w-6xl mx-auto mt-16 px-4">
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-4">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden md:block">
            <div className="mx-[10%] h-0.5 bg-[var(--brand-red)]/20" />
          </div>

          {processSteps.map((step, idx) => {
            const Icon = stepIcons[step.icon] ?? FaLightbulb;
            return (
              <Reveal key={step.step} delay={idx * 120} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-red)] text-white shadow-md ring-8 ring-[var(--surface-tint)]">
                    <Icon size={22} />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--brand-red)] shadow">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--brand-ink)]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
