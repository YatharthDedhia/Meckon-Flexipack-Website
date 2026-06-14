import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const c = await redis.get('site-content');
const cats = c?.productsData?.categories || [];
console.log(cats.map((x) => `${x.id} :: ${x.name}`).join('\n'));
