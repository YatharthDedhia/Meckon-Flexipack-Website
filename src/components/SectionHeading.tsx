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
        <span className={`kicker mb-6 flex items-center gap-3 ${light ? 'text-white/70' : ''}`}>
          <span className={`h-px w-8 ${light ? 'bg-white/40' : 'bg-[var(--accent)]'}`} />
          {kicker}
        </span>
      )}
      <h2
        className={`font-display text-4xl sm:text-5xl md:text-6xl ${
          light ? 'text-white' : 'text-[var(--foreground)]'
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
