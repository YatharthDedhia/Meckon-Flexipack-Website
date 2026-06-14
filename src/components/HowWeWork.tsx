import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Step = { step: number; title: string; description: string; icon: string };

export default function HowWeWork({ processSteps }: { processSteps: Step[] }) {
  return (
    <section className="bg-[var(--surface)] py-20 md:py-28 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading kicker="How We Work" title="From concept to doorstep." align="left" />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 100}>
              <div className="group">
                <div className="tile-rule mb-6" />
                <span className="font-display text-5xl leading-none text-[var(--accent)]">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-xl text-[var(--foreground)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
