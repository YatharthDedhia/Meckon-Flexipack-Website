import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const content = await getContent();
    const pageContent = content.pageContent as {
        about: { heading: string; paragraphs: string[] };
        history: { heading: string; paragraphs: string[] };
    };
    const contacts = content.contacts as { team: { name: string }[] };

    return (
        <>
            {/* About Company - Image left, text right */}
            <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:items-start gap-12">
                <Reveal className="flex-shrink-0">
                    <div className="rounded-2xl bg-[var(--surface-tint)] p-8">
                        <Image
                            src="/logo.png"
                            alt="Meckon Flexipack Logo"
                            width={260}
                            height={260}
                            className="object-contain"
                            priority
                        />
                    </div>
                </Reveal>
                <Reveal className="md:pl-4 max-w-5xl md:text-left" delay={100}>
                    <SectionHeading kicker="Who We Are" title={pageContent.about.heading} align="left" />
                    <div className="mt-6">
                        {pageContent.about.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-gray-600 max-w-4xl text-lg leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* History */}
            <section className="bg-[var(--surface)] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Reveal>
                        <SectionHeading kicker="Our Journey" title={pageContent.history.heading} align="left" />
                    </Reveal>
                    <div className="mt-6">
                        {pageContent.history.paragraphs.map((paragraph, index) => (
                            <Reveal key={index} delay={index * 80}>
                                <p className="text-gray-600 max-w-4xl text-lg leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team — heading left, members beside it */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid gap-10 md:grid-cols-3 md:items-center">
                    <Reveal>
                        <SectionHeading kicker="The People" title="Meet Our Team" align="left" />
                    </Reveal>
                    {contacts.team.map(({ name }, idx) => {
                        const firstName = name.split(' ')[0].toLowerCase();

                        return (
                            <Reveal key={name} delay={(idx + 1) * 100}>
                                <Link
                                    href="/contact"
                                    className="group block text-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full ring-4 ring-[var(--surface-tint)] transition-all duration-300 group-hover:ring-[var(--brand-red)]">
                                        <Image
                                            src={`/team/${firstName}.jpeg`}
                                            alt={`${name}`}
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--brand-ink)] group-hover:text-[var(--brand-red)] transition-colors">{name}</h3>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
