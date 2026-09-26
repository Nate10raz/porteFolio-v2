import { SectionProps } from "@/components/sectionProps";
import Image from "next/image";
import { site } from "@/data/site";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { getDictionary } from "@/i18n/dictionaries";

export default function About({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="about" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    {/* Section header */}
                    <SectionHeader number={number} title={t.sections.about}/>

                    <div className="mt-12 flex flex-col items-center gap-10 lg:flex-row">
                        {/* Photo */}
                        <div className="w-full lg:w-5/12">
                            <div className="relative mb-8">
                                <div className="absolute -top-5 -left-5 right-5 bottom-5 rounded-[20px] bg-linear-to-br from-forest to-deep opacity-30"></div>

                                <div className="group relative h-80 overflow-hidden rounded-[20px] border-2 border-mist bg-linear-to-br from-deep to-forest p-0 transition-all duration-[400ms] ease-in-out hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(44,93,102,0.3)]">
                                    <Image
                                        src={site.photo}
                                        alt="Razafindrakoto Zo Nantenaina"
                                        fill
                                        sizes="(min-width: 1024px) 420px, 100vw"
                                        className="rounded-[18px] object-cover object-center brightness-95 grayscale-[15%] transition-all duration-500 ease-in-out group-hover:scale-[1.03] group-hover:brightness-100 group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Texte */}
                        <div className="w-full lg:w-7/12">
                            <div className="py-4">
                                {t.about.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mb-[1.2rem] text-[1.1rem] text-text-muted">
                                        {paragraph}
                                    </p>
                                ))}


                                {/* Langues */}
                                <div className="mt-10 rounded-2xl border border-forest bg-[rgba(11,50,56,0.3)] p-8">
                                    <h4 className="mb-6 flex items-center gap-[0.6rem] font-sans text-base font-semibold uppercase tracking-[2px] text-mist">
                                        <i className="bi bi-translate text-[1.1rem] text-accent"></i>
                                        {t.about.languagesTitle}
                                    </h4>

                                    <div className="flex flex-col gap-[1.2rem]">
                                        {t.about.languages.map((language) => (
                                            <div
                                                key={language.name}
                                                className="group flex items-center justify-between gap-4"
                                            >
                                                <div className="flex min-w-[120px] flex-col gap-[0.2rem]">
                          <span className="font-sans text-base font-semibold text-fog">
                            {language.name}
                          </span>
                                                    <span className="font-sans text-[0.78rem] uppercase tracking-[1px] text-text-muted">
                            {language.level}
                          </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {Array.from({ length: 5 }).map((_, index) => {
                                                        const isFilled = index < language.filled;
                                                        return (
                                                            <span
                                                                key={index}
                                                                className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                                                                    isFilled
                                                                        ? 'border-accent bg-accent shadow-[0_0_8px_rgba(93,211,158,0.4)] group-hover:shadow-[0_0_14px_rgba(93,211,158,0.7)]'
                                                                        : 'border-forest bg-transparent'
                                                                }`}
                                                            ></span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}