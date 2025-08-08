'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';

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

        // Validation
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
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    company: '',
                    message: '',
                });
            } else {
                const data = await res.json();
                setStatus(data.error || 'Failed to send enquiry. Please try again later.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error sending enquiry. Please try again later.');
        }
    };

    const teamContacts = [
        { name: 'Yomesh Dedhia', email: 'yomesh@gmail.com', phone: '+1 555-123-4567' },
        { name: 'Rashesh Dedhia', email: 'raddedhia@gmail.com', phone: '+1 555-234-5678' },
        { name: 'Dharmesh Dedhia', email: 'dharmesh@gmail.com', phone: '+1 555-345-6789' },
        { name: 'Krishi Dedhia', email: 'krishi@gmail.com', phone: '+1 555-456-7890' },
    ];

    const companyAddress = "Moreshwar Dham CHS, Liberty Garden, Somwari Bazar, Cross Rd Number 3, Malad West, Mumbai-400064";
    const gstin = 'GSTIN: 22AAAAA0000A1Z5';

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Tile 1: Team Contact Details */}
                <div className="border border-gray-200 rounded-lg shadow-md space-y-8">
                    <h2 className="h-15 flex items-center justify-center text-3xl font-semibold text-white bg-[var(--brand-red)] w-full">
                        Contact Details
                    </h2>
                    {teamContacts.map(({ name, email, phone }) => {
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
                                    <p className="flex items-center gap-2 text-gray-700 mb-1">
                                        <FaEnvelope className="text-[var(--brand-red)]" />
                                        <a href={`mailto:${email}`} className="hover:underline">
                                            {email}
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <FaPhone className="text-[var(--brand-red)]" />
                                        <a href={`tel:${phone}`} className="hover:underline">
                                            {phone}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tile 2: Enquiry Form */}
                <div className="bg-[var(--brand-red)] rounded-lg p-8 shadow-md">
                    <h2 className="text-3xl font-semibold text-white mb-6 text-center">Send us an Enquiry</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">
                                Name <span className="text-yellow-300">*</span>
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">
                                Phone Number <span className="text-yellow-300">*</span>
                            </span>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">Company Name</span>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-white font-semibold mb-1">
                                Enquiry <span className="text-yellow-300">*</span>
                            </span>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                required
                                className="bg-white rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                        </label>

                        <button
                            type="submit"
                            className="bg-white text-[var(--brand-red)] font-semibold py-3 rounded hover:bg-gray-100 transition"
                        >
                            Send
                        </button>

                        {status && <p className="mt-2 text-center text-white">{status}</p>}
                    </form>
                </div>

                {/* Tile 3: Address and GSTIN */}
                <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
                    <h3 className="text-2xl font-semibold text-[var(--brand-red)] mb-6 text-center">
                        Company Details
                    </h3>

                    <div className="flex flex-col gap-6">
                        {/* Address */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-red)] text-white flex-shrink-0">
                                <FaMapMarkerAlt size={22} />
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {companyAddress}
                            </p>
                        </div>

                        {/* GSTIN */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-red)] text-white flex-shrink-0">
                                <FaIdCard size={22} />
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {gstin}
                            </p>
                        </div>
                    </div>
                </div>



                {/* Tile 4: Embedded Map */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1753.3609605254364!2d72.83998041894479!3d19.1846756445262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6fac445ad6d%3A0x1a8758a4568eac14!2sMoreshwar%20Dham%20CHS%2C%20Liberty%20Garden%20Cross%20Rd%20Number%203%2C%20Malad%2C%20Navy%20Colony%2C%20Somwari%20Bazar%2C%20Malad%20West%2C%20Mumbai%2C%20Maharashtra%20400064!5e1!3m2!1sen!2sin!4v1754671159121!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        title="Company Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
