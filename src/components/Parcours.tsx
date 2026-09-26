import { SectionProps } from "@/components/sectionProps";
import TimeLineItem from "@/components/TimeLineItem";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { education } from "@/data/education";
import { getDictionary } from "@/i18n/dictionaries";
import { tr } from "@/i18n/config";

// Les données sont dans src/data/education.ts
export default function Parcours({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="parcours" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.parcours}/>

                    {/* Ligne verticale de la timeline (dégradé) */}
                    <div className="relative py-4 before:absolute before:top-0 before:bottom-0 before:left-[22px] before:w-0.5 before:bg-[linear-gradient(to_bottom,transparent,var(--color-forest)_10%,var(--color-mist)_50%,var(--color-accent)_90%,transparent)] lg:before:left-[28px]">
                        {education.map((item) => (
                            <TimeLineItem
                                key={item.id}
                                currentLabel={t.timeline.current}
                                item={{
                                    ...item,
                                    year: tr(item.year, lang),
                                    title: tr(item.title, lang),
                                    subtitle: tr(item.subtitle, lang),
                                    description: tr(item.description, lang),
                                    badge: tr(item.badge, lang),
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
