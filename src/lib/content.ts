import { Redis } from '@upstash/redis';
import { cache } from 'react';
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
};

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

// Fresh read — for the admin (always latest).
export const getContentFresh = readContent;

// Public read — per-request memoized (one Redis read per request, shared by the
// layout + page). Redis is strongly consistent, so edits are immediately live.
export const getContent = cache(readContent);

export async function saveContent(data: SiteContent): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('Content store (Redis) is not configured');
  await redis.set(CONTENT_KEY, data);
}
