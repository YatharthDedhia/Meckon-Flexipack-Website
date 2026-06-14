'use client';

import ImageUpload from './ImageUpload';
import { BACKGROUND_DEFAULTS, BACKGROUND_LABELS, type SiteContent } from '@/lib/content';

// Reusable "section background image" uploader, bound to content.backgrounds[key]
// with the built-in default as the shown value. Used inline within the relevant
// admin page/tab (no separate Backgrounds tab).
export default function BackgroundField({
  content,
  mutate,
  bgKey,
  label,
}: {
  content: SiteContent;
  mutate: (fn: (c: SiteContent) => void) => void;
  bgKey: string;
  label?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-[var(--foreground)]">
        {label || BACKGROUND_LABELS[bgKey] || 'Background image'}{' '}
        <span className="font-normal text-[var(--muted-foreground)]">(faded section background)</span>
      </label>
      <ImageUpload
        value={content.backgrounds?.[bgKey] || BACKGROUND_DEFAULTS[bgKey]}
        aspect={16 / 9}
        minWidth={1000}
        onChange={(url) => mutate((c) => { c.backgrounds = { ...(c.backgrounds || {}), [bgKey]: url }; })}
      />
    </div>
  );
}
