import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getVersions, restoreVersion, CONTENT_TAG, type SiteContent } from '@/lib/content';

export const runtime = 'nodejs';

// Lightweight summary so the list payload stays small (no full content sent).
function summarize(c: SiteContent) {
  const cats = c?.productsData?.categories || [];
  const products = cats.reduce((n, cat) => n + (cat.products?.length || 0), 0);
  return { categories: cats.length, products };
}

export async function GET() {
  const versions = await getVersions();
  return NextResponse.json(
    versions.map((v) => ({ id: v.id, savedAt: v.savedAt, summary: summarize(v.content) }))
  );
}

export async function POST(req: NextRequest) {
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const id = String(body.id || '');
  if (!id) return NextResponse.json({ error: 'Missing version id' }, { status: 400 });

  const restored = await restoreVersion(id);
  if (!restored) return NextResponse.json({ error: 'Version not found' }, { status: 404 });

  // Refresh public pages so the rollback appears immediately.
  try {
    revalidateTag(CONTENT_TAG);
  } catch {
    /* noop */
  }
  for (const p of ['/', '/products', '/about', '/contact']) {
    try {
      revalidatePath(p);
    } catch {
      /* noop */
    }
  }

  return NextResponse.json({ ok: true });
}
