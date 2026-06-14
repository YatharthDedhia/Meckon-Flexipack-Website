import type { Metadata } from 'next';
import './globals.css';
import SiteFrame from '@/components/SiteFrame';
import { getContent } from '@/lib/content';
import { Analytics } from "@vercel/analytics/next"
import { Manrope, Inter } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans" >
        <SiteFrame footer={footer}>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  );
}
