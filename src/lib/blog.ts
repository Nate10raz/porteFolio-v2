import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '@/i18n/config';

// Métadonnées exportées en tête de chaque article .mdx :
//   export const metadata = { title: "...", description: "...", date: "2026-09-26", tags: ["Next.js"] }
export type PostMeta = {
    title: string;
    description: string;
    date: string;      // format AAAA-MM-JJ
    tags?: string[];
    lang?: Locale;     // langue de l'article : "fr" (par défaut) ou "en"
    draft?: boolean;   // true = visible seulement en développement (npm run dev)
};

export type Post = PostMeta & {
    slug: string;
    lang: Locale;
    readingTime: number; // en minutes
};

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

// Articles d'une langue, du plus récent au plus ancien
// (brouillons inclus seulement en développement)
export async function getPosts(lang: Locale): Promise<Post[]> {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            const { metadata } = await import(`@/content/blog/${slug}.mdx`);
            const words = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8').split(/\s+/).length;
            const meta = metadata as PostMeta;
            return { ...meta, slug, lang: meta.lang ?? 'fr', readingTime: Math.max(1, Math.round(words / 200)) };
        })
    );

    return posts
        .filter((post) => post.lang === lang)
        .filter((post) => SHOW_DRAFTS || !post.draft)
        .sort((a, b) => b.date.localeCompare(a.date));
}

// Y a-t-il au moins un article PUBLIÉ (hors brouillons) dans cette langue ?
// Tant que non, le blog est masqué partout (navbar, accueil, sitemap),
// comme les sections Recommandations / Certifications quand elles sont vides.
// Les brouillons restent consultables en local par leur URL directe.
export async function hasPublishedPosts(lang: Locale) {
    const posts = await getPosts(lang);
    return posts.some((post) => !post.draft);
}

export function formatDate(date: string, lang: Locale) {
    return new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
