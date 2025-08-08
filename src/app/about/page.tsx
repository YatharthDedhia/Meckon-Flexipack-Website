'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
    const team = [
        { name: 'Yomesh Dedhia', email: 'yomesh@gmail.com' },
        { name: 'Rashesh Dedhia', email: 'raddedhia@gmail.com' },
        { name: 'Dharmesh Dedhia', email: 'dharmesh@gmail.com' },
        { name: 'Krishi Dedhia', email: 'krishi@gmail.com' }
    ];

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
                <div className="md:pl-12 max-w-3xl text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 mb-6">
                        About The Company
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Meckon Flexipack has been a leader in the packaging industry for over 35 years,
                        delivering innovative and sustainable packaging solutions worldwide. Specializing in
                        both paper and plastic packaging products such as carry bags, flexible packaging films,
                        and custom printed solutions, we are committed to helping brands enhance their customer
                        experience while reducing environmental impact.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Our team leverages cutting-edge technology and a deep understanding of materials to
                        create packaging that not only looks exceptional but also offers durability and
                        functionality tailored to meet diverse market needs. Sustainability remains at the core
                        of our mission, as we strive to provide eco-friendly alternatives that support a
                        circular economy.
                    </p>
                </div>
            </section>

            {/* History */}
            <section className="bg-white max-w-7xl mx-auto px-4 py-16 md:py-24 border-t border-gray-200">
                <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 items-center justify-center mb-6 text-center md:text-left">
                    Our History
                </h2>
                <p className="text-gray-700 max-w-4xl mx-auto md:mx-0 text-lg leading-relaxed">
                    Founded in the 1980s, Meckon Flexipack started as a small packaging manufacturer and has evolved
                    into a trusted global provider. Through decades of growth, we have continuously adapted to the
                    changing market needs while maintaining the highest standards of quality and innovation.
                </p>
                <p className="text-gray-700 max-w-4xl mx-auto md:mx-0 text-lg leading-relaxed mt-4">
                    From humble beginnings focused on simple plastic bags, we expanded into the paper packaging sector,
                    responding to the growing demand for sustainable packaging options. Our journey reflects our
                    commitment to innovation, customer satisfaction, and environmental stewardship.
                </p>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto px-4 md:py-24 border-t border-gray-200">
                <h2 className="text-4xl font-bold text-white bg-[var(--brand-red)] p-3 text-center md:text-left">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 py-5 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
                    {team.map(({ name, email }) => {
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
                                    alt={`${name} - ${email}`}
                                    width={120}
                                    height={120}
                                    className="mx-auto mb-4 rounded-full object-contain"
                                    loading="lazy"
                                />
                                <h3 className="text-xl font-semibold">{name}</h3>
                                <p>{email}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
