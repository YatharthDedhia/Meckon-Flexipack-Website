'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FooterData = {
  quickLinks: { label: string; href: string }[];
  categories: { name: string; id?: string; link?: string }[];
  company: { phone?: string; email?: string; gstin?: string };
};

type NavCategory = { name: string; id: string; products: { name: string }[] };

// Public pages get the Navbar + Footer; /admin pages render bare.
export default function SiteFrame({
  children,
  footer,
  navCategories,
}: {
  children: React.ReactNode;
  footer: FooterData;
  navCategories: NavCategory[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar categories={navCategories} />
      <main>{children}</main>
      <Footer {...footer} />
    </>
  );
}
