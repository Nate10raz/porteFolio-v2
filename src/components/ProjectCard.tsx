'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Locale, localePath, tr } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import TechBadge from "@/components/TechBadge";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectStats from "@/components/ProjectStats";

// Nombre de technologies affichées sur une carte (le reste derrière "+N")
const MAX_TECH = 5;

// Carte projet de l'accueil.
//  - "featured" : grande carte pleine largeur (projet phare), image à droite si `cover`
//  - "compact"  : carte de la grille 2 colonnes
export default function ProjectCard({
                                        project,
                                        lang,
                                        labels,
                                        variant = 'compact',
                                        activeTech,
                                        onTechClick,
                                    }: {
    project: Project;
    lang: Locale;
    labels: Dictionary['projects'];
    variant?: 'featured' | 'compact';
    activeTech?: string | null;
    onTechClick?: (tech: string) => void;
}) {
    const [showAllTech, setShowAllTech] = useState(false);

    const isFeatured = variant === 'featured';
    const href = localePath(lang, `/projets/${project.slug}`);
    const tech = project.tech.map((item) => tr(item, lang));
    // Si la techno filtrée fait partie des technos masquées, on déplie la liste
    const expanded = showAllTech || (activeTech ? tech.indexOf(activeTech) >= MAX_TECH : false);
    const visibleTech = expanded ? tech : tech.slice(0, MAX_TECH);
    const hiddenCount = tech.length - visibleTech.length;

    return (
        <article className="group h-full">
            <div
                className={`
                    relative flex h-full flex-col overflow-hidden rounded-[20px] border-2
                    transition-all duration-400 ease-in-out
                    group-hover:border-accent
                    before:absolute before:top-0 before:-left-full before:size-full
                    before:bg-linear-to-r before:from-transparent before:via-accent/10 before:to-transparent
                    before:transition-[left] before:duration-800 group-hover:before:left-full
                    ${isFeatured
                        ? 'border-mist/50 bg-linear-135 from-forest/40 via-deep/70 to-abyss/90 px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] group-hover:shadow-[0_25px_70px_rgba(44,93,102,0.35)] sm:p-12'
                        : 'border-forest bg-linear-135 from-deep/60 to-abyss/80 p-7 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(44,93,102,0.2)] sm:p-8'}
                `}
            >
                {/* Grand numéro décoratif (masqué sur une carte compacte avec image, où il passerait derrière) */}
                {(isFeatured || !project.cover) && (
                    <div className={`pointer-events-none absolute font-display leading-none font-bold text-forest opacity-30 ${isFeatured ? 'top-4 right-6 text-6xl sm:top-6 sm:right-10 sm:text-[6rem]' : 'top-4 right-5 text-5xl'}`}>
                        {String(project.id).padStart(2, '0')}
                    </div>
                )}

                <div className={`relative z-2 flex flex-1 flex-col ${isFeatured && project.cover ? 'gap-10 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center' : ''}`}>
                    <div className="flex flex-1 flex-col">
                        {isFeatured && (
                            <span className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-sans text-[0.75rem] font-semibold tracking-[1px] text-accent uppercase">
                                <i className="bi bi-star-fill"></i> {labels.featured}
                            </span>
                        )}

                        {/* Image en haut pour les cartes compactes */}
                        {!isFeatured && project.cover && (
                            <Link href={href} className="relative mb-6 block aspect-video overflow-hidden rounded-xl border border-forest">
                                <Image
                                    src={project.cover.src}
                                    alt={tr(project.cover.alt, lang)}
                                    fill
                                    sizes="(min-width: 768px) 450px, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </Link>
                        )}

                        <h3 className={`mb-2 font-display ${isFeatured || !project.cover ? 'pr-14' : ''} font-bold text-fog ${isFeatured ? 'text-[clamp(1.6rem,3vw,2.2rem)]' : 'text-[1.4rem]'}`}>
                            {tr(project.title, lang)}
                        </h3>
                        <p className={`font-sans text-[0.85rem] tracking-[1.5px] text-accent uppercase ${isFeatured ? 'mb-6' : 'mb-4'}`}>
                            {tr(project.type, lang)}
                        </p>
                        <p className={`leading-[1.8] text-text-muted ${isFeatured ? 'mb-8 text-[1.15rem]' : 'mb-6 text-[1.05rem]'}`}>
                            {tr(project.description, lang)}
                        </p>

                        {/* Chiffres clés : seulement sur la carte phare (les cartes compactes restent de hauteur comparable) */}
                        {isFeatured && project.stats && (
                            <ProjectStats
                                stats={project.stats.slice(0, 3).map((stat) => ({ value: tr(stat.value, lang), label: tr(stat.label, lang) }))}
                                className="mb-8"
                            />
                        )}

                        <div className="mb-6 flex flex-wrap gap-[0.6rem]">
                            {visibleTech.map((item) => (
                                <TechBadge
                                    key={item}
                                    name={item}
                                    active={item === activeTech}
                                    onClick={onTechClick}
                                    title={item === activeTech ? labels.removeFilter : fill(labels.filterBy, { tech: item })}
                                />
                            ))}
                            {hiddenCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllTech(true)}
                                    title={fill(labels.moreTech, { count: hiddenCount })}
                                    aria-label={fill(labels.moreTech, { count: hiddenCount })}
                                    className="cursor-pointer rounded-[20px] border border-dashed border-mist/60 px-[1rem] py-2 font-sans text-[0.85rem] font-medium text-mist transition-colors hover:border-accent hover:text-accent"
                                >
                                    +{hiddenCount}
                                </button>
                            )}
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-4">
                            <Link
                                href={href}
                                className="inline-flex items-center gap-2 rounded-[20px] border border-accent bg-accent/10 px-[1.2rem] py-2 font-sans text-[0.85rem] font-semibold text-accent transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_12px_rgba(93,211,158,0.3)]"
                            >
                                {labels.seeDetails} <i className="bi bi-arrow-right"></i>
                            </Link>
                            <ProjectLinks githubUrl={project.githubUrl} demoUrl={project.demoUrl} labels={labels}/>
                        </div>
                    </div>

                    {/* Image à droite pour le projet phare */}
                    {isFeatured && project.cover && (
                        <Link href={href} className="relative block aspect-video overflow-hidden rounded-xl border border-mist/40 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                            <Image
                                src={project.cover.src}
                                alt={tr(project.cover.alt, lang)}
                                fill
                                sizes="(min-width: 1024px) 450px, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
