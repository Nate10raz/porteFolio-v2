import { btnForest, btnForestOutline } from "@/styles/buttons";
import { site } from "@/data/site";

import { Locale, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const { availability } = site;

// Trois couches de brume qui dérivent à des vitesses/décalages différents
const fogLayers = [
    'animate-fog-drift opacity-60',
    'animate-[fog-drift_40s_ease-in-out_-10s_infinite_reverse] opacity-40',
    'animate-[fog-drift_50s_ease-in-out_-20s_infinite] opacity-30',
];

export default function Hero({ lang }: { lang: Locale }) {
    const t = getDictionary(lang);

    return (
        <section
            id="hero"
            className="
                relative flex min-h-screen items-center justify-center overflow-hidden
                bg-linear-to-b from-abyss/20 via-deep/45 to-abyss/20
                before:absolute before:inset-0 before:animate-ambient-pulse
                before:bg-[radial-gradient(ellipse_at_20%_30%,rgba(44,93,102,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(111,159,165,0.1)_0%,transparent_50%)]
            "
        >
            {fogLayers.map((fogClass) => (
                <div
                    key={fogClass}
                    className={`
                        absolute top-0 -left-1/2 h-full w-[200%] motion-reduce:hidden
                        bg-[linear-gradient(90deg,transparent_0%,rgba(111,159,165,0.05)_20%,rgba(111,159,165,0.08)_50%,rgba(111,159,165,0.05)_80%,transparent_100%)]
                        ${fogClass}
                    `}
                ></div>
            ))}

            <div className="container mx-auto px-4 pt-28 pb-24">
                <div className="relative z-10 mx-auto max-w-4xl animate-hero-fade-in text-center">
                    {availability.open && (
                        <div className="mb-8 flex animate-[hero-fade-in_1.5s_var(--ease-in-out)_1.2s_both] flex-col items-center gap-2">
                            <p className="inline-flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-2 font-sans text-[0.85rem] font-medium text-fog sm:rounded-full sm:text-[0.9rem] shadow-[0_0_20px_rgba(93,211,158,0.15)]">
                                {/* Point vert "en ligne" */}
                                <span className="relative flex size-2.5 shrink-0">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex size-2.5 rounded-full bg-accent"></span>
                                </span>
                                <span className="flex flex-col text-left sm:block">
                                    <span>{tr(availability.status, lang)}<span className="hidden sm:inline"> · </span></span>
                                    <strong className="font-semibold text-accent">{availability.lookingFor.map((item) => tr(item, lang)).join(` ${t.hero.or} `)}</strong>
                                </span>
                            </p>
                            <p className="font-sans text-[0.8rem] tracking-[1px] text-text-muted">
                                <i className="bi bi-geo-alt mr-1 text-accent"></i>
                                {availability.workModes.map((mode) => tr(mode, lang)).join(' · ')}
                            </p>
                        </div>
                    )}

                    <h1 className="mb-8 font-display text-[clamp(2.5rem,8vw,5rem)] leading-[1.2] font-bold">
                        <span className="block animate-[title-slide-in_1s_var(--ease-in-out)_0.2s_both] text-fog">
                            Razafindrakoto
                        </span>
                        <span className="block animate-[title-slide-in_1s_var(--ease-in-out)_0.4s_both] bg-linear-135 from-accent to-mist bg-clip-text text-transparent">
                            Zo Nantenaina
                        </span>
                    </h1>

                    <p className="mb-6 animate-[hero-fade-in_1.5s_var(--ease-in-out)_0.6s_both] font-sans text-[1.3rem] font-light tracking-[3px] text-mist uppercase">
                        {t.hero.role}
                    </p>

                    <p className="mx-auto mb-12 max-w-[600px] animate-[hero-fade-in_1.5s_var(--ease-in-out)_0.8s_both] text-[1.1rem] text-text-muted">
                        {t.hero.line1}<br/>
                        {t.hero.line2}
                    </p>

                    <div className="flex animate-[hero-fade-in_1.5s_var(--ease-in-out)_1s_both] flex-col items-center justify-center gap-6 lg:flex-row lg:flex-wrap">
                        <a href="#projects" className={btnForest}>
                            {t.hero.seeProjects}
                        </a>
                        <a href="/cv" download className={btnForestOutline}>
                            <i className="bi bi-download"></i> {t.hero.downloadCv}
                        </a>
                    </div>

                    {/* Liens sociaux */}
                    <nav aria-label={t.hero.social} className="mt-10 flex animate-[hero-fade-in_1.5s_var(--ease-in-out)_1.3s_both] items-center justify-center gap-4">
                        {[
                            { href: site.github, icon: 'bi-github', label: 'GitHub', external: true },
                            { href: site.linkedin, icon: 'bi-linkedin', label: 'LinkedIn', external: true },
                            { href: `mailto:${site.email}`, icon: 'bi-envelope-fill', label: t.hero.emailMe, external: false },
                        ].map((social) => (
                            <a
                                key={social.icon}
                                href={social.href}
                                aria-label={social.label}
                                title={social.label}
                                {...(social.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                className="flex size-11 items-center justify-center rounded-full border border-mist/50 bg-deep/40 text-[1.15rem] text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_0_14px_rgba(93,211,158,0.35)]"
                            >
                                <i className={`bi ${social.icon}`}></i>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Indicateur de scroll (souris) — masqué sur mobile et écrans peu hauts, où il chevaucherait les liens sociaux */}
            <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-scroll-bounce max-sm:hidden [@media(max-height:860px)]:hidden">
                <div className="relative h-10 w-[26px] rounded-[13px] border-2 border-mist">
                    <div className="absolute top-2 left-1/2 h-2 w-1 -translate-x-1/2 animate-wheel-scroll rounded-xs bg-accent"></div>
                </div>
            </div>
        </section>
    );
}
