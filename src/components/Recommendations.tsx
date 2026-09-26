import Image from "next/image";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { recommendations } from "@/data/recommendations";
import { SectionProps } from "@/components/sectionProps";
import { getDictionary } from "@/i18n/dictionaries";
import { tr } from "@/i18n/config";

function initials(name: string) {
    return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

// Les données sont dans src/data/recommendations.ts
export default function Recommendations({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="recommandations" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.recommendations}/>

                    <div className={`mt-12 grid gap-8 ${recommendations.length > 1 ? 'md:grid-cols-2' : ''}`}>
                        {recommendations.map((recommendation, index) => (
                            <Reveal key={recommendation.id} delay={index * 0.15} className="h-full">
                                <figure className="relative flex h-full flex-col rounded-[20px] border-2 border-forest bg-linear-135 from-deep/60 to-abyss/80 p-8 sm:p-10">
                                    <i className="bi bi-quote absolute top-4 right-6 text-[4rem] leading-none text-forest opacity-50" aria-hidden="true"></i>

                                    <blockquote className="relative mb-8 flex-1 text-[1.2rem] leading-[1.8] text-text-light/90 italic">
                                        {lang === 'fr' ? '« ' : '“'}{tr(recommendation.quote, lang)}{lang === 'fr' ? ' »' : '”'}
                                    </blockquote>

                                    <figcaption className="flex items-center gap-4">
                                        {recommendation.photo ? (
                                            <Image
                                                src={recommendation.photo}
                                                alt={recommendation.author}
                                                width={56}
                                                height={56}
                                                className="size-14 rounded-full border-2 border-mist object-cover"
                                            />
                                        ) : (
                                            <span className="flex size-14 items-center justify-center rounded-full border-2 border-mist bg-linear-135 from-forest to-deep font-display font-bold text-fog">
                                                {initials(recommendation.author)}
                                            </span>
                                        )}
                                        <div>
                                            <p className="font-sans font-semibold text-fog">
                                                {recommendation.author}
                                                {recommendation.linkedin && (
                                                    <a
                                                        href={recommendation.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`${t.recommendations.linkedinOf} ${recommendation.author}`}
                                                        className="ml-2 text-accent hover:text-fog"
                                                    >
                                                        <i className="bi bi-linkedin"></i>
                                                    </a>
                                                )}
                                            </p>
                                            <p className="font-sans text-[0.85rem] text-text-muted">
                                                {tr(recommendation.role, lang)} · {recommendation.organization}
                                            </p>
                                        </div>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
