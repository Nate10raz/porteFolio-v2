'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { navLinks } from '@/data/navLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, locales, localePath } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

// Chemin sans le préfixe de langue : "/en/projets/x" → "/projets/x", "/en" → "/"
function stripLocale(pathname: string) {
    const stripped = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '');
    return stripped === '' ? '/' : stripped;
}

// showBlog : le lien "Blog" n'apparaît que s'il existe au moins un article publié
export default function Navbar({ lang, labels, showBlog }: { lang: Locale; labels: Dictionary['nav']; showBlog: boolean }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const pathname = usePathname();
    // Chemin courant (sans langue), lu seulement côté navigateur : avec la réécriture
    // d'URL du proxy, la valeur serveur peut différer (cf. doc usePathname).
    // isClient vaut false pendant le rendu serveur et l'hydratation, true ensuite.
    const isClient = useSyncExternalStore(() => () => {}, () => true, () => false);
    const currentPath = isClient ? stripLocale(pathname) : null;
    const isHome = currentPath === '/';
    const otherLang: Locale = lang === 'fr' ? 'en' : 'fr';
    // Barre de progression : mise à jour directe du DOM (via ref) plutôt qu'un
    // state React, pour éviter un re-render de la navbar à chaque pixel de scroll.
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 50);

            // Barre de progression de lecture (0 → 100 %)
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }

            // Détermine quelle section est actuellement visible, en comparant
            // la position de scroll à la position/hauteur de chaque <section id="...">
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY;

            sections.forEach((section) => {
                const sectionEl = section as HTMLElement;
                const sectionTop = sectionEl.offsetTop - 100;
                const sectionHeight = sectionEl.offsetHeight;

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    setActiveSection(sectionEl.id);
                }
            });
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-400 ease-in-out
        ${
                isScrolled || isMenuOpen // fond opaque aussi quand le menu mobile est ouvert
                    ? 'bg-abyss/95 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-[10px]'
                    : 'bg-transparent py-6'
            }
      `}
        >
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
                <Link href={`${localePath(lang)}#hero`} className="group" aria-label={labels.home}>
          <span
              className="
              inline-block rounded-lg border-2 border-mist
              bg-linear-to-br from-forest to-deep
              px-4 py-2 font-display text-2xl font-bold text-fog
              tracking-[2px] transition-all duration-300
              group-hover:-translate-y-0.5
              group-hover:shadow-[0_8px_25px_rgba(111,159,165,0.3)]
            "
          >
            ZN
          </span>
                </Link>

                <div className="flex items-center gap-3 lg:order-last lg:ml-6">
                    {/* Sélecteur de langue : même page dans l'autre langue */}
                    <Link
                        href={localePath(otherLang, currentPath ?? '/')}
                        hrefLang={otherLang}
                        aria-label={labels.switchTo}
                        title={labels.switchTo}
                        className="rounded-full border border-mist/60 px-3 py-1 font-sans text-[0.8rem] font-semibold tracking-[1.5px] text-text-muted transition-colors hover:border-accent hover:text-fog"
                    >
                        <span className={lang === 'fr' ? 'text-accent' : ''}>FR</span>
                        <span className="mx-1 text-forest">|</span>
                        <span className={lang === 'en' ? 'text-accent' : ''}>EN</span>
                    </Link>

                <button
                    type="button"
                    aria-label={labels.openMenu}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-md border border-fog/15 px-3 py-1 text-2xl text-fog lg:hidden"
                >
                    <i className="bi bi-list"></i>
                </button>
                </div>

                <ul
                    className={`
            order-last w-full flex-col gap-4
            lg:order-none lg:ml-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-0
            ${isMenuOpen ? 'mt-4 flex' : 'hidden'}
          `}
                >
                    {navLinks.filter((link) => showBlog || link.key !== "blog").map((link) => {
                        const isAnchor = link.target.startsWith("#");
                        const href = isAnchor ? `${localePath(lang)}${link.target}` : localePath(lang, link.target);
                        // Ancre (#about) : active selon le scroll de l'accueil ; page (/blog) : active sur ses pages
                        const isActive = isAnchor
                            ? isHome && activeSection === link.target.slice(1)
                            : currentPath?.startsWith(link.target) ?? false;

                        return (
                            <li key={link.key}>
                                <Link
                                    href={href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`
                                            group relative mx-[0.8rem] inline-block
                                            font-sans text-[0.95rem] font-normal uppercase
                                            tracking-[1.5px] transition-all duration-300
                                            ${
                                                isActive
                                                    ? 'text-accent [text-shadow:0_0_12px_rgba(93,211,158,0.5)]'
                                                    : 'text-text-muted hover:text-fog'
                                            }
                                     `}
                                >
                                    {labels[link.key]}
                                    <span
                                        className={`
                                              absolute -bottom-1.25 left-1/2 h-0.5
                                              -translate-x-1/2 bg-accent transition-all duration-300
                                              ${
                                                isActive
                                                    ? 'w-full shadow-[0_0_8px_rgba(93,211,158,0.6)]'
                                                    : 'w-0 group-hover:w-full'
                                                }
                                           `}
                                    ></span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Barre de progression de lecture, collée sous la navbar */}
            <div
                ref={progressRef}
                className="absolute top-full left-0 h-[3px] w-full origin-left bg-linear-to-r from-accent to-mist shadow-[0_0_8px_rgba(93,211,158,0.5)] will-change-transform"
                style={{ transform: 'scaleX(0)' }}
            ></div>
        </nav>
    );
}