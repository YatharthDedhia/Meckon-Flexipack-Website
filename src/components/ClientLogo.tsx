import React from 'react';

/**
 * Generated wordmark "logos" — these are sample brands with no real logo
 * assets, so each gets a distinct typographic treatment (serif, mono,
 * monogram, two-tone weight, accent marks) to read like a real logo wall.
 * Monochrome by default; darkens to foreground on hover. Accent marks stay red.
 */
export default function ClientLogo({ name, index }: { name: string; index: number }) {
  const i = index % 10;
  let inner: React.ReactNode = <span className="font-display text-lg tracking-tight">{name}</span>;

  switch (i) {
    case 0: // bar mark + bold uppercase
      inner = (
        <>
          <span className="text-[var(--accent)]">▮</span>
          <span className="font-display text-lg uppercase tracking-tight">{name}</span>
        </>
      );
      break;
    case 1: // serif italic
      inner = <span className="text-serif text-xl italic">{name}</span>;
      break;
    case 2: // mono, spaced uppercase
      inner = <span className="text-mono text-xs uppercase tracking-[0.3em]">{name}</span>;
      break;
    case 3: { // two-tone weight
      const [first, ...rest] = name.split(' ');
      inner = (
        <span className="font-display text-lg tracking-tight">
          <span className="font-medium opacity-60">{first}</span>
          <span className="font-extrabold">{rest.join(' ')}</span>
        </span>
      );
      break;
    }
    case 4: // monogram badge + name
      inner = (
        <>
          <span className="text-mono border border-current px-1.5 py-0.5 text-[11px] font-bold">
            {(name.match(/[A-Z]/g) || []).slice(0, 2).join('')}
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">{name}</span>
        </>
      );
      break;
    case 5: // display + accent dot
      inner = (
        <span className="font-display text-lg tracking-tight">
          {name}
          <span className="text-[var(--accent)]">.</span>
        </span>
      );
      break;
    case 6: // condensed uppercase, wide tracking
      inner = <span className="font-heading text-sm font-bold uppercase tracking-[0.2em]">{name}</span>;
      break;
    case 7: // star mark + display
      inner = (
        <>
          <span className="text-xs text-[var(--accent)]">✦</span>
          <span className="font-display text-lg tracking-tight">{name}</span>
        </>
      );
      break;
    case 8: // serif roman
      inner = <span className="text-serif text-lg">{name}</span>;
      break;
    case 9: // mono with middot separator
      inner = (
        <span className="text-mono text-[11px] uppercase tracking-[0.18em]">{name.replace(' ', ' · ')}</span>
      );
      break;
  }

  return (
    <div
      className="flex h-24 items-center justify-center gap-2 border-b border-r border-[var(--border)] px-4 text-center text-[var(--muted-foreground)] transition-colors duration-200 hover:text-[var(--foreground)]"
      title={name}
    >
      {inner}
    </div>
  );
}
