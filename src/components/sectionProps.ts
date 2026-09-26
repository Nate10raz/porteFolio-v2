import type { Locale } from "@/i18n/config";

// Props communes aux sections de l'accueil : le numéro ("01", "02"...) et
// le fond alterné sont calculés dans src/app/[lang]/page.tsx selon les sections
// réellement affichées (une section vide est masquée sans laisser de trou).
export type SectionProps = {
    number: string;
    dark: boolean;
    lang: Locale;
};
