'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaPen, FaTrash, FaSave } from 'react-icons/fa';
import type { Category, Product, SiteContent } from '@/lib/content';
import ProductEditor from '@/components/admin/ProductEditor';

const emptyProduct: Product = { name: '', img: '', features: [], industries: [], useCases: [] };

export default function ProductsAdmin() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState('');
  const [editor, setEditor] = useState<{ catIndex: number; prodIndex: number | null; product: Product } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((c: SiteContent) => setContent(c))
      .catch(() => setStatus('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const mutate = (fn: (c: SiteContent) => void) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
    setStatus('');
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setStatus('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setDirty(false);
        setStatus('Saved ✓');
      } else {
        const d = await res.json().catch(() => ({}));
        setStatus(d.error || 'Save failed');
      }
    } catch {
      setStatus('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onEditorSave = (newCatIndex: number, product: Product) => {
    if (!editor) return;
    mutate((c) => {
      const cats = c.productsData.categories;
      // remove from original position if editing
      if (editor.prodIndex !== null) {
        cats[editor.catIndex].products.splice(editor.prodIndex, 1);
      }
      cats[newCatIndex].products.push(product);
    });
    setEditor(null);
  };

  const removeProduct = (catIndex: number, prodIndex: number, name: string) => {
    if (!confirm(`Delete "${name}"? This can't be undone after you save.`)) return;
    mutate((c) => {
      c.productsData.categories[catIndex].products.splice(prodIndex, 1);
    });
  };

  if (loading) return <div className="min-h-dvh bg-[var(--surface)] p-10 text-gray-500">Loading…</div>;
  if (!content) return <div className="min-h-dvh bg-[var(--surface)] p-10 text-[var(--brand-red)]">Failed to load content.</div>;

  const categories: Category[] = content.productsData.categories;

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--brand-red)]">
            <FaArrowLeft size={12} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            {status && <span className="text-sm text-gray-500">{status}</span>}
            {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
            <button onClick={save} disabled={saving || !dirty} className="btn-primary disabled:opacity-50">
              <FaSave size={13} /> {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">Products</h1>
        <p className="mt-1 text-gray-500">Add, edit, or remove products. Click “Save changes” when you&apos;re done.</p>

        <div className="mt-8 space-y-10">
          {categories.map((cat, ci) => (
            <section key={cat.id ?? ci}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[var(--brand-ink)]">
                  {cat.name} <span className="text-sm font-normal text-gray-400">({cat.products.length})</span>
                </h2>
                <button
                  onClick={() => setEditor({ catIndex: ci, prodIndex: null, product: { ...emptyProduct } })}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
                >
                  <FaPlus size={11} /> Add product
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.products.map((p, pi) => (
                  <div key={pi} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img || '/logo.png'} alt="" className="h-14 w-14 flex-shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[var(--brand-ink)]">{p.name}</p>
                      <p className="truncate text-xs text-gray-400">{p.material || '—'}</p>
                    </div>
                    <div className="flex flex-shrink-0 gap-1">
                      <button
                        onClick={() => setEditor({ catIndex: ci, prodIndex: pi, product: p })}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-[var(--surface-tint)] hover:text-[var(--brand-red)]"
                        title="Edit"
                      >
                        <FaPen size={12} />
                      </button>
                      <button
                        onClick={() => removeProduct(ci, pi, p.name)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-[var(--brand-red)]"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                {cat.products.length === 0 && <p className="text-sm text-gray-400">No products yet.</p>}
              </div>
            </section>
          ))}
        </div>
      </main>

      {editor && (
        <ProductEditor
          product={editor.product}
          categoryNames={categories.map((c) => c.name)}
          catIndex={editor.catIndex}
          industries={content.industries}
          useCases={content.useCases}
          onSave={onEditorSave}
          onClose={() => setEditor(null)}
        />
      )}
    </div>
  );
}
