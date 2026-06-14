'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaCheck, FaPaperPlane } from 'react-icons/fa';

export type Product = {
  name: string;
  img: string;
  description?: string;
  features?: string[];
  material?: string;
  sizes?: string;
  moq?: string;
  applications?: string;
};

export default function ProductModal({
  product,
  category,
  onClose,
}: {
  product: Product | null;
  category?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const specs = [
    { label: 'Material', value: product.material },
    { label: 'Sizes', value: product.sizes },
    { label: 'Min. Order', value: product.moq },
    { label: 'Applications', value: product.applications },
  ].filter((s) => s.value);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-modalIn max-h-[90vh] flex flex-col md:flex-row">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition-colors hover:bg-[var(--brand-red)] hover:text-white"
        >
          <FaTimes size={15} />
        </button>

        {/* Image */}
        <div className="relative h-56 w-full flex-shrink-0 md:h-auto md:w-2/5">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Details */}
        <div className="flex-1 overflow-y-auto p-7 md:p-8">
          {category && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
              {category}
            </span>
          )}
          <h3 className="mt-1 text-2xl font-bold text-[var(--brand-ink)]">{product.name}</h3>
          {product.description && (
            <p className="mt-3 leading-relaxed text-gray-600">{product.description}</p>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-tint)] px-3 py-1 text-xs font-semibold text-[var(--brand-red)]"
                >
                  <FaCheck size={9} /> {f}
                </span>
              ))}
            </div>
          )}

          {specs.length > 0 && (
            <dl className="mt-6 divide-y divide-gray-100 border-y border-gray-100">
              {specs.map((s) => (
                <div key={s.label} className="flex gap-4 py-2.5">
                  <dt className="w-28 flex-shrink-0 text-sm font-semibold text-gray-400">{s.label}</dt>
                  <dd className="text-sm text-gray-700">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="btn-primary mt-7 w-full sm:w-auto"
          >
            <FaPaperPlane size={14} />
            Enquire about this product
          </Link>
        </div>
      </div>
    </div>
  );
}
