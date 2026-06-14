'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import type { Category } from '@/lib/content';
import ImageUpload from './ImageUpload';

const field =
  'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--brand-red)] focus:ring-2 focus:ring-[var(--brand-red)]/20';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 40);

export default function CategoryEditor({
  category,
  isNew,
  onSave,
  onClose,
}: {
  category: Category;
  isNew: boolean;
  onSave: (c: Category) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Category>({ ...category });
  const [err, setErr] = useState('');

  // Slug is derived automatically from the name.
  const id = slugify(form.name);

  const submit = () => {
    if (!form.name.trim()) return setErr('Name is required');
    if (!id) return setErr('Name must include some letters or numbers');
    onSave({ ...form, id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-6 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-[var(--brand-ink)]">{isNew ? 'Add category' : 'Edit category'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[var(--brand-red)]">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Image <span className="font-normal text-gray-400">(cropped to 4:3)</span></label>
            <ImageUpload value={form.overview.img} aspect={4 / 3} onChange={(url) => setForm((f) => ({ ...f, overview: { ...f.overview, img: url } }))} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Name *</label>
            <input className={field} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <p className="mt-1 text-xs text-gray-400">Web link: /products#{id || '…'}</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Description</label>
            <textarea className={field} rows={2} value={form.description || ''} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
        </div>

        {err && <p className="px-6 text-sm text-[var(--brand-red)]">{err}</p>}

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button onClick={onClose} className="rounded-full px-5 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary">
            {isNew ? 'Add' : 'Update'} category
          </button>
        </div>
      </div>
    </div>
  );
}
