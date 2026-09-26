import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { getPosts, hasPublishedPosts } from '@/lib/blog';
import { locales, localePath, type Locale } from '@/i18n/config';

// Servi sur /sitemap.xml : chaque page dans chaque langue, avec les liens
// hreflang vers sa traduction (Google associe ainsi les deux versions).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];

    // Page disponible dans les deux langues
    const bilingual = (path: string, priority: number, changeFrequency: 'monthly' | 'weekly') => {
        const languages = Object.fromEntries(locales.map((lang) => [lang, `${site.url}${localePath(lang, path)}`]));
        for (const lang of locales) {
            entries.push({
                url: `${site.url}${localePath(lang, path)}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
                alternates: { languages },
            });
        }
    };

    bilingual('/', 1, 'monthly');
    projects.forEach((project) => bilingual(`/projets/${project.slug}`, 0.8, 'monthly'));

    // Blog : seulement les langues qui ont des articles publiés
    for (const lang of locales as readonly Locale[]) {
        if (!(await hasPublishedPosts(lang))) continue;
        entries.push({ url: `${site.url}${localePath(lang, '/blog')}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
        for (const post of await getPosts(lang)) {
            entries.push({
                url: `${site.url}${localePath(lang, `/blog/${post.slug}`)}`,
                lastModified: new Date(post.date),
                changeFrequency: 'yearly',
                priority: 0.6,
            });
        }
    }

    return entries;
}
