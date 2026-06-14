import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getContentFresh, saveContent, CONTENT_TAG, type SiteContent } from '@/lib/content';

export const runtime = 'nodejs';

export async function GET() {
  const content = await getContentFresh();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || !body.productsData || !Array.isArray(body.productsData.categories)) {
    return NextResponse.json({ error: 'Malformed content' }, { status: 400 });
  }

  await saveContent(body);

  // Invalidate the cached content + refresh the public pages so edits appear.
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
