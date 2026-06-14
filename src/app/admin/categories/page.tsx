'use client';

import { useState } from 'react';
import { FaPlus, FaPen, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import type { Category } from '@/lib/content';
import { useAdminContent } from '@/components/admin/useAdminContent';
import AdminHeader from '@/components/admin/AdminHeader';
import CategoryEditor from '@/components/admin/CategoryEditor';

const emptyCat: Category = { name: '', id: '', description: '', overview: { name: '', img: '' }, products: [], link: '' };

export default function CategoriesAdmin() {
  const { content, loading, saving, dirty, status, mutate, save } = useAdminContent();
  const [editor, setEditor] = useState<{ index: number | null; cat: Category } | null>(null);

  if (loading || !content) {
    return <div className="min-h-dvh bg-[var(--surface)] p-10 text-gray-500">Loading…</div>;
  }

  const cats = content.productsData.categories;

  const onEditorSave = (cat: Category) => {
    if (!editor) return;
    mutate((c) => {
      cat.link = `/products#${cat.id}`;
      cat.overview.name = cat.name;
      if (editor.index === null) c.productsData.categories.push(cat);
      else c.productsData.categories[editor.index] = cat;
    });
    setEditor(null);
  };

  const del = (i: number) => {
    if (!confirm(`Delete category "${cats[i].name}" and its ${cats[i].products.length} product(s)? This can't be undone after you save.`)) return;
    mutate((c) => c.productsData.categories.splice(i, 1));
  };

  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= cats.length) return;
    mutate((c) => {
      const a = c.productsData.categories;
      [a[i], a[j]] = [a[j], a[i]];
    });
  };

  const iconBtn = 'flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-[var(--surface-tint)] hover:text-[var(--brand-red)] disabled:opacity-30 disabled:hover:bg-transparent';

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      <AdminHeader dirty={dirty} saving={saving} status={status} onSave={save} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">Categories</h1>
            <p className="text-gray-500">Reorder, edit, or add product categories.</p>
          </div>
          <button onClick={() => setEditor({ index: null, cat: structuredClone(emptyCat) })} className="btn-primary">
            <FaPlus size={12} /> Add category
          </button>
        </div>

        <div className="space-y-3">
          {cats.map((cat, i) => (
            <div key={cat.id || i} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.overview.img || '/logo.png'} alt="" className="h-14 w-14 flex-shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[var(--brand-ink)]">{cat.name}</p>
                <p className="truncate text-xs text-gray-400">{cat.products.length} products · /{cat.id}</p>
              </div>
              <div className="flex flex-shrink-0 gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className={iconBtn} title="Move up"><FaArrowUp size={12} /></button>
                <button onClick={() => move(i, 1)} disabled={i === cats.length - 1} className={iconBtn} title="Move down"><FaArrowDown size={12} /></button>
                <button onClick={() => setEditor({ index: i, cat: structuredClone(cat) })} className={iconBtn} title="Edit"><FaPen size={12} /></button>
                <button onClick={() => del(i)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-[var(--brand-red)]" title="Delete"><FaTrash size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {editor && (
        <CategoryEditor
          category={editor.cat}
          isNew={editor.index === null}
          onSave={onEditorSave}
          onClose={() => setEditor(null)}
        />
      )}
    </div>
  );
}
