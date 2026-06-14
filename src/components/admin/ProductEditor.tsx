'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import type { Product } from '@/lib/content';
import ImageUpload from './ImageUpload';

type IndOpt = { key: string; name: string };
type UseOpt = { key: string; label: string };

const field = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--brand-red)] focus:ring-2 focus:ring-[var(--brand-red)]/20';

export default function ProductEditor({
  product,
  categoryNames,
  catIndex,
  industries,
  useCases,
  onSave,
  onClose,
}: {
  product: Product;
  categoryNames: string[];
  catIndex: number;
  industries: IndOpt[];
  useCases: UseOpt[];
  onSave: (newCatIndex: number, product: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>({ ...product });
  const [cat, setCat] = useState(catIndex);
  const [featuresText, setFeaturesText] = useState((product.features || []).join(', '));
  const [err, setErr] = useState('');

  const set = (k: keyof Product, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k: 'industries' | 'useCases', key: string) =>
    setForm((f) => {
      const cur = new Set(f[k] || []);
      cur.has(key) ? cur.delete(key) : cur.add(key);
      return { ...f, [k]: [...cur] };
    });

  const submit = () => {
    if (!form.name.trim()) return setErr('Product name is required');
    if (!form.img) return setErr('Please add an image');
    onSave(cat, {
      ...form,
      features: featuresText.split(',').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-[var(--brand-ink)]">
            {product.name ? 'Edit product' : 'Add product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[var(--brand-red)]">
            <FaTimes />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
          {/* Image (cropped to 4:3 — the product card ratio) */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Image <span className="font-normal text-gray-400">(cropped to 4:3)</span></label>
            <ImageUpload value={form.img} onChange={(url) => set('img', url)} aspect={4 / 3} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Name *</label>
            <input className={field} value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Category</label>
            <select className={field} value={cat} onChange={(e) => setCat(Number(e.target.value))}>
              {categoryNames.map((n, i) => (
                <option key={i} value={i}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Material</label>
            <input className={field} value={form.material || ''} onChange={(e) => set('material', e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Description</label>
            <textarea className={field} rows={2} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Sizes</label>
            <input className={field} value={form.sizes || ''} onChange={(e) => set('sizes', e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Min. order</label>
            <input className={field} value={form.moq || ''} onChange={(e) => set('moq', e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Applications</label>
            <input className={field} value={form.applications || ''} onChange={(e) => set('applications', e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Features (comma-separated)</label>
            <input className={field} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Resealable, Food-grade, Custom-print" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Industries</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((o) => {
                const on = (form.industries || []).includes(o.key);
                return (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => toggle('industries', o.key)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${on ? 'border-[var(--brand-red)] bg-[var(--brand-red)] text-white' : 'border-gray-200 text-gray-500'}`}
                  >
                    {o.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Use-cases</label>
            <div className="flex flex-wrap gap-2">
              {useCases.map((o) => {
                const on = (form.useCases || []).includes(o.key);
                return (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => toggle('useCases', o.key)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${on ? 'border-[var(--brand-red)] bg-[var(--brand-red)] text-white' : 'border-gray-200 text-gray-500'}`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {err && <p className="px-6 text-sm text-[var(--brand-red)]">{err}</p>}

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button onClick={onClose} className="rounded-full px-5 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary">
            {product.name ? 'Update' : 'Add'} product
          </button>
        </div>
      </div>
    </div>
  );
}
