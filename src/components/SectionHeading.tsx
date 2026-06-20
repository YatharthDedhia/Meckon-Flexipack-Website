type SectionHeadingProps = {
  kicker?: string;
  num?: string;
  title: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
  /** Heading level for the title. Defaults to h2; use h1 for a page's lead heading. */
  as?: 'h1' | 'h2';
};

export default function SectionHeading({
  kicker,
  num,
  title,
  align = 'center',
  light = false,
  className = '',
  as: Heading = 'h2',
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
      <Heading
        className={`font-display text-5xl sm:text-6xl md:text-7xl ${
          light ? 'text-white' : 'text-[var(--foreground)]'
        }`}
      >
        {title}
      </Heading>
    </div>
  );
}
