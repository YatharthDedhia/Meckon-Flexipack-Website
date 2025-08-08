import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // include weights you want
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Meckon Flexipack | Plastic & Paper Packaging Solutions',
  description: 'Meckon Flexipack delivers high-quality plastic and paper packaging solutions with sustainability in mind.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans" >
        <Navbar />
        <main className="md:p-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
