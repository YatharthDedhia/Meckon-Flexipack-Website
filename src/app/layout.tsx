import type { Metadata } from 'next';
import './globals.css';
import SiteFrame from '@/components/SiteFrame';
import { getContent } from '@/lib/content';
import { Analytics } from "@vercel/analytics/next"
import { Inter, Inter_Tight } from 'next/font/google';

// Swiss International — a single neutral grotesque (Inter) carries everything.
// Inter Tight for massive display headlines, Inter for body/labels.
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meckon Flexipack | Plastic & Paper Packaging Solutions',
  description: 'Meckon Flexipack delivers high-quality plastic and paper packaging solutions with sustainability in mind.',
  icons: {
    icon: '/logo.png',       // main favicon
    shortcut: '/logo.png',   // optional
    apple: '/logo.png',      // optional for Apple devices
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const company = (content.contacts?.company ?? {}) as {
    phone?: string;
    email?: string;
    gstin?: string;
  };
  const footer = {
    quickLinks: content.quickLinks as { label: string; href: string }[],
    categories: content.productsData.categories.map((c) => ({ name: c.name, id: c.id, link: c.link })),
    company,
  };
  const navCategories = content.productsData.categories.map((c) => ({
    name: c.name,
    id: c.id,
    products: c.products.map((p) => ({ name: p.name })),
  }));

  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body className="font-sans" >
        <SiteFrame footer={footer} navCategories={navCategories}>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  );
}
