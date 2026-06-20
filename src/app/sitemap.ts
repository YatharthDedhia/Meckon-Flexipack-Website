import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.meckonflexipack.com';

// Static marketing routes. Product categories live as anchors on /products,
// so they aren't separate URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/products', '/contact'];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
