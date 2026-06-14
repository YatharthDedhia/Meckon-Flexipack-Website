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
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-start gap-12 md:gap-16">
                <Reveal className="flex-shrink-0">
                    <div className="border border-[var(--border)] bg-[var(--surface)] p-10">
                        <Image
                            src="/logo.png"
                            alt="Meckon Flexipack Logo"
                            width={240}
                            height={240}
                            className="object-contain"
                            priority
                        />
                    </div>
                </Reveal>
                <Reveal className="max-w-3xl" delay={100}>
                    <SectionHeading kicker="Who We Are" title={pageContent.about.heading} align="left" />
                    <div className="mt-7">
                        {pageContent.about.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* History */}
            <section className="bg-[var(--surface)] py-20 md:py-28 border-y border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <SectionHeading kicker="Our Journey" title={pageContent.history.heading} align="left" />
                    </Reveal>
                    <div className="mt-7 max-w-3xl">
                        {pageContent.history.paragraphs.map((paragraph, index) => (
                            <Reveal key={index} delay={index * 80}>
                                <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team — heading left, members beside it */}
            <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
                <div className="grid gap-px bg-[var(--border)] border border-[var(--border)] md:grid-cols-3">
                    <Reveal>
                        <div className="h-full bg-[var(--background)] p-8 md:p-10">
                            <SectionHeading kicker="The People" title="Meet our team." align="left" />
                        </div>
                    </Reveal>
                    {contacts.team.map(({ name }, idx) => {
                        const firstName = name.split(' ')[0].toLowerCase();

                        return (
                            <Reveal key={name} delay={(idx + 1) * 100}>
                                <Link
                                    href="/contact"
                                    className="group flex h-full flex-col bg-[var(--background)] p-8 md:p-10 transition-colors duration-200 hover:bg-[var(--muted)]"
                                >
                                    <div className="mb-5 h-40 w-full overflow-hidden">
                                        <Image
                                            src={`/team/${firstName}.jpeg`}
                                            alt={`${name}`}
                                            width={300}
                                            height={300}
                                            className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="text-mono text-xs text-[var(--accent)]">{String(idx + 1).padStart(2, '0')}</span>
                                    <h3 className="mt-2 font-display text-2xl text-[var(--foreground)]">{name}</h3>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
