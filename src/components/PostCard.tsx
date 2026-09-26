import Link from "next/link";
import { formatDate, Post } from "@/lib/blog";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Aperçu d'un article (liste du blog + section "Blog" de l'accueil)
export default function PostCard({ post }: { post: Post }) {
    const t = getDictionary(post.lang);

    return (
        <Link
            href={localePath(post.lang, `/blog/${post.slug}`)}
            className="group flex h-full flex-col rounded-[20px] border-2 border-forest bg-deep/40 p-8 transition-all duration-400 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_rgba(44,93,102,0.2)]"
        >
            <p className="mb-3 font-sans text-[0.8rem] tracking-[1px] text-text-muted uppercase">
                <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time> · {post.readingTime} {t.blog.readingTime}
                {post.draft && <span className="ml-2 rounded-full border border-mist px-2 py-0.5 text-[0.7rem] text-mist">{t.blog.draft}</span>}
            </p>
            <h3 className="mb-3 font-display text-[1.35rem] font-bold text-fog transition-colors group-hover:text-accent">
                {post.title}
            </h3>
            <p className="mb-6 flex-1 leading-[1.8] text-text-muted">{post.description}</p>
            {post.tags && (
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-forest bg-forest/30 px-3 py-1 font-sans text-[0.75rem] text-mist">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}
