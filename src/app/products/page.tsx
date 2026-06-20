import { getContent, bg } from '@/lib/content';
import ProductsClient from '@/components/ProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore Meckon Flexipack’s range of plastic and paper packaging — flexible packaging, bags, pouches and more, filterable by industry and use case.',
  alternates: { canonical: '/products' },
};

export default async function ProductsPage() {
  const content = await getContent();
  return (
    <ProductsClient
      categories={content.productsData.categories}
      useCases={content.useCases as { key: string; label: string; icon: string }[]}
      industries={content.industries as { key: string; name: string; icon?: string }[]}
      bgImage={bg(content, 'productsPage')}
    />
  );
}
