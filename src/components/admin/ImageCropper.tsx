'use client';

import { useCallback, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

function loadImage(src: string): Promise<HTMLImageElement> {
 return new Promise((resolve, reject) => {
 const img = new Image();
 img.crossOrigin = 'anonymous';
 img.onload = () => resolve(img);
 img.onerror = reject;
 img.src = src;
 });
}

async function getCroppedBlob(src: string, area: Area): Promise<Blob> {
 const img = await loadImage(src);
 // Cap output width so files stay reasonable.
 const maxW = 2000;
 const scale = area.width > maxW ? maxW / area.width : 1;
 const canvas = document.createElement('canvas');
 canvas.width = Math.round(area.width * scale);
 canvas.height = Math.round(area.height * scale);
 const ctx = canvas.getContext('2d')!;
 ctx.drawImage(
 img,
 area.x,
 area.y,
 area.width,
 area.height,
 0,
 0,
 canvas.width,
 canvas.height
 );
 return new Promise<Blob>((resolve, reject) =>
 canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('crop failed'))), 'image/jpeg', 0.9)
 );
}

export default function ImageCropper({
 src,
 aspect,
 minWidth = 800,
 onCancel,
 onCropped,
}: {
 src: string;
 aspect: number;
 minWidth?: number;
 onCancel: () => void;
 onCropped: (blob: Blob) => void;
}) {
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const [zoom, setZoom] = useState(1);
 const [pixels, setPixels] = useState<Area | null>(null);
 const [busy, setBusy] = useState(false);

 const onComplete = useCallback((_: Area, p: Area) => setPixels(p), []);

 const cropW = pixels ? Math.round(pixels.width) : 0;
 const cropH = pixels ? Math.round(pixels.height) : 0;
 const minHeight = Math.round(minWidth / aspect);
 const tooSmall = !pixels || cropW < minWidth;

 const confirm = async () => {
 if (!pixels || tooSmall) return;
 setBusy(true);
 try {
 const blob = await getCroppedBlob(src, pixels);
 onCropped(blob);
 } finally {
 setBusy(false);
 }
 };

 return (
 <div className="fixed inset-0 z-[70] flex flex-col bg-black/80">
 <div className="relative flex-1">
 <Cropper
 image={src}
 crop={crop}
 zoom={zoom}
 aspect={aspect}
 onCropChange={setCrop}
 onZoomChange={setZoom}
 onCropComplete={onComplete}
 objectFit="contain"
 />
 </div>
 <div className="flex flex-col gap-3 bg-white px-6 py-4">
 <div className="flex flex-col items-center gap-3 sm:flex-row">
 <span className="text-sm font-semibold text-[var(--foreground)]">Zoom</span>
 <input
 type="range"
 min={1}
 max={3}
 step={0.01}
 value={zoom}
 onChange={(e) => setZoom(Number(e.target.value))}
 className="w-full max-w-xs accent-[var(--brand-red)]"
 />
 <div className="flex items-center gap-2 sm:ml-auto">
 <span className={`text-sm font-semibold ${tooSmall ? 'text-[var(--brand-red)]' : 'text-[var(--foreground)]'}`}>
 {cropW} × {cropH} px {tooSmall ? '' : '✓'}
 </span>
 </div>
 </div>

 {tooSmall && (
 <p className="text-center text-xs text-[var(--brand-red)] sm:text-right">
 Too low-resolution — zoom out, or use a sharper image. Minimum {minWidth} × {minHeight} px.
 </p>
 )}

 <div className="flex justify-center gap-3 sm:justify-end">
 <button onClick={onCancel} className=" px-5 py-2 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
 Cancel
 </button>
 <button onClick={confirm} disabled={busy || tooSmall} className="btn-primary disabled:opacity-50">
 {busy ? 'Saving…' : 'Crop & use'}
 </button>
 </div>
 </div>
 </div>
 );
}
