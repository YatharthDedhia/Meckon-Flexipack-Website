import React from 'react';

/**
 * Generated wordmark "logos" — sample brands with no real logo assets, each
 * given a distinct uppercase grotesque treatment (weight, marks, spacing) so
 * the wall reads as varied real brands. Swiss style: thick black grid, full
 * red colour-inversion on hover.
 */
export default function ClientLogo({ name, index }: { name: string; index: number }) {
  const i = index % 10;
  let inner: React.ReactNode = <span className="font-display text-base">{name}</span>;

  switch (i) {
    case 0: // bar mark + black weight
      inner = (
        <>
          <span className="h-3 w-3 bg-current" />
          <span className="font-display text-base">{name}</span>
        </>
      );
      break;
    case 1: // heavy uppercase, wide tracking
      inner = <span className="font-display text-base tracking-[0.12em]">{name}</span>;
      break;
    case 2: // medium weight, spaced
      inner = <span className="text-mono text-xs font-semibold uppercase tracking-[0.28em]">{name}</span>;
      break;
    case 3: { // two-tone weight
      const [first, ...rest] = name.split(' ');
      inner = (
        <span className="text-base uppercase tracking-tight">
          <span className="font-medium">{first}</span>
          <span className="font-black">{rest.join(' ')}</span>
        </span>
      );
      break;
    }
    case 4: // monogram box + name
      inner = (
        <>
          <span className="border-2 border-current px-1.5 text-[11px] font-black uppercase">
            {(name.match(/[A-Z]/g) || []).slice(0, 2).join('')}
          </span>
          <span className="text-sm font-bold uppercase tracking-tight">{name}</span>
        </>
      );
      break;
    case 5: // black weight + slash
      inner = (
        <span className="font-display text-base">
          {name}
          <span className="text-[var(--accent)] group-hover:text-white">/</span>
        </span>
      );
      break;
    case 6: // condensed, widest tracking
      inner = <span className="text-xs font-black uppercase tracking-[0.22em]">{name}</span>;
      break;
    case 7: // square mark + display
      inner = (
        <>
          <span className="h-2.5 w-2.5 rotate-45 bg-[var(--accent)] group-hover:bg-white" />
          <span className="font-display text-base">{name}</span>
        </>
      );
      break;
    case 8: // regular grotesque
      inner = <span className="text-base font-semibold uppercase tracking-tight">{name}</span>;
      break;
    case 9: // spaced caps with middot
      inner = (
        <span className="text-mono text-[11px] font-bold uppercase tracking-[0.18em]">{name.replace(' ', ' · ')}</span>
      );
      break;
  }

  return (
    <div
      className="group flex h-24 items-center justify-center gap-2 border-b-2 border-r-2 border-[var(--foreground)] px-4 text-center text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-white"
      title={name}
    >
      {inner}
    </div>
  );
}
