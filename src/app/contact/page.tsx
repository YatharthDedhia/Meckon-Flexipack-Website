'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaPaperPlane } from 'react-icons/fa';
import { contacts } from '@/data';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

const inputClasses =
    'rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none ring-2 ring-transparent transition focus:ring-white';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
    });

    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    // Prefill the enquiry when arriving from a product's "Enquire" button
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
            setStatus('Please fill in all required fields: Name, Phone, and Enquiry.');
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
        <div className="max-w-7xl mx-auto px-4 py-16">
            <Reveal className="mb-4">
                <SectionHeading kicker="Get In Touch" title="Contact Us" />
            </Reveal>
            <Reveal delay={80} className="mb-14">
                <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-500">
                    Have a packaging requirement or a custom enquiry? Send us a message and our team
                    will get back to you shortly.
                </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Enquiry Form */}
                <Reveal>
                    <div className="bg-[var(--brand-red)] rounded-2xl p-8 md:p-10 shadow-xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Send us an Enquiry</h2>
                        <p className="text-white/70 mb-8 text-sm">Fields marked <span className="text-white">*</span> are required.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <label className="flex flex-col">
                                    <span className="text-white font-semibold mb-2 text-sm">Name <span className="text-white/80">*</span></span>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={inputClasses} />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-white font-semibold mb-2 text-sm">Phone Number <span className="text-white/80">*</span></span>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className={inputClasses} />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-white font-semibold mb-2 text-sm">Email</span>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClasses} />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-white font-semibold mb-2 text-sm">Company</span>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className={inputClasses} />
                                </label>
                            </div>
                            <label className="flex flex-col">
                                <span className="text-white font-semibold mb-2 text-sm">Enquiry <span className="text-white/80">*</span></span>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us what you need — product, quantity, specifications..." required className={inputClasses}></textarea>
                            </label>
                            <button
                                type="submit"
                                disabled={sending}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-[var(--brand-red)] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                <FaPaperPlane size={15} />
                                {sending ? 'Sending...' : 'Send Enquiry'}
                            </button>
                            {status && (
                                <p className="rounded-lg bg-white/15 px-4 py-2 text-center text-sm text-white">{status}</p>
                            )}
                        </form>
                    </div>
                </Reveal>

                {/* Right column: Team + Company */}
                <div className="flex flex-col gap-8">
                    {/* Team Contacts */}
                    <Reveal delay={100}>
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                            <SectionHeading kicker="Talk To Us" title="Contact Details" align="left" className="mb-8" />
                            <div className="flex flex-col gap-6">
                                {contacts.team.map(({ name, phone, email }) => {
                                    const firstName = name.split(' ')[0].toLowerCase();
                                    return (
                                        <div key={name} className="flex items-center gap-4">
                                            <Image
                                                src={`/team/${firstName}.jpeg`}
                                                alt={name}
                                                width={64}
                                                height={64}
                                                className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--surface-tint)] flex-shrink-0"
                                                loading="lazy"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-[var(--brand-ink)]">{name}</h3>
                                                <a href={`tel:${phone}`} className="flex items-center gap-2 text-gray-600 hover:text-[var(--brand-red)] transition-colors">
                                                    <FaPhone className="text-[var(--brand-red)] text-sm" />
                                                    {phone}
                                                </a>
                                                {email && (
                                                    <a href={`mailto:${email}`} className="flex items-center gap-2 text-gray-600 hover:text-[var(--brand-red)] transition-colors break-all">
                                                        <FaEnvelope className="text-[var(--brand-red)] text-sm" />
                                                        {email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>

                    {/* Company Details */}
                    <Reveal delay={180}>
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                            <SectionHeading kicker="Visit / Reach Us" title="Company Details" align="left" className="mb-8" />
                            <div className="flex flex-col gap-5">
                                <a
                                    href="https://maps.app.goo.gl/4cFg6ZwCo3zQYXcc9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)] flex-shrink-0 transition-colors group-hover:bg-[var(--brand-red)] group-hover:text-white">
                                        <FaMapMarkerAlt size={18} />
                                    </div>
                                    <p className="text-gray-600 leading-relaxed group-hover:text-[var(--brand-red)] transition-colors">
                                        {contacts.company.address}
                                    </p>
                                </a>
                                <a href={`tel:${contacts.company.phone}`} className="group flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)] flex-shrink-0 transition-colors group-hover:bg-[var(--brand-red)] group-hover:text-white">
                                        <FaPhone size={18} />
                                    </div>
                                    <p className="text-gray-600 group-hover:text-[var(--brand-red)] transition-colors">{contacts.company.phone}</p>
                                </a>
                                <a href={`mailto:${contacts.company.email}`} className="group flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)] flex-shrink-0 transition-colors group-hover:bg-[var(--brand-red)] group-hover:text-white">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <p className="text-gray-600 break-all group-hover:text-[var(--brand-red)] transition-colors">{contacts.company.email}</p>
                                </a>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-tint)] text-[var(--brand-red)] flex-shrink-0">
                                        <FaIdCard size={18} />
                                    </div>
                                    <p className="text-gray-600">{contacts.company.gstin}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
