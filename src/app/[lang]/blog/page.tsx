import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, hasPublishedPosts } from "@/lib/blog";
import { site } from "@/data/site";
import { alternatesFor, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export async function generateMetadata(props: PageProps<'/[lang]/blog'>): Promise<Metadata> {
    const { lang } = await props.params;
    if (!hasLocale(lang)) return {};

    return {
        title: `Blog — ${site.name}`,
        description: getDictionary(lang).blog.metaDescription,
        alternates: alternatesFor(lang, '/blog'),
    };
}

export default async function BlogPage(props: PageProps<'/[lang]/blog'>) {
    const { lang } = await props.params;
    if (!hasLocale(lang)) notFound();

    // Blog masqué (404) tant qu'aucun article n'est publié dans cette langue
    if (!(await hasPublishedPosts(lang))) notFound();

    const t = getDictionary(lang);
    const posts = await getPosts(lang);

    return (
        <>
            <main className="container mx-auto px-4 pt-36 pb-20">
                <div className="mx-auto max-w-5xl">
                    <header className="mb-16">
                        <p className="mb-4 font-sans text-[0.9rem] tracking-[1.5px] text-accent uppercase">{t.blog.kicker}</p>
                        <h1 className="mb-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-fog">{t.blog.title}</h1>
                        <div className="mb-6 h-[3px] w-20 rounded-sm bg-linear-to-r from-accent to-forest"></div>
                        <p className="max-w-2xl text-[1.2rem] leading-[1.8] text-text-muted">{t.blog.intro}</p>
                    </header>

                    <div className="grid gap-8 md:grid-cols-2">
                        {posts.map((post, index) => (
                            <Reveal key={post.slug} delay={index * 0.1} className="h-full">
                                <PostCard post={post}/>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </main>
            <BackToTop label={t.backToTop}/>
            <Footer lang={lang}/>
        </>
    );
}
