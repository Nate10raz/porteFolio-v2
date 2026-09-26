import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

// Composants utilisés pour rendre le Markdown des articles.
// Le style typographique global vient de la classe `prose` (voir la page article).
const components: MDXComponents = {
    // Liens internes → navigation Next.js ; liens externes → nouvel onglet
    a: ({ href = '', children, ...props }) =>
        href.startsWith('/') || href.startsWith('#') ? (
            <Link href={href} {...props}>{children}</Link>
        ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
        ),
    // Dans un article : <Image src="..." alt="..." width={1200} height={675} />
    Image: ({ alt, ...props }: ImageProps) => (
        <Image alt={alt} sizes="(min-width: 768px) 768px, 100vw" className="rounded-xl" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
    return components;
}
