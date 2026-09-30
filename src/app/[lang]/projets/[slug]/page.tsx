import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, ProjectImage } from "@/data/projects";
import { site } from "@/data/site";
import { alternatesFor, hasLocale, localePath, ogLocale, tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import TechBadge from "@/components/TechBadge";
import ProjectLinks from "@/components/ProjectLinks";
import ProjectStats from "@/components/ProjectStats";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { btnForest, btnForestOutline } from "@/styles/buttons";

// Une page est générée au build pour chaque projet (dans chaque langue) ; tout autre slug → 404.
export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<'/[lang]/projets/[slug]'>): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const project = getProject(slug);
    if (!project || !hasLocale(lang)) return {};

    const title = `${tr(project.title, lang)} — ${site.name}`;
    const description = tr(project.summary, lang);
    const alternates = alternatesFor(lang, `/projets/${project.slug}`);

    return {
        title,
        description,
        alternates,
        openGraph: {
            type: "article",
            url: alternates.canonical,
            title,
            description,
            siteName: `Portfolio — ${site.name}`,
            locale: ogLocale[lang],
            ...(project.cover && { images: [{ url: project.cover.src, alt: tr(project.cover.alt, lang) }] }),
        },
    };
}

export default async function ProjectPage(props: PageProps<'/[lang]/projets/[slug]'>) {
    const { lang, slug } = await props.params;
    const project = getProject(slug);
    if (!project || !hasLocale(lang)) notFound();

    const t = getDictionary(lang);
    const p = t.projectPage;
    const index = projects.findIndex((item) => item.slug === project.slug);
    const previous = projects[index - 1];
    const next = projects[index + 1];
    const hasVisuals = Boolean(project.cover || project.videoUrl || project.gallery?.length);

    return (
        <>
            <main className="container mx-auto px-4 pt-36 pb-20">
                <article className="mx-auto max-w-5xl">
                    <Link
                        href={`${localePath(lang)}#projects`}
                        className="mb-10 inline-flex items-center gap-2 font-sans text-[0.9rem] text-text-muted transition-colors hover:text-accent"
                    >
                        <i className="bi bi-arrow-left"></i> {p.allProjects}
                    </Link>

                    {/* En-tête */}
                    <header className="mb-12">
                        <p className="mb-4 font-sans text-[0.9rem] tracking-[1.5px] text-accent uppercase">
                            {tr(project.type, lang)}
                        </p>
                        <h1 className="mb-6 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold text-fog">
                            {tr(project.title, lang)}
                        </h1>
                        <div className="mb-6 h-[3px] w-20 rounded-sm bg-linear-to-r from-accent to-forest"></div>
                        <p className="mb-6 max-w-3xl text-[1.2rem] leading-[1.8] text-text-muted">
                            {tr(project.summary, lang)}
                        </p>

                        {(project.period || project.team) && (
                            <ul className="mb-6 flex flex-wrap gap-x-8 gap-y-2 font-sans text-[0.9rem] text-mist">
                                {project.period && (
                                    <li><i className="bi bi-calendar3 mr-2 text-accent"></i>{tr(project.period, lang)}</li>
                                )}
                                {project.team && (
                                    <li><i className="bi bi-people mr-2 text-accent"></i>{tr(project.team, lang)}</li>
                                )}
                            </ul>
                        )}

                        <div className={`flex flex-wrap gap-[0.8rem] ${project.tools ? 'mb-4' : 'mb-8'}`}>
                            {project.tech.map((tech) => tr(tech, lang)).map((tech) => <TechBadge key={tech} name={tech}/>)}
                        </div>

                        {/* Outils (IDE, Git...) : plus discrets que la stack */}
                        {project.tools && (
                            <p className="mb-8 flex flex-wrap items-center gap-2 font-sans text-[0.85rem] text-text-muted">
                                <span className="mr-1 text-mist"><i className="bi bi-tools mr-1 text-accent"></i>{p.tools} :</span>
                                {project.tools.map((tool) => tr(tool, lang)).map((tool) => (
                                    <span key={tool} className="rounded-full border border-forest px-3 py-0.5">{tool}</span>
                                ))}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4">
                            <ProjectLinks githubUrl={project.githubUrl} demoUrl={project.demoUrl} labels={t.projects}/>
                        </div>
                    </header>

                    {project.cover && (
                        <Reveal className="mb-12">
                            <Visual image={project.cover} lang={lang} priority/>
                        </Reveal>
                    )}

                    {project.stats && (
                        <Reveal className="mb-16">
                            <ProjectStats stats={project.stats.map((stat) => ({ value: tr(stat.value, lang), label: tr(stat.label, lang) }))}/>
                        </Reveal>
                    )}

                    {/* Étude de cas : chaque bloc n'apparaît que s'il est renseigné */}
                    <div className="space-y-16">
                        {project.context && (
                            <Block icon="bi-lightbulb" title={p.context}>
                                <p className="text-[1.1rem] leading-[1.8] text-text-muted">{tr(project.context, lang)}</p>
                            </Block>
                        )}

                        {project.role && (
                            <Block icon="bi-person-workspace" title={p.role}>
                                <p className="text-[1.1rem] leading-[1.8] text-text-muted">{tr(project.role, lang)}</p>
                            </Block>
                        )}

                        {project.architecture && (
                            <Block icon="bi-diagram-3" title={p.architecture}>
                                <ol className="flex flex-col items-stretch gap-3 md:flex-row">
                                    {project.architecture.map((step, i) => (
                                        <Fragment key={i}>
                                            {i > 0 && (
                                                <li aria-hidden="true" className="self-center text-xl text-accent">
                                                    <i className="bi bi-arrow-down md:hidden"></i>
                                                    <i className="bi bi-arrow-right hidden md:inline"></i>
                                                </li>
                                            )}
                                            <li className="flex flex-1 flex-col justify-center rounded-2xl border-2 border-forest bg-deep/40 px-5 py-4 text-center">
                                                <span className="block font-sans font-semibold text-fog">{tr(step.name, lang)}</span>
                                                {step.detail && (
                                                    <span className="block font-sans text-[0.85rem] text-text-muted">{tr(step.detail, lang)}</span>
                                                )}
                                            </li>
                                        </Fragment>
                                    ))}
                                </ol>
                            </Block>
                        )}

                        {project.decisions && (
                            <Block icon="bi-sliders" title={p.decisions}>
                                <BulletList items={project.decisions.map((item) => tr(item, lang))}/>
                            </Block>
                        )}

                        {project.challenges && (
                            <Block icon="bi-puzzle" title={p.challenges}>
                                <div className="space-y-4">
                                    {project.challenges.map((challenge, i) => (
                                        <div key={i} className="rounded-2xl border border-forest bg-deep/30 p-6">
                                            <p className="mb-2 font-sans font-semibold text-fog">
                                                <i className="bi bi-exclamation-triangle mr-2 text-mist"></i>{tr(challenge.problem, lang)}
                                            </p>
                                            <p className="leading-[1.8] text-text-muted">
                                                <i className="bi bi-check2-circle mr-2 text-accent"></i>{tr(challenge.solution, lang)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Block>
                        )}

                        {project.results && (
                            <Block icon="bi-trophy" title={p.results}>
                                <BulletList items={project.results.map((item) => tr(item, lang))}/>
                            </Block>
                        )}

                        {project.videoUrl && (
                            <Block icon="bi-play-circle" title={p.video}>
                                <video
                                    src={project.videoUrl}
                                    poster={project.cover?.src}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="w-full rounded-2xl border-2 border-forest"
                                />
                            </Block>
                        )}

                        {project.gallery && project.gallery.length > 0 && (
                            <Block icon="bi-images" title={p.gallery}>
                                {/* Que des captures mobiles : 3 colonnes sur grand écran ; sinon 2 (les captures web prennent toute la largeur) */}
                                <div className={`grid gap-8 sm:grid-cols-2 ${project.gallery.every((image) => image.kind === 'mobile') ? 'lg:grid-cols-3' : ''}`}>
                                    {project.gallery.map((image) => (
                                        <Visual
                                            key={image.src}
                                            image={image}
                                            lang={lang}
                                            // capture mobile seule (nombre impair) : centrée sur toute la ligne, sans vide à côté
                                            fullRow={image.kind === 'mobile' && project.gallery!.filter((i) => i.kind === 'mobile').length % 2 === 1 && !project.gallery!.every((i) => i.kind === 'mobile')}
                                        />
                                    ))}
                                </div>
                            </Block>
                        )}

                        {!hasVisuals && (
                            <Reveal>
                                <p className="rounded-2xl border border-dashed border-forest px-6 py-5 font-sans text-[0.95rem] text-text-muted">
                                    <i className="bi bi-lock mr-2 text-accent"></i>
                                    {p.privateNote}{' '}
                                    <Link href={`${localePath(lang)}#contact`} className="text-accent underline-offset-4 hover:underline">
                                        {p.privateNoteLink}
                                    </Link>.
                                </p>
                            </Reveal>
                        )}
                    </div>

                    {/* Appel à l'action */}
                    <Reveal className="mt-20 rounded-[20px] border-2 border-forest bg-linear-135 from-deep/60 to-abyss/80 px-6 py-10 text-center sm:px-12">
                        <h2 className="mb-4 font-display text-[1.6rem] font-bold text-fog">{p.ctaTitle}</h2>
                        <p className="mx-auto mb-8 max-w-xl text-[1.1rem] text-text-muted">{p.ctaText}</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href={`${localePath(lang)}#contact`} className={btnForest}>
                                <i className="bi bi-envelope"></i> {p.contactMe}
                            </Link>
                            <a href="/cv" download className={btnForestOutline}>
                                <i className="bi bi-download"></i> {t.hero.downloadCv}
                            </a>
                        </div>
                    </Reveal>

                    {/* Projet précédent / suivant */}
                    <nav aria-label={p.otherProjects} className="mt-12 grid gap-4 sm:grid-cols-2">
                        {previous ? (
                            <ProjectNavLink href={localePath(lang, `/projets/${previous.slug}`)} title={tr(previous.title, lang)} label={p.previous} direction="previous"/>
                        ) : <span/>}
                        {next && (
                            <ProjectNavLink href={localePath(lang, `/projets/${next.slug}`)} title={tr(next.title, lang)} label={p.next} direction="next"/>
                        )}
                    </nav>
                </article>
            </main>
            <BackToTop label={t.backToTop}/>
            <Footer lang={lang}/>
        </>
    );
}

function Block({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
    return (
        <Reveal>
            <section>
                <h2 className="mb-6 flex items-center gap-3 font-display text-[1.6rem] font-bold text-fog">
                    <i className={`bi ${icon} text-[1.3rem] text-accent`}></i>
                    {title}
                </h2>
                {children}
            </section>
        </Reveal>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-[1.1rem] leading-[1.8] text-text-muted">
                    <i className="bi bi-chevron-right mt-1 text-accent"></i>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// Image cliquable (ouvre la version pleine taille), au format web ou mobile
function Visual({ image, lang, priority = false, fullRow = false }: { image: ProjectImage; lang: Locale; priority?: boolean; fullRow?: boolean }) {
    const isMobile = image.kind === 'mobile';
    return (
        <figure className={isMobile ? `mx-auto w-full max-w-[280px] ${fullRow ? 'sm:col-span-2' : ''}` : 'sm:col-span-2'}>
            <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block overflow-hidden rounded-2xl border-2 border-forest transition-colors hover:border-accent ${isMobile ? 'aspect-[9/19]' : 'aspect-video'}`}
            >
                <Image
                    src={image.src}
                    alt={tr(image.alt, lang)}
                    fill
                    priority={priority}
                    sizes={isMobile ? '280px' : '(min-width: 1024px) 1024px, 100vw'}
                    className={isMobile ? 'object-cover' : 'object-contain bg-abyss'}
                />
            </a>
            {image.caption && (
                <figcaption className="mt-3 text-center font-sans text-[0.9rem] text-text-muted">{tr(image.caption, lang)}</figcaption>
            )}
        </figure>
    );
}

function ProjectNavLink({ href, title, label, direction }: { href: string; title: string; label: string; direction: 'previous' | 'next' }) {
    const isNext = direction === 'next';
    return (
        <Link
            href={href}
            className={`rounded-2xl border border-forest bg-deep/30 px-6 py-5 transition-all hover:border-accent hover:bg-deep/60 ${isNext ? 'text-right sm:col-start-2' : ''}`}
        >
            <span className="block font-sans text-[0.8rem] tracking-[1.5px] text-text-muted uppercase">
                {isNext ? <>{label} <i className="bi bi-arrow-right"></i></> : <><i className="bi bi-arrow-left"></i> {label}</>}
            </span>
            <span className="mt-1 block font-display text-[1.1rem] font-bold text-fog">{title}</span>
        </Link>
    );
}
