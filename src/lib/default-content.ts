import {
  contacts,
  quickLinks,
  pageContent,
  highlights,
  stats,
  clients,
  industries,
  useCases,
  processSteps,
  productsData,
} from '@/data';
import type { SiteContent } from './content';

// Falls back to the current data.js content until an admin saves to Blob.
export const defaultContent = {
  contacts,
  quickLinks,
  pageContent,
  highlights,
  stats,
  clients,
  industries,
  useCases,
  processSteps,
  productsData,
} as unknown as SiteContent;
