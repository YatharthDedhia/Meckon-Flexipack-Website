import { put, del } from '@vercel/blob';

// Upload an image to Vercel Blob and return its public URL.
export async function uploadImage(file: File, prefix = 'products'): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const name = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blob = await put(name, file, { access: 'public', addRandomSuffix: false });
  return blob.url;
}

// Delete an image (best-effort). Only deletes Blob-hosted URLs, never the
// bundled /public assets.
export async function deleteImage(url: string): Promise<void> {
  if (!url || !url.includes('.blob.vercel-storage.com')) return;
  try {
    await del(url);
  } catch {
    // ignore
  }
}
