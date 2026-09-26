import { SectionProps } from "@/components/sectionProps";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/experiences";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, tr } from "@/i18n/config";

// Les données sont dans src/data/experiences.ts
export default function Experience({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="experience" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.experience}/>

                    <div className="mt-12 space-y-10">
                        {experiences.map((experience, index) => (
                            <Reveal key={experience.id} delay={index * 0.15}>
                                <article className="group relative overflow-hidden rounded-[20px] border-2 border-forest bg-linear-135 from-deep/60 to-abyss/80 px-6 py-8 transition-all duration-400 ease-in-out hover:border-accent hover:shadow-[0_20px_50px_rgba(44,93,102,0.2)] sm:p-10">
                                    <div className="flex flex-col gap-6 sm:flex-row">
                                        {/* Pastille entreprise */}
                                        <div className="flex size-16 shrink-0 items-center justify-center rounded-[15px] border-2 border-mist bg-linear-135 from-forest to-deep transition-transform duration-300 group-hover:scale-105">
                                            <i className="bi bi-briefcase-fill text-[1.7rem] text-accent"></i>
                                        </div>

                                        <div className="flex-1">
                                            <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                                                <div>
                                                    <h3 className="font-display text-[1.5rem] font-bold text-fog">
                                                        {tr(experience.role, lang)}
                                                    </h3>
                                                    <p className="font-sans text-[1.05rem] font-semibold text-accent">
                                                        {experience.company}
                                                        {experience.location && (
                                                            <span className="font-normal text-text-muted"> · {tr(experience.location, lang)}</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
                                                    <span className="font-sans text-[0.85rem] font-semibold tracking-[1.5px] text-mist uppercase">
                                                        <i className="bi bi-calendar3 mr-2 text-accent"></i>{tr(experience.period, lang)}
                                                    </span>
                                                    <span className="rounded-[20px] border border-forest bg-forest/40 px-[0.9rem] py-[0.3rem] font-sans text-xs font-semibold tracking-[1px] text-mist uppercase">
                                                        {tr(experience.contractType, lang)}
                                                    </span>
                                                </div>
                                            </div>

                                            <ul className="mb-6 space-y-2">
                                                {experience.missions.map((mission) => tr(mission, lang)).map((mission) => (
                                                    <li key={mission} className="flex gap-3 text-[1.05rem] leading-[1.8] text-text-muted">
                                                        <i className="bi bi-chevron-right mt-1 text-accent"></i>
                                                        <span>{mission}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mb-6 flex flex-wrap gap-[0.8rem]">
                                                {experience.tech.map((tech) => tr(tech, lang)).map((tech) => <TechBadge key={tech} name={tech}/>)}
                                            </div>

                                            {experience.projectSlug && (
                                                <Link
                                                    href={localePath(lang, `/projets/${experience.projectSlug}`)}
                                                    className="inline-flex items-center gap-2 rounded-[20px] border border-accent bg-accent/10 px-[1.2rem] py-2 font-sans text-[0.85rem] font-semibold text-accent transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_12px_rgba(93,211,158,0.3)]"
                                                >
                                                    {t.experience.seeProject} <i className="bi bi-arrow-right"></i>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
