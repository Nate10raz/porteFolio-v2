import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cinzel, Cormorant_Garamond, Raleway } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { hasPublishedPosts } from "@/lib/blog";
import { site } from "@/data/site";
import { alternatesFor, hasLocale, htmlLang, locales, ogLocale, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Toutes les pages sont générées au build en français ET en anglais ;
// toute autre langue dans l'URL → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};

  const title = tr(site.title, lang);
  const description = tr(site.description, lang);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords: lang === 'fr'
        ? ["développeur informatique", "Madagascar", "Java", "Spring Boot", "Flutter", "C#", "portfolio", "IT University", "développement web", "développement mobile"]
        : ["software developer", "Madagascar", "Java", "Spring Boot", "Flutter", "C#", "portfolio", "IT University", "web development", "mobile development"],
    authors: [{ name: site.name, url: site.url }],
    alternates: alternatesFor(lang),
    openGraph: {
      type: "website",
      url: alternatesFor(lang).canonical,
      title,
      description,
      siteName: `Portfolio — ${site.name}`,
      locale: ogLocale[lang],
      alternateLocale: lang === 'fr' ? ogLocale.en : ogLocale.fr,
      // l'image est générée par src/app/[lang]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);

  return (
      <html
          lang={htmlLang[lang]}
          className={`${cinzel.variable} ${cormorantGaramond.variable} ${raleway.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">
      <Navbar lang={lang} labels={t.nav} showBlog={await hasPublishedPosts(lang)} />
      {children}
      </body>
      </html>
  );
}
