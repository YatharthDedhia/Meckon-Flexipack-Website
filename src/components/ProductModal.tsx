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
      <div className="relative z-10 w-full max-w-3xl overflow-hidden bg-[var(--background)] shadow-2xl animate-modalIn max-h-[90vh] flex flex-col md:flex-row">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center bg-white text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] hover:text-white"
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
        <div className="flex-1 overflow-y-auto p-7 md:p-9">
          {category && (
            <span className="kicker">{category}</span>
          )}
          <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">{product.name}</h3>
          {product.description && (
            <p className="mt-3 leading-relaxed text-[var(--muted-foreground)]">{product.description}</p>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <span
                  key={f}
                  className="text-mono inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[var(--foreground)]"
                >
                  <FaCheck size={9} className="text-[var(--accent)]" /> {f}
                </span>
              ))}
            </div>
          )}

          {specs.length > 0 && (
            <dl className="mt-7 border-t border-[var(--border)]">
              {specs.map((s) => (
                <div key={s.label} className="flex gap-4 border-b border-[var(--border)] py-3">
                  <dt className="text-mono w-28 flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">{s.label}</dt>
                  <dd className="text-sm text-[var(--foreground)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="btn-solid mt-8 w-full sm:w-auto"
          >
            <FaPaperPlane size={13} />
            Enquire about this product
          </Link>
        </div>
      </div>
    </div>
  );
}
