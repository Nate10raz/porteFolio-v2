import { SectionProps } from "@/components/sectionProps";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import SkillCategory from "@/components/SkillCategory";
import Reveal from "@/components/Reveal";
import { skillCategories } from "@/data/skills";
import { getDictionary } from "@/i18n/dictionaries";
import { tr } from "@/i18n/config";

// Les données sont dans src/data/skills.ts
export default function Skills({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="skills" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.skills}/>

                    <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
                        {skillCategories.map((category, index) => (
                            <Reveal key={category.id} delay={index * 0.1} className="h-full">
                                <SkillCategory
                                    icon={category.icon}
                                    title={tr(category.title, lang)}
                                    skills={category.skills.map((skill) => tr(skill, lang))}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
