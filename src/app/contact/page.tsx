import { getContent } from '@/lib/content';
import ContactClient from '@/components/ContactClient';
import type { Metadata } from 'next';

type Contacts = {
  company: { address?: string; phone?: string; email?: string; gstin?: string };
  team: { name: string; phone?: string; email?: string }[];
};

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Meckon Flexipack for plastic and paper packaging enquiries, quotes, and bulk orders. Reach our Mumbai team by phone, email, or the contact form.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const content = await getContent();
  return <ContactClient contacts={content.contacts as unknown as Contacts} />;
}
