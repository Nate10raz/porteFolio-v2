import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Permet d'importer des fichiers .mdx (articles du blog)
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // Autorise next/image à optimiser les images de mon compte Cloudinary uniquement
    remotePatterns: [new URL("https://res.cloudinary.com/dkddygjxy/**")],
  },
};

const withMDX = createMDX({
  options: {
    // Noms de plugins en chaînes de caractères : requis par Turbopack
    remarkPlugins: ["remark-gfm"], // tableaux, listes de tâches, liens auto...
    rehypePlugins: [
      // Coloration syntaxique des blocs de code (au build, pas de JS côté client)
      ["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
