'use client';

import { useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/content';

export function useAdminContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState('');

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

  return { content, loading, saving, dirty, status, mutate, save };
}
