import { getContent } from '@/lib/content';
import ContactClient from '@/components/ContactClient';

type Contacts = {
  company: { address?: string; phone?: string; email?: string; gstin?: string };
  team: { name: string; phone?: string; email?: string }[];
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const content = await getContent();
  return <ContactClient contacts={content.contacts as unknown as Contacts} />;
}
