'use client';

import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import ImageCropper from './ImageCropper';

export default function ImageUpload({
  value,
  onChange,
  aspect = 4 / 3,
  minWidth = 800,
  size = 'h-20 w-20',
}: {
  value: string;
  onChange: (url: string) => void;
  aspect?: number;
  minWidth?: number;
  size?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const onFile = (file: File) => {
    setErr('');
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadBlob = async (blob: Blob) => {
    setCropSrc(null);
    setUploading(true);
    setErr('');
    const fd = new FormData();
    fd.append('file', new File([blob], 'image.jpg', { type: 'image/jpeg' }));
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const d = await res.json();
      if (res.ok && d.url) onChange(d.url);
      else setErr(d.error || 'Upload failed');
    } catch {
      setErr('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value || '/logo.png'} alt="" className={`${size} rounded-lg border border-gray-100 object-cover`} />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]">
          <FaUpload size={12} />
          {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) onFile(e.target.files[0]);
              e.target.value = '';
            }}
          />
        </label>
        {err && <span className="text-sm text-[var(--brand-red)]">{err}</span>}
      </div>

      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          aspect={aspect}
          minWidth={minWidth}
          onCancel={() => setCropSrc(null)}
          onCropped={uploadBlob}
        />
      )}
    </>
  );
}
