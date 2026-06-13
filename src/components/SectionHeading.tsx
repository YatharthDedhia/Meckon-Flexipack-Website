type SectionHeadingProps = {
  kicker?: string;
  title: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  kicker,
  title,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {kicker && (
        <span
          className={`mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] ${
            light ? 'text-white/80' : 'text-[var(--brand-red)]'
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-[var(--brand-ink)]'
        }`}
      >
        {title}
      </h2>
      <span
        className={`mt-4 h-1 w-16 rounded-full ${light ? 'bg-white' : 'bg-[var(--brand-red)]'}`}
      />
    </div>
  );
}
