import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/blob';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image must be under 8 MB' }, { status: 400 });
  }
  try {
    const url = await uploadImage(file);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
