'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import { contacts } from '@/data';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
            setStatus('Please fill in all required fields: Name, Phone, and Enquiry.');
            return;
        }

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
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Team Contacts */}
                <div className="flex flex-col gap-10">
                    <div className="border border-gray-200 rounded-lg shadow-md space-y-8">
                        <h2 className="h-15 flex items-center justify-center text-3xl font-semibold text-white bg-[var(--brand-red)] w-full">
                            Contact Details
                        </h2>
                        {contacts.team.map(({ name, phone }) => {
                            const firstName = name.split(' ')[0].toLowerCase();
                            return (
                                <div key={name} className="flex m-15 items-center gap-4">
                                    <Image
                                        src={`/team/${firstName}.jpeg`}
                                        alt={name}
                                        width={70}
                                        height={70}
                                        className="rounded-full object-cover flex-shrink-0"
                                        loading="lazy"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--brand-red)]">{name}</h3>
                                        <p className="flex items-center gap-2 text-gray-700">
                                            <FaPhone className="text-[var(--brand-red)]" />
                                            <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Company Details */}
                    <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
                        <h3 className="text-2xl font-semibold text-[var(--brand-red)] mb-6 text-center">
                            Company Details
                        </h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-red)] text-white flex-shrink-0">
                                    <FaMapMarkerAlt size={22} />
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">{contacts.company.address}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-red)] text-white flex-shrink-0">
                                    <FaIdCard size={22} />
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">{contacts.company.gstin}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enquiry Form */}
                <div className="bg-[var(--brand-red)] rounded-lg p-8 shadow-md">
                    <h2 className="text-3xl font-semibold text-white mb-6 text-center">Send us an Enquiry</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Name <span className="text-yellow-300">*</span></span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
                        </label>
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Phone Number <span className="text-yellow-300">*</span></span>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
                        </label>
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Email</span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
                        </label>
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Company</span>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
                        </label>
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Enquiry <span className="text-yellow-300">*</span></span>
                            <textarea name="message" value={formData.message} onChange={handleChange} rows={5} required className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"></textarea>
                        </label>
                        <button type="submit" className="bg-yellow-300 text-black py-3 rounded font-semibold hover:bg-yellow-400 transition-colors">
                            Send Enquiry
                        </button>
                        {status && <p className="text-white text-center mt-2">{status}</p>}
                    </form>
                </div>

            </div>
        </div>
    );
}
