import { getContent } from '@/lib/content';
import ProductsClient from '@/components/ProductsClient';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const content = await getContent();
  return (
    <ProductsClient
      categories={content.productsData.categories}
      useCases={content.useCases as { key: string; label: string; icon: string }[]}
      industries={content.industries as { key: string; name: string; icon?: string }[]}
    />
  );
}
