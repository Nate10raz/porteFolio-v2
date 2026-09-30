import { Fragment } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from "@/components/Skills";
import Parcours from "@/components/Parcours";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import {contactInfo} from "@/data/contactInfo"
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { site } from "@/data/site";
import Certifications from "@/components/Certifications";
import Recommendations from "@/components/Recommendations";
import LatestPosts from "@/components/LatestPosts";
import { SectionProps } from "@/components/sectionProps";
import { experiences } from "@/data/experiences";
import { certifications } from "@/data/certifications";
import { recommendations } from "@/data/recommendations";
import { getPosts, hasPublishedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { hasLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Données structurées (schema.org) : aident Google à comprendre qui est
// la personne derrière le site (nom, métier, école, profils...).
function personJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${site.url}${localePath(lang) === '/' ? '' : localePath(lang)}`,
    image: site.photo,
    jobTitle: getDictionary(lang).hero.role,
    email: `mailto:${site.email}`,
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'IT University Madagascar' },
    // Établissement actuel : MSc eBIHAR (Big Data & IA), en ligne
    affiliation: { '@type': 'CollegeOrUniversity', name: 'ESTIA — École Supérieure des Technologies Industrielles Avancées', url: 'https://www.estia.fr' },
    address: { '@type': 'PostalAddress', addressCountry: 'MG' },
    knowsAbout: ['Java', 'Spring Boot', 'Flutter', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Docker', 'Next.js', 'Big Data', 'Machine Learning'],
    sameAs: [site.linkedin, site.github],
  };
}

export default async function Home(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);
  const posts = await getPosts(lang);
  const showBlog = await hasPublishedPosts(lang);

  // Sections de l'accueil, dans l'ordre. Une section `visible: false` (ex: aucune
  // certification encore) est retirée : numéros et fonds alternés se recalculent.
  const sections = [
    { key: 'about', visible: true, render: (p: SectionProps) => <About {...p}/> },
    { key: 'experience', visible: experiences.length > 0, render: (p: SectionProps) => <Experience {...p}/> },
    { key: 'parcours', visible: true, render: (p: SectionProps) => <Parcours {...p}/> },
    { key: 'skills', visible: true, render: (p: SectionProps) => <Skills {...p}/> },
    { key: 'certifications', visible: certifications.length > 0, render: (p: SectionProps) => <Certifications {...p}/> },
    { key: 'projects', visible: true, render: (p: SectionProps) => <Projects {...p}/> },
    { key: 'recommendations', visible: recommendations.length > 0, render: (p: SectionProps) => <Recommendations {...p}/> },
    { key: 'blog', visible: showBlog, render: (p: SectionProps) => <LatestPosts {...p} posts={posts}/> },
    { key: 'contact', visible: true, render: (p: SectionProps) => <Contact {...p} contactInfo={contactInfo}/> },
  ].filter((section) => section.visible);

  return (
      <main>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)).replace(/</g, '\\u003c') }}
        />
        <Hero lang={lang}/>
        {sections.map((section, index) => (
            <Fragment key={section.key}>
              {section.render({
                number: String(index + 1).padStart(2, '0'),
                dark: index % 2 === 1, // une section sur deux sur fond dégradé
                lang,
              })}
            </Fragment>
        ))}
        <BackToTop label={t.backToTop}/>
        <Footer lang={lang}/>
      </main>
  );
}
