// Chaque article .mdx exporte ses métadonnées : export const metadata = {...}
declare module '*.mdx' {
    export const metadata: import('@/lib/blog').PostMeta;
}
