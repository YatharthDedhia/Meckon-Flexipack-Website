'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPaperPlane } from 'react-icons/fa';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

const inputClasses =
  'h-12 md:h-13 border border-white/25 bg-transparent px-4 text-base text-white placeholder-white/40 outline-none transition-colors focus:border-[var(--accent)]';
const textareaClasses =
  'border border-white/25 bg-transparent px-4 py-3 text-base text-white placeholder-white/40 outline-none transition-colors focus:border-[var(--accent)]';

type Contacts = {
  company: { address?: string; phone?: string; email?: string; gstin?: string };
  team: { name: string; phone?: string; email?: string }[];
};

export default function ContactClient({ contacts }: { contacts: Contacts }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in ${product}. Please share details, sizes and pricing.`,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus('Please fill in all required fields: Name, Phone, and Enquiry.');
      return;
    }
    const email = formData.email.trim();
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('Please enter a valid email address, or leave it blank.');
      return;
    }
    setSending(true);
    setStatus('Sending...');
    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Enquiry sent successfully!');
        setFormData({ name: '', phone: '', email: '', company: '', message: '' });
      } else {
        const data = await res.json();
        setStatus(data.error || 'Failed to send enquiry. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error sending enquiry. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <Reveal className="mb-4">
        <SectionHeading as="h1" num="01" kicker="Get In Touch" title="Contact us." align="left" />
      </Reveal>
      <Reveal delay={80} className="mb-14">
        <p className="max-w-2xl text-base md:text-lg leading-relaxed text-[var(--muted-foreground)]">
          Have a packaging requirement or a custom enquiry? Send us a message and our team will get back to you shortly.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px border-2 border-[var(--foreground)] bg-[var(--border)] items-stretch">
        {/* Enquiry Form — inverted panel */}
        <Reveal>
          <div className="h-full bg-[var(--foreground)] p-8 md:p-12">
            <span className="kicker text-[var(--accent)]">Enquiry</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-white">Send us a message</h2>
            <p className="text-mono mt-3 mb-8 text-[11px] uppercase tracking-wider text-white/40">
              Fields marked <span className="text-[var(--accent)]">*</span> are required
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="flex flex-col">
                  <span className="text-mono mb-2 text-[11px] uppercase tracking-wider text-white/60">Name *</span>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={inputClasses} />
                </label>
                <label className="flex flex-col">
                  <span className="text-mono mb-2 text-[11px] uppercase tracking-wider text-white/60">Phone *</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className={inputClasses} />
                </label>
                <label className="flex flex-col">
                  <span className="text-mono mb-2 text-[11px] uppercase tracking-wider text-white/60">Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClasses} />
                </label>
                <label className="flex flex-col">
                  <span className="text-mono mb-2 text-[11px] uppercase tracking-wider text-white/60">Company</span>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className={inputClasses} />
                </label>
              </div>
              <label className="flex flex-col">
                <span className="text-mono mb-2 text-[11px] uppercase tracking-wider text-white/60">Enquiry *</span>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us what you need — product, quantity, specifications..." required className={textareaClasses}></textarea>
              </label>
              <button type="submit" disabled={sending} className="btn-solid mt-2 self-start disabled:opacity-60">
                <FaPaperPlane size={13} />
                {sending ? 'Sending…' : 'Send Enquiry'}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-mono border border-white/20 px-4 py-3 text-[11px] uppercase tracking-wider text-white/80 ${status ? '' : 'sr-only'}`}
              >
                {status}
              </p>
            </form>
          </div>
        </Reveal>

        {/* Right column: Team + Company in one panel */}
        <Reveal delay={100}>
          <div className="h-full bg-[var(--background)] p-8 md:p-12">
            <span className="kicker">Talk To Us</span>
            <h2 className="mt-4 mb-8 font-display text-3xl md:text-4xl text-[var(--foreground)]">Speak to our team</h2>
            <div className="flex flex-col">
              {contacts.team.map(({ name, phone, email }) => {
                const firstName = name.split(' ')[0].toLowerCase();
                return (
                  <div key={name} className="flex items-center justify-between gap-5 border-t border-[var(--border)] py-5">
                    <div className="flex min-w-0 items-center gap-5">
                      <Image
                        src={`/team/${firstName}.jpeg`}
                        alt={name}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover border-2 border-[var(--foreground)] flex-shrink-0"
                        loading="lazy"
                      />
                      <h3 className="font-display text-xl text-[var(--foreground)]">{name}</h3>
                    </div>
                    <div className="text-right">
                      {phone && (
                        <a href={`tel:${phone}`} className="text-mono block text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]">
                          {phone}
                        </a>
                      )}
                      {email && (
                        <a href={`mailto:${email}`} className="text-mono block break-all text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]">
                          {email}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <span className="kicker mt-10 block">Visit / Reach Us</span>
            <dl className="mt-5 border-t border-[var(--border)]">
              {contacts.company.address && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4">
                  <dt className="text-mono w-28 flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">Address</dt>
                  <dd className="text-sm leading-relaxed text-right text-[var(--foreground)]">
                    <a href="https://maps.app.goo.gl/4cFg6ZwCo3zQYXcc9" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                      {contacts.company.address}
                    </a>
                  </dd>
                </div>
              )}
              {contacts.company.phone && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4">
                  <dt className="text-mono w-28 flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">Phone</dt>
                  <dd className="text-sm text-right text-[var(--foreground)]">
                    <a href={`tel:${contacts.company.phone}`} className="hover:text-[var(--accent)] transition-colors">{contacts.company.phone}</a>
                  </dd>
                </div>
              )}
              {contacts.company.email && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4">
                  <dt className="text-mono w-28 flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">Email</dt>
                  <dd className="break-all text-sm text-right text-[var(--foreground)]">
                    <a href={`mailto:${contacts.company.email}`} className="hover:text-[var(--accent)] transition-colors">{contacts.company.email}</a>
                  </dd>
                </div>
              )}
              {contacts.company.gstin && (
                <div className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4">
                  <dt className="text-mono w-28 flex-shrink-0 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">GSTIN</dt>
                  <dd className="text-sm text-right text-[var(--foreground)]">{contacts.company.gstin}</dd>
                </div>
              )}
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
