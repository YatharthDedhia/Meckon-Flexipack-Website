import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const c = await redis.get('site-content');
if (!c) {
  console.log('No content in Redis yet (site uses data.js defaults) — nothing to update.');
  process.exit(0);
}
const old = c.pageContent?.hero?.heroImage;
c.pageContent.hero.heroImage = '/hero_gpt1.png';
await redis.set('site-content', c);
console.log(`Updated heroImage: ${old} -> ${c.pageContent.hero.heroImage}`);
