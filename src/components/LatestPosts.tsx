import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import { Post } from "@/lib/blog";
import { SectionProps } from "@/components/sectionProps";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";

// Section "Blog" de l'accueil : les 3 derniers articles
export default function LatestPosts({ number, dark, lang, posts }: SectionProps & { posts: Post[] }) {
    const t = getDictionary(lang);

    return (
        <Section id="blog" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader number={number} title={t.sections.blog}/>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.slice(0, 3).map((post, index) => (
                            <Reveal key={post.slug} delay={index * 0.1} className="h-full">
                                <PostCard post={post}/>
                            </Reveal>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link href={localePath(lang, '/blog')} className="inline-flex items-center gap-2 font-sans font-semibold text-accent hover:underline">
                            {t.blog.seeAll} <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}
