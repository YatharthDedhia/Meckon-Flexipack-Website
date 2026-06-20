import { Redis } from '@upstash/redis';
import { unstable_cache } from 'next/cache';
import { defaultContent } from './default-content';

const CONTENT_KEY = 'site-content';
export const CONTENT_TAG = 'site-content';

export type Product = {
  name: string;
  img: string;
  description?: string;
  features?: string[];
  material?: string;
  sizes?: string;
  moq?: string;
  applications?: string;
  industries?: string[];
  useCases?: string[];
};

export type Category = {
  name: string;
  id: string;
  link?: string;
  description?: string;
  textureImg?: string; // optional admin override for the section background texture
  overview: { name: string; img: string };
  products: Product[];
};

// The whole site content document (mirrors src/data.js). Parts the editors
// don't touch yet are loosely typed for now.
export type SiteContent = {
  contacts: Record<string, unknown>;
  quickLinks: unknown[];
  pageContent: Record<string, unknown>;
  highlights: unknown[];
  stats: unknown[];
  clients: unknown[];
  industries: { key: string; name: string }[];
  useCases: { key: string; label: string }[];
  processSteps: unknown[];
  productsData: { categories: Category[] };
  backgrounds?: Record<string, string>;
};

// Named section background images, with their built-in defaults. Editable in
// the admin under "Backgrounds"; components fall back to these defaults.
export const BACKGROUND_DEFAULTS: Record<string, string> = {
  aboutCompany: '/about_co.jpg',
  aboutHistory: '/stock/team.jpg',
  highlights: '/stock1.jpg',
  homeCategories: '/stock2.jpg',
  industries: '/stock/industries.jpg',
  clients: '/stock/clients.jpg',
  productsPage: '/products-bg.jpg',
  admin: '/admin-bg.jpg',
};

export const BACKGROUND_LABELS: Record<string, string> = {
  aboutCompany: 'About — company section',
  aboutHistory: 'About — our journey section',
  highlights: 'Home — "Packaging done right"',
  homeCategories: 'Home — "Categories we cover"',
  industries: 'Home — "Industries we serve"',
  clients: 'Home — "Trusted by leading brands"',
  productsPage: 'Products page — overall',
  admin: 'Admin dashboard',
};

// Resolve a background image URL for a given key (admin override or default).
export function bg(content: SiteContent, key: string): string {
  return content.backgrounds?.[key] || BACKGROUND_DEFAULTS[key] || '';
}

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Read the content document from Redis (strongly consistent); fall back to the
// data.js defaults if it hasn't been created yet (or Redis isn't configured).
async function readContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (!redis) return defaultContent;
  try {
    const data = await redis.get<SiteContent>(CONTENT_KEY);
    if (data && data.productsData) return data;
  } catch {
    // not reachable → defaults
  }
  return defaultContent;
}

// Fresh read — for the admin (always latest, never cached).
export const getContentFresh = readContent;

// Public read — cached across requests and tagged with CONTENT_TAG, so the
// public pages can be statically rendered / ISR-served instead of hitting Redis
// on every request. Admin saves call revalidateTag(CONTENT_TAG), which busts
// this cache so edits go live immediately.
export const getContent = unstable_cache(readContent, ['site-content'], {
  tags: [CONTENT_TAG],
  revalidate: 3600, // hourly fallback in case a tag-bust is ever missed
});

export async function saveContent(data: SiteContent): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('Content store (Redis) is not configured');
  await redis.set(CONTENT_KEY, data);
  await recordVersion(redis, data);
}

// ---- Version history (for rollback) --------------------------------------

const HISTORY_KEY = 'site-content-history';
const MAX_HISTORY = 30; // keep the last 30 saved versions

export type Version = { id: string; savedAt: number; content: SiteContent };

// Append a snapshot of the just-saved content to the history list (newest
// first), capped at MAX_HISTORY. Best-effort: never blocks/breaks a save.
async function recordVersion(redis: Redis, content: SiteContent): Promise<void> {
  const version: Version = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: Date.now(),
    content,
  };
  try {
    await redis.lpush(HISTORY_KEY, version);
    await redis.ltrim(HISTORY_KEY, 0, MAX_HISTORY - 1);
  } catch {
    /* history is non-critical */
  }
}

// All saved versions, newest first.
export async function getVersions(): Promise<Version[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const raw = await redis.lrange<Version>(HISTORY_KEY, 0, -1);
    return raw || [];
  } catch {
    return [];
  }
}

// Roll back to a previous version. Saving it also appends it as the newest
// version, so a restore is itself reversible.
export async function restoreVersion(id: string): Promise<SiteContent | null> {
  const versions = await getVersions();
  const v = versions.find((x) => x.id === id);
  if (!v) return null;
  await saveContent(v.content);
  return v.content;
}
