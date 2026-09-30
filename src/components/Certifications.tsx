import Image from "next/image";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/certifications";
import { SectionProps } from "@/components/sectionProps";
import { getDictionary } from "@/i18n/dictionaries";
import { tr } from "@/i18n/config";

// Les données sont dans src/data/certifications.ts
export default function Certifications({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="certifications" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.certifications}/>

                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        {certifications.map((certification, index) => (
                            <Reveal key={certification.id} delay={index * 0.1} className="h-full">
                                <article className="group flex h-full flex-col rounded-[20px] border-2 border-forest bg-deep/40 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_rgba(44,93,102,0.2)]">
                                    {/* Vignette du justificatif : s'ouvre en grand dans un nouvel onglet */}
                                    {certification.document && (
                                        <a
                                            href={certification.document}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${t.certifications.viewDocument} — ${tr(certification.name, lang)}`}
                                            className="relative mb-6 block aspect-[735/540] overflow-hidden rounded-xl border border-forest bg-white"
                                        >
                                            <Image
                                                src={certification.document}
                                                alt={`${t.certifications.viewDocument} — ${tr(certification.name, lang)}`}
                                                fill
                                                sizes="(min-width: 768px) 450px, 100vw"
                                                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-abyss/85 px-3 py-1 font-sans text-[0.75rem] font-semibold text-fog opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <i className="bi bi-zoom-in text-accent"></i> {t.certifications.viewDocument}
                                            </span>
                                        </a>
                                    )}

                                    <div className="flex flex-1 gap-5">
                                    {certification.badge ? (
                                        <Image
                                            src={certification.badge}
                                            alt={`${t.certifications.badge} ${tr(certification.name, lang)}`}
                                            width={64}
                                            height={64}
                                            className="size-16 shrink-0 object-contain"
                                        />
                                    ) : (
                                        <div className="flex size-16 shrink-0 items-center justify-center rounded-[15px] border-2 border-mist bg-linear-135 from-forest to-deep">
                                            <i className={`bi ${certification.kind === 'certification' ? 'bi-patch-check-fill' : 'bi-mortarboard-fill'} text-[1.7rem] text-accent`}></i>
                                        </div>
                                    )}

                                    <div className="flex flex-1 flex-col">
                                        <span className="mb-2 self-start rounded-full border border-forest bg-forest/40 px-3 py-0.5 font-sans text-[0.7rem] font-semibold tracking-[1px] text-mist uppercase">
                                            {certification.kind === 'certification' ? t.certifications.certification : t.certifications.formation}
                                        </span>
                                        <h3 className="mb-1 font-sans text-[1.15rem] font-semibold text-fog">{tr(certification.name, lang)}</h3>
                                        <p className="mb-4 font-sans text-[0.9rem] text-text-muted">
                                            {certification.issuer} · {tr(certification.date, lang)}
                                        </p>

                                        {certification.skills && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {certification.skills.map((skill) => tr(skill, lang)).map((skill) => (
                                                    <span key={skill} className="rounded-full border border-forest px-3 py-0.5 font-sans text-[0.75rem] text-mist">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {certification.credentialUrl && (
                                            <a
                                                href={certification.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-auto inline-flex items-center gap-2 self-start font-sans text-[0.85rem] font-semibold text-accent hover:underline"
                                            >
                                                <i className="bi bi-shield-check"></i> {t.certifications.verify}
                                            </a>
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
