import {
  FaUtensils,
  FaShoppingBag,
  FaBriefcaseMedical,
  FaSeedling,
  FaTruck,
  FaTshirt,
  FaIndustry,
} from 'react-icons/fa';
import { industries } from '../data';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const industryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  food: FaUtensils,
  retail: FaShoppingBag,
  pharma: FaBriefcaseMedical,
  agri: FaSeedling,
  ecom: FaTruck,
  apparel: FaTshirt,
};

export default function Industries() {
  return (
    <section className="bg-white py-20">
      <Reveal>
        <SectionHeading kicker="Industries We Serve" title="Packaging for every sector" />
      </Reveal>
      <div className="max-w-6xl mx-auto mt-14 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((item, idx) => {
          const Icon = industryIcons[item.icon] ?? FaIndustry;
          return (
            <Reveal key={item.name} delay={idx * 80}>
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--brand-red)]/30">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--brand-ink)]">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
