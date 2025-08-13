'use client';

import { contacts } from '@/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pageContent } from '@/data';

export default function AboutPage() {
    const router = useRouter();

    return (
        <>
            {/* About Company - Image left, text right */}
            <section className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Meckon Flexipack Logo"
                        width={300}
                        height={300}
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="md:pl-12 max-w-5xl md:text-left">
                    <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 items-center justify-center mb-6 md:text-left">
                        {pageContent.about.heading}{' '}
                    </h2>
                    {pageContent.about.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 max-w-4xl mx-auto md:mx-0 text-lg leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* History */}
            <section className="bg-white max-w-7xl mx-auto px-4 py-15 md:py-15 border-t border-gray-200">
                <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 items-center justify-center mb-6 md:text-left">
                    {pageContent.history.heading}{' '}
                </h2>
                {pageContent.history.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 max-w-4xl mx-auto md:mx-0 text-lg leading-relaxed mb-4">
                        {paragraph}
                    </p>
                ))}
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto px-4 md:py-24 border-t border-gray-200">
                <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 md:text-left">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 py-5 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
                    {contacts.team.map(({ name, email, phone }) => {
                        const firstName = name.split(' ')[0].toLowerCase();

                        return (
                            <div
                                key={name}
                                className="text-center p-4 transition-colors duration-300 ease-in-out hover:bg-[var(--brand-red)] hover:text-white cursor-pointer"
                                onClick={() => router.push('/contact')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        router.push('/contact');
                                    }
                                }}
                            >
                                <Image
                                    src={`/team/${firstName}.jpeg`}
                                    alt={`${name}`}
                                    width={200}
                                    height={200}
                                    className="mx-auto mb-4 rounded-full object-contain"
                                    loading="lazy"
                                />
                                <h3 className="text-xl font-semibold">{name}</h3>
                                {/* <p className="text-sm">{email}</p> */}
                                {/* <p className="text-sm">{phone}</p> */}
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
