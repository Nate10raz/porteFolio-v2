'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { Locale, tr } from '@/i18n/config';
import { fill, type Dictionary } from '@/i18n/dictionaries';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';

// Liste des projets avec filtre par technologie : un clic sur un badge
// n'affiche que les projets qui l'utilisent, un second clic retire le filtre.
export default function ProjectList({ lang, labels }: { lang: Locale; labels: Dictionary['projects'] }) {
    const [activeTech, setActiveTech] = useState<string | null>(null);

    const visibleProjects = activeTech
        ? projects.filter((project) => project.tech.some((tech) => tr(tech, lang) === activeTech))
        : projects;

    function toggleTech(tech: string) {
        setActiveTech((current) => (current === tech ? null : tech));
    }

    const count = visibleProjects.length;
    const [featured, ...others] = visibleProjects;

    return (
        <div className="mt-12">
            <p className="mb-8 font-sans text-[0.9rem] text-text-muted" aria-live="polite">
                {activeTech ? (
                    <>
                        {fill(count > 1 ? labels.filterResultMany : labels.filterResultOne, { count })}{' '}
                        <span className="font-semibold text-accent">{activeTech}</span>
                        <button
                            type="button"
                            onClick={() => setActiveTech(null)}
                            className="ml-3 inline-flex cursor-pointer items-center gap-1 rounded-full border border-forest px-3 py-0.5 text-[0.8rem] text-fog transition-colors hover:border-accent hover:text-accent"
                        >
                            <i className="bi bi-x-lg"></i> {labels.showAll}
                        </button>
                    </>
                ) : (
                    <>
                        <i className="bi bi-funnel mr-1 text-accent"></i>
                        {labels.filterHint}
                    </>
                )}
            </p>

            {/* Le premier projet (visible) est mis en avant, les suivants en grille */}
            {featured && (
                <Reveal key={featured.id} className="mb-8">
                    <ProjectCard
                        project={featured}
                        lang={lang}
                        labels={labels}
                        variant="featured"
                        activeTech={activeTech}
                        onTechClick={toggleTech}
                    />
                </Reveal>
            )}

            {others.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2">
                    {others.map((project, index) => (
                        <Reveal key={project.id} delay={index * 0.15} className="h-full">
                            <ProjectCard
                                project={project}
                                lang={lang}
                                labels={labels}
                                activeTech={activeTech}
                                onTechClick={toggleTech}
                            />
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}
