'use client';

import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useAdminContent } from '@/components/admin/useAdminContent';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUpload from '@/components/admin/ImageUpload';
import { BACKGROUND_DEFAULTS, BACKGROUND_LABELS } from '@/lib/content';

const field = 'swiss-input';

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
 return (
 <label className="block">
 <span className="mb-1 block text-sm font-semibold text-[var(--foreground)]">{label}</span>
 <input className={field} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
 </label>
 );
}

function StringList({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
 return (
 <div>
 <span className="mb-2 block text-sm font-semibold text-[var(--foreground)]">{label}</span>
 <div className="space-y-2">
 {items.map((it, i) => (
 <div key={i} className="flex gap-2">
 <textarea className={field} rows={2} value={it} onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }} />
 <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="flex-shrink-0 px-2 text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 ))}
 <button onClick={() => onChange([...items, ''])} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add</button>
 </div>
 </div>
 );
}

const TABS = ['Hero', 'About', 'History', 'Stats', 'Clients', 'Highlights', 'Industries', 'Use-cases', 'Backgrounds', 'Contact'] as const;
const HIGHLIGHT_ICONS = ['leaf', 'print', 'factory', 'shield'];
const INDUSTRY_ICONS = ['food', 'retail', 'pharma', 'agri', 'ecom', 'apparel'];
const USECASE_ICONS = ['snacks', 'spices', 'liquids', 'grains', 'frozen', 'dryfoods', 'apparel', 'retail', 'pharma', 'ecom', 'industrial'];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 30);

export default function ContentAdmin() {
 const { content, loading, saving, dirty, status, mutate, save } = useAdminContent();
 const [tab, setTab] = useState<(typeof TABS)[number]>('Hero');

 if (loading || !content) {
 return <div className="min-h-dvh bg-[var(--surface)] p-10 text-[var(--muted-foreground)]">Loading…</div>;
 }

 /* eslint-disable @typescript-eslint/no-explicit-any */
 const pc = content.pageContent as any;
 const contacts = content.contacts as any;
 const stats = content.stats as any[];
 const clients = content.clients as any[];
 const highlights = content.highlights as any[];
 const industries = content.industries as any[];
 const useCases = content.useCases as any[];
 /* eslint-enable @typescript-eslint/no-explicit-any */

 return (
 <div className="min-h-dvh bg-[var(--surface)]">
 <AdminHeader dirty={dirty} saving={saving} status={status} onSave={save} />
 <main className="mx-auto max-w-3xl px-4 py-8">
 <h1 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">Site Content</h1>
 <p className="mt-1 text-[var(--muted-foreground)]">Edit the text and images across the site. Save when done.</p>

 <div className="mt-6 flex flex-wrap gap-2 border-b border-[var(--foreground)] pb-3">
 {TABS.map((t) => (
 <button
 key={t}
 onClick={() => setTab(t)}
 className={` px-4 py-1.5 text-sm font-semibold transition-colors ${tab === t ? 'bg-[var(--brand-red)] text-white' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'}`}
 >
 {t}
 </button>
 ))}
 </div>

 <div className="mt-6 space-y-5 border border-[var(--foreground)] bg-white p-6 ">
 {tab === 'Hero' && (
 <>
 <div>
 <label className="mb-1 block text-sm font-semibold text-[var(--foreground)]">Hero background image <span className="font-normal text-[var(--muted-foreground)]">(cropped to 16:9)</span></label>
 <ImageUpload value={pc.hero.heroImage} aspect={16 / 9} minWidth={1280} onChange={(url) => mutate((c) => { (c.pageContent as any).hero.heroImage = url; })} />
 </div>
 <Field label="Title" value={pc.hero.title} onChange={(v) => mutate((c) => { (c.pageContent as any).hero.title = v; })} />
 <Field label="Subtitle" value={pc.hero.subtitle} onChange={(v) => mutate((c) => { (c.pageContent as any).hero.subtitle = v; })} />
 <StringList label="Paragraphs" items={pc.hero.paragraphs} onChange={(items) => mutate((c) => { (c.pageContent as any).hero.paragraphs = items; })} />
 <div className="grid grid-cols-2 gap-4">
 <Field label="Button text" value={pc.hero.ctaText} onChange={(v) => mutate((c) => { (c.pageContent as any).hero.ctaText = v; })} />
 <Field label="Button link" value={pc.hero.ctaLink} onChange={(v) => mutate((c) => { (c.pageContent as any).hero.ctaLink = v; })} />
 </div>
 </>
 )}

 {tab === 'About' && (
 <>
 <Field label="Heading" value={pc.about.heading} onChange={(v) => mutate((c) => { (c.pageContent as any).about.heading = v; })} />
 <StringList label="Paragraphs" items={pc.about.paragraphs} onChange={(items) => mutate((c) => { (c.pageContent as any).about.paragraphs = items; })} />
 </>
 )}

 {tab === 'History' && (
 <>
 <Field label="Heading" value={pc.history.heading} onChange={(v) => mutate((c) => { (c.pageContent as any).history.heading = v; })} />
 <StringList label="Paragraphs" items={pc.history.paragraphs} onChange={(items) => mutate((c) => { (c.pageContent as any).history.paragraphs = items; })} />
 </>
 )}

 {tab === 'Stats' && (
 <div className="space-y-3">
 {stats.map((s, i) => (
 <div key={i} className="flex items-end gap-3">
 <div className="w-28"><Field label="Value" value={s.value} onChange={(v) => mutate((c) => { (c.stats as any)[i].value = v; })} /></div>
 <div className="flex-1"><Field label="Label" value={s.label} onChange={(v) => mutate((c) => { (c.stats as any)[i].label = v; })} /></div>
 <button onClick={() => mutate((c) => (c.stats as any).splice(i, 1))} className="pb-2 text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.stats as any).push({ value: '', label: '' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add stat</button>
 </div>
 )}

 {tab === 'Clients' && (
 <div className="space-y-3">
 {clients.map((cl, i) => (
 <div key={i} className="flex items-end gap-3">
 <div className="flex-1"><Field label="Client name" value={cl.name} onChange={(v) => mutate((c) => { (c.clients as any)[i].name = v; })} /></div>
 <button onClick={() => mutate((c) => (c.clients as any).splice(i, 1))} className="pb-2 text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.clients as any).push({ name: '', logo: '/clients/client1.png' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add client</button>
 </div>
 )}

 {tab === 'Highlights' && (
 <div className="space-y-5">
 {highlights.map((h, i) => (
 <div key={i} className=" border border-[var(--foreground)] p-4">
 <div className="mb-3 flex items-center justify-between">
 <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Highlight {i + 1}</span>
 <button onClick={() => mutate((c) => (c.highlights as any).splice(i, 1))} className="text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 <div className="space-y-3">
 <Field label="Title" value={h.title} onChange={(v) => mutate((c) => { (c.highlights as any)[i].title = v; })} />
 <Field label="Description" value={h.description} onChange={(v) => mutate((c) => { (c.highlights as any)[i].description = v; })} />
 <label className="block">
 <span className="mb-1 block text-sm font-semibold text-[var(--foreground)]">Icon</span>
 <select className={field} value={h.icon} onChange={(e) => mutate((c) => { (c.highlights as any)[i].icon = e.target.value; })}>
 {HIGHLIGHT_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
 </select>
 </label>
 </div>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.highlights as any).push({ title: '', description: '', icon: 'leaf' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add highlight</button>
 </div>
 )}

 {tab === 'Industries' && (
 <div className="space-y-5">
 <p className="text-xs text-[var(--muted-foreground)]">
 Power the “Industries We Serve” section and the product filters. The <b>key</b> is the internal id used to tag products and in the filter URL — avoid changing it once products use it.
 </p>
 {industries.map((it, i) => (
 <div key={i} className=" border border-[var(--foreground)] p-4">
 <div className="mb-3 flex items-center justify-between">
 <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Industry {i + 1}</span>
 <button onClick={() => mutate((c) => (c.industries as any).splice(i, 1))} className="text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 <div className="grid gap-3 sm:grid-cols-2">
 <Field label="Name" value={it.name} onChange={(v) => mutate((c) => { (c.industries as any)[i].name = v; })} />
 <Field label="Key" value={it.key} onChange={(v) => mutate((c) => { (c.industries as any)[i].key = slug(v); })} />
 </div>
 <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
 <Field label="Description" value={it.description || ''} onChange={(v) => mutate((c) => { (c.industries as any)[i].description = v; })} />
 <label className="block">
 <span className="mb-1 block text-sm font-semibold text-[var(--foreground)]">Icon</span>
 <select className={field} value={it.icon} onChange={(e) => mutate((c) => { (c.industries as any)[i].icon = e.target.value; })}>
 {INDUSTRY_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
 </select>
 </label>
 </div>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.industries as any).push({ key: '', name: '', description: '', icon: 'food' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add industry</button>
 </div>
 )}

 {tab === 'Use-cases' && (
 <div className="space-y-5">
 <p className="text-xs text-[var(--muted-foreground)]">
 The “What are you packaging?” tiles + filters on the Products page. The <b>key</b> is the internal id used to tag products — avoid changing it once products use it.
 </p>
 {useCases.map((it, i) => (
 <div key={i} className=" border border-[var(--foreground)] p-4">
 <div className="mb-3 flex items-center justify-between">
 <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Use-case {i + 1}</span>
 <button onClick={() => mutate((c) => (c.useCases as any).splice(i, 1))} className="text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
 <Field label="Label" value={it.label} onChange={(v) => mutate((c) => { (c.useCases as any)[i].label = v; })} />
 <Field label="Key" value={it.key} onChange={(v) => mutate((c) => { (c.useCases as any)[i].key = slug(v); })} />
 <label className="block">
 <span className="mb-1 block text-sm font-semibold text-[var(--foreground)]">Icon</span>
 <select className={field} value={it.icon} onChange={(e) => mutate((c) => { (c.useCases as any)[i].icon = e.target.value; })}>
 {USECASE_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
 </select>
 </label>
 </div>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.useCases as any).push({ key: '', label: '', icon: 'snacks' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add use-case</button>
 </div>
 )}

 {tab === 'Backgrounds' && (
 <div className="space-y-6">
 <p className="text-xs text-[var(--muted-foreground)]">
 Faded background images behind each section. Leave one as-is to keep the default. Per-category textures on the Products page are auto-chosen from the category name, or set explicitly in the Categories editor.
 </p>
 {Object.keys(BACKGROUND_DEFAULTS).map((key) => (
 <div key={key}>
 <label className="mb-1 block text-sm font-semibold text-[var(--foreground)]">{BACKGROUND_LABELS[key] || key}</label>
 <ImageUpload
 value={content.backgrounds?.[key] || BACKGROUND_DEFAULTS[key]}
 aspect={16 / 9}
 minWidth={1000}
 onChange={(url) => mutate((c) => { c.backgrounds = { ...(c.backgrounds || {}), [key]: url }; })}
 />
 </div>
 ))}
 </div>
 )}

 {tab === 'Contact' && (
 <div className="space-y-6">
 <div className="space-y-3">
 <h3 className="font-bold text-[var(--brand-ink)]">Company</h3>
 <Field label="Location" value={contacts.company.location} onChange={(v) => mutate((c) => { (c.contacts as any).company.location = v; })} />
 <Field label="Phone" value={contacts.company.phone} onChange={(v) => mutate((c) => { (c.contacts as any).company.phone = v; })} />
 <Field label="Email" value={contacts.company.email} onChange={(v) => mutate((c) => { (c.contacts as any).company.email = v; })} />
 <Field label="Address" value={contacts.company.address} onChange={(v) => mutate((c) => { (c.contacts as any).company.address = v; })} />
 <Field label="GSTIN line" value={contacts.company.gstin} onChange={(v) => mutate((c) => { (c.contacts as any).company.gstin = v; })} />
 </div>

 <div className="space-y-3">
 <h3 className="font-bold text-[var(--brand-ink)]">Team</h3>
 <p className="text-xs text-[var(--muted-foreground)]">Photo is loaded from <code>/team/&lt;first-name&gt;.jpeg</code> — to add a photo, drop the file in that folder.</p>
 {contacts.team.map((m: { name: string; email?: string; phone?: string }, i: number) => (
 <div key={i} className=" border border-[var(--foreground)] p-4">
 <div className="mb-3 flex items-center justify-between">
 <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Member {i + 1}</span>
 <button onClick={() => mutate((c) => (c.contacts as any).team.splice(i, 1))} className="text-[var(--muted-foreground)] hover:text-[var(--brand-red)]"><FaTrash size={13} /></button>
 </div>
 <div className="grid gap-3 sm:grid-cols-3">
 <Field label="Name" value={m.name} onChange={(v) => mutate((c) => { (c.contacts as any).team[i].name = v; })} />
 <Field label="Phone" value={m.phone || ''} onChange={(v) => mutate((c) => { (c.contacts as any).team[i].phone = v; })} />
 <Field label="Email" value={m.email || ''} onChange={(v) => mutate((c) => { (c.contacts as any).team[i].email = v; })} />
 </div>
 </div>
 ))}
 <button onClick={() => mutate((c) => (c.contacts as any).team.push({ name: '', phone: '', email: '' }))} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)]"><FaPlus size={11} /> Add member</button>
 </div>
 </div>
 )}
 </div>
 </main>
 </div>
 );
}
