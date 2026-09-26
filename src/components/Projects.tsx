import { SectionProps } from "@/components/sectionProps";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ProjectList from "@/components/ProjectList";
import { getDictionary } from "@/i18n/dictionaries";

// Les données des projets sont dans src/data/projects.tsx
export default function Projects({ number, dark, lang }: SectionProps) {
    const t = getDictionary(lang);

    return (
        <Section id="projects" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.projects}/>
                    <ProjectList lang={lang} labels={t.projects}/>
                </div>
            </div>
        </Section>
    );
}
