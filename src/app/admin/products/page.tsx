'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaPen, FaTrash, FaSave } from 'react-icons/fa';
import type { Category, Product, SiteContent } from '@/lib/content';
import ProductEditor from '@/components/admin/ProductEditor';
import BackgroundField from '@/components/admin/BackgroundField';
import ImageUpload from '@/components/admin/ImageUpload';

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
 if (editor.prodIndex !== null) {
 // Editing an existing product. If the category is unchanged, replace it in
 // place so the product keeps its position (splice+push would move it to the
 // end). Only when moved to a different category do we remove + append.
 if (newCatIndex === editor.catIndex) {
 cats[newCatIndex].products[editor.prodIndex] = product;
 return;
 }
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

 if (loading) return <div className="min-h-dvh bg-[var(--surface)] p-10 text-[var(--muted-foreground)]">Loading…</div>;
 if (!content) return <div className="min-h-dvh bg-[var(--surface)] p-10 text-[var(--brand-red)]">Failed to load content.</div>;

 const categories: Category[] = content.productsData.categories;

 return (
 <div className="min-h-dvh bg-[var(--surface)]">
 {/* Sticky header */}
 <header className="sticky top-0 z-30 border-b-2 border-[var(--foreground)] bg-white">
 <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
 <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--brand-red)]">
 <FaArrowLeft size={12} /> Dashboard
 </Link>
 <div className="flex items-center gap-3">
 {status && <span className="text-sm text-[var(--muted-foreground)]">{status}</span>}
 {dirty && <span className="text-xs font-semibold text-[var(--accent)]">Unsaved changes</span>}
 <button onClick={save} disabled={saving || !dirty} className="btn-solid disabled:opacity-50">
 <FaSave size={13} /> {saving ? 'Saving…' : 'Save changes'}
 </button>
 </div>
 </div>
 </header>

 <main className="mx-auto max-w-5xl px-4 py-8">
 <h1 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">Products</h1>
 <p className="mt-1 text-[var(--muted-foreground)]">Add, edit, or remove products. Click “Save changes” when you&apos;re done.</p>

 <div className="mt-6 space-y-4 border-2 border-[var(--foreground)] bg-white p-4">
 <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Page backgrounds</p>
 <BackgroundField content={content} mutate={mutate} bgKey="productsPage" />
 <BackgroundField content={content} mutate={mutate} bgKey="admin" />
 </div>

 <div className="mt-8 space-y-10">
 {categories.map((cat, ci) => (
 <section key={cat.id ?? ci}>
 <div className="mb-3 flex items-center justify-between">
 <h2 className="text-lg font-bold text-[var(--brand-ink)]">
 {cat.name} <span className="text-sm font-normal text-[var(--muted-foreground)]">({cat.products.length})</span>
 </h2>
 <button
 onClick={() => setEditor({ catIndex: ci, prodIndex: null, product: structuredClone(emptyProduct) })}
 className="inline-flex items-center gap-2 border border-[var(--foreground)] px-4 py-1.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
 >
 <FaPlus size={11} /> Add product
 </button>
 </div>

 <div className="mb-4 border border-[var(--border)] bg-white p-4">
 <label className="mb-1 block text-sm font-semibold text-[var(--foreground)]">
 Section background texture{' '}
 <span className="font-normal text-[var(--muted-foreground)]">(auto-detected from category name if blank)</span>
 </label>
 <ImageUpload
 value={cat.textureImg || ''}
 aspect={16 / 9}
 minWidth={1000}
 onChange={(url) => mutate((c) => {
 c.productsData.categories[ci].textureImg = url || undefined;
 })}
 />
 </div>

 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
 {cat.products.map((p, pi) => (
 <div key={pi} className="flex items-center gap-3 border border-[var(--foreground)] bg-white p-3 ">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img src={p.img || '/logo.png'} alt="" className="h-14 w-14 flex-shrink-0 object-cover" />
 <div className="min-w-0 flex-1">
 <p className="truncate font-semibold text-[var(--brand-ink)]">{p.name}</p>
 <p className="truncate text-xs text-[var(--muted-foreground)]">{p.material || '—'}</p>
 </div>
 <div className="flex flex-shrink-0 gap-1">
 <button
 onClick={() => setEditor({ catIndex: ci, prodIndex: pi, product: structuredClone(p) })}
 className="flex h-8 w-8 items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--brand-red)]"
 title="Edit"
 >
 <FaPen size={12} />
 </button>
 <button
 onClick={() => removeProduct(ci, pi, p.name)}
 className="flex h-8 w-8 items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"
 title="Delete"
 >
 <FaTrash size={12} />
 </button>
 </div>
 </div>
 ))}
 {cat.products.length === 0 && <p className="text-sm text-[var(--muted-foreground)]">No products yet.</p>}
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
