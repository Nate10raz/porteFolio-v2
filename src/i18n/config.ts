// Langues du site. Le français est servi à la racine (/, /projets/...),
// l'anglais sous /en (/en, /en/projets/...). Voir src/proxy.ts.

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export function hasLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}

// Préfixe une URL interne selon la langue : localePath('en', '/projets/x') → '/en/projets/x'
export function localePath(lang: Locale, path: string = '/') {
    if (lang === defaultLocale) return path;
    return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

// Un texte des fichiers de données : soit identique dans les deux langues
// (simple chaîne), soit traduit ({ fr: "...", en: "..." }).
export type Localized<T = string> = T | { fr: T; en: T };

// Renvoie la version dans la langue demandée
export function tr<T>(value: Localized<T>, lang: Locale): T {
    if (value !== null && typeof value === 'object' && 'fr' in value && 'en' in value) {
        return (value as { fr: T; en: T })[lang];
    }
    return value as T;
}

// Métadonnées "alternates" d'une page : son URL canonique dans cette langue et
// les liens hreflang vers l'autre langue (Google sert la bonne version).
export function alternatesFor(lang: Locale, path: string = '/') {
    return {
        canonical: localePath(lang, path),
        languages: {
            fr: localePath('fr', path),
            en: localePath('en', path),
            'x-default': localePath(defaultLocale, path),
        },
    };
}

// Pour les balises <html lang> et Open Graph
export const htmlLang: Record<Locale, string> = { fr: 'fr', en: 'en' };
export const ogLocale: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' };
