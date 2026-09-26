import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/blog";
import { site } from "@/data/site";
import { hasLocale, localePath, ogLocale, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Une page par article (dans sa langue), générée au build ; tout autre slug → 404
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
    if (!hasLocale(params.lang)) return [];
    const posts = await getPosts(params.lang);
    return posts.map((post) => ({ slug: post.slug }));
}

async function findPost(lang: string, slug: string) {
    if (!hasLocale(lang)) return undefined;
    const posts = await getPosts(lang);
    return posts.find((post) => post.slug === slug);
}

export async function generateMetadata(props: PageProps<'/[lang]/blog/[slug]'>): Promise<Metadata> {
    const { lang, slug } = await props.params;
    const post = await findPost(lang, slug);
    if (!post) return {};

    return {
        title: `${post.title} — ${site.name}`,
        description: post.description,
        alternates: { canonical: localePath(post.lang, `/blog/${post.slug}`) },
        openGraph: {
            type: "article",
            url: localePath(post.lang, `/blog/${post.slug}`),
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            authors: [site.name],
            tags: post.tags,
            locale: ogLocale[post.lang],
        },
    };
}

// Styles typographiques du contenu Markdown (plugin @tailwindcss/typography)
const proseClass = `
    prose prose-lg prose-invert max-w-none
    prose-headings:font-display prose-headings:text-fog prose-headings:scroll-mt-28
    prose-p:text-text-light/90 prose-li:text-text-light/90 prose-li:marker:text-accent
    prose-strong:text-fog
    prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:text-fog
    prose-blockquote:border-accent prose-blockquote:text-text-muted
    prose-hr:border-forest
    prose-code:rounded prose-code:bg-deep prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-accent
    prose-code:before:content-none prose-code:after:content-none
    prose-pre:rounded-xl prose-pre:border prose-pre:border-forest prose-pre:bg-abyss
    [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
    prose-img:rounded-xl prose-th:text-fog prose-td:text-text-light/90
`;

export default async function PostPage(props: PageProps<'/[lang]/blog/[slug]'>) {
    const { lang, slug } = await props.params;
    const post = await findPost(lang, slug);
    if (!post) notFound();

    const t = getDictionary(post.lang);

    const { default: Content } = await import(`@/content/blog/${post.slug}.mdx`);

    return (
        <>
            <main className="container mx-auto px-4 pt-36 pb-20">
                <article className="mx-auto max-w-3xl">
                    <Link
                        href={localePath(post.lang, '/blog')}
                        className="mb-10 inline-flex items-center gap-2 font-sans text-[0.9rem] text-text-muted transition-colors hover:text-accent"
                    >
                        <i className="bi bi-arrow-left"></i> {t.blog.allArticles}
                    </Link>

                    <header className="mb-12">
                        <p className="mb-4 font-sans text-[0.85rem] tracking-[1px] text-text-muted uppercase">
                            <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time> · {post.readingTime} {t.blog.readingTime}
                            {post.draft && <span className="ml-2 rounded-full border border-mist px-2 py-0.5 text-[0.7rem] text-mist">{t.blog.draft}</span>}
                        </p>
                        <h1 className="mb-6 font-display text-[clamp(2rem,5vw,3rem)] font-bold text-fog">{post.title}</h1>
                        <p className="mb-6 text-[1.25rem] leading-[1.7] text-text-muted">{post.description}</p>
                        {post.tags && (
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-forest bg-forest/30 px-3 py-1 font-sans text-[0.75rem] text-mist">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mt-10 h-px bg-linear-to-r from-transparent via-forest to-transparent"></div>
                    </header>

                    <div className={proseClass}>
                        <Content/>
                    </div>

                    {/* Encadré auteur */}
                    <aside className="mt-16 flex flex-col items-center gap-6 rounded-[20px] border-2 border-forest bg-deep/40 p-8 text-center sm:flex-row sm:text-left">
                        <Image
                            src={site.photo}
                            alt={site.name}
                            width={80}
                            height={80}
                            className="size-20 shrink-0 rounded-full border-2 border-mist object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-display text-[1.2rem] font-bold text-fog">{site.name}</p>
                            <p className="mb-3 text-text-muted">
                                {t.blog.authorBio}
                                {site.availability.open && ` ${tr(site.availability.status, post.lang)}, ${t.blog.availabilityIn} ${site.availability.lookingFor.map((item) => tr(item, post.lang)).join(` ${t.hero.or} `)}.`}
                            </p>
                            <Link href={`${localePath(post.lang)}#contact`} className="font-sans text-[0.9rem] font-semibold text-accent hover:underline">
                                {t.blog.contactMe} <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </aside>
                </article>
            </main>
            <BackToTop label={t.backToTop}/>
            <Footer lang={post.lang}/>
        </>
    );
}
