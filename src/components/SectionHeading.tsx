type SectionHeadingProps = {
  kicker?: string;
  num?: string;
  title: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  kicker,
  num,
  title,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {(kicker || num) && (
        <span className={`kicker mb-5 flex items-center gap-2 ${light ? 'text-white' : ''}`}>
          {num && <span className="text-[var(--accent)]">{num}.</span>}
          {kicker}
        </span>
      )}
      <h2
        className={`font-display text-5xl sm:text-6xl md:text-7xl ${
          light ? 'text-white' : 'text-[var(--foreground)]'
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
