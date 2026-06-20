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

const SITE_URL = 'https://www.meckonflexipack.com';
const SITE_DESCRIPTION =
  'Meckon Flexipack delivers high-quality plastic and paper packaging solutions with sustainability in mind.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Meckon Flexipack | Plastic & Paper Packaging Solutions',
    template: '%s | Meckon Flexipack',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Meckon Flexipack',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',       // main favicon
    shortcut: '/logo.png',   // optional
    apple: '/logo.png',      // optional for Apple devices
  },
  openGraph: {
    type: 'website',
    siteName: 'Meckon Flexipack',
    title: 'Meckon Flexipack | Plastic & Paper Packaging Solutions',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_IN',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Meckon Flexipack' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meckon Flexipack | Plastic & Paper Packaging Solutions',
    description: SITE_DESCRIPTION,
    images: ['/logo.png'],
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
