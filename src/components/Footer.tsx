import { site } from "@/data/site";
import { Locale, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Footer({ lang }: { lang: Locale }) {
    const t = getDictionary(lang);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-abyss border-t border-forest py-12">
            <div className="container mx-auto px-4 text-center">
                {/* Devise */}
                <blockquote className="mx-auto mb-8 max-w-2xl">
                    <i className="bi bi-quote mb-2 block text-[1.8rem] leading-none text-forest" aria-hidden="true"></i>
                    <p className="font-body text-[1.2rem] leading-[1.7] text-text-light/80 italic">
                        {tr(site.motto, lang)}
                    </p>
                    <div className="mx-auto mt-5 h-px w-16 bg-linear-to-r from-transparent via-accent to-transparent"></div>
                </blockquote>

                <p className="font-sans text-text-muted mb-2 text-[0.95rem]">
                    &copy; {currentYear} {site.name}. {t.footer.rights}
                </p>
            </div>
        </footer> 
    );
}