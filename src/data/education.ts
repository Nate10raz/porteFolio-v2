import type { Localized } from "@/i18n/config";

// Parcours (formation), du plus ancien au plus récent.
// Textes traduits : { fr: "...", en: "..." } ; une simple chaîne sert pour les deux langues.

export type BadgeType = 'academic' | 'language' | 'current';

export type EducationItem = {
    id: number;
    year: Localized;
    icon: string;
    title: Localized;
    subtitleIcon: string;
    subtitle: Localized;
    description: Localized;
    badge: Localized;
    badgeType: BadgeType;
    current: boolean;
};

export const education: EducationItem[] = [
    {
        id: 1,
        year: "2021",
        icon: "bi-mortarboard-fill",
        title: { fr: "Baccalauréat Série C", en: "Baccalaureate, Series C (Science)" },
        subtitleIcon: "bi-building",
        subtitle: "LPCA — Lycée Privé Chrétien Anjomakely",
        description: {
            fr: "Obtention du Baccalauréat série C (Mathématiques & Sciences Physiques), posant les bases scientifiques pour la suite du parcours.",
            en: "High school diploma, Series C (Mathematics & Physical Sciences), laying the scientific foundations for my studies.",
        },
        badge: { fr: "Formation", en: "Education" },
        badgeType: "academic",
        current: false,
    },
    {
        id: 2,
        year: "2022",
        icon: "bi-translate",
        title: { fr: "Formation en Anglais", en: "English Language Training" },
        subtitleIcon: "bi-globe",
        subtitle: { fr: "Niveau Intermédiaire", en: "Intermediate level" },
        description: {
            fr: "Renforcement des compétences en anglais, langue essentielle dans le domaine informatique pour la lecture de documentation et la communication internationale.",
            en: "Strengthened my English skills, essential in IT for reading documentation and for international communication.",
        },
        badge: { fr: "Langue", en: "Language" },
        badgeType: "language",
        current: false,
    },
    {
        id: 3,
        year: "2022 — 2025",
        icon: "bi-laptop-fill",
        title: { fr: "Licence en Informatique", en: "Bachelor's Degree in Computer Science" },
        subtitleIcon: "bi-building",
        subtitle: "IT University Madagascar",
        description: {
            fr: "Spécialisation en développement informatique. Acquisition de compétences solides en programmation, bases de données, et développement web & mobile. Stage de fin d'études au sein d'Orange Digital Center (OSC25).",
            en: "Specialization in software development. Built solid skills in programming, databases, and web & mobile development. Final-year internship at Orange Digital Center (OSC25).",
        },
        badge: { fr: "Diplôme", en: "Degree" },
        badgeType: "academic",
        current: false,
    },
    {
        id: 4,
        year: "2025 — 2026",
        icon: "bi-mortarboard-fill",
        title: { fr: "Master 1 Informatique", en: "Master's in Computer Science (1st year)" },
        subtitleIcon: "bi-building",
        subtitle: "IT University Madagascar",
        description: {
            fr: "Approfondissement des connaissances en développement logiciel avancé, architecture système, et gestion de projets informatiques complexes.",
            en: "Deepened my knowledge of advanced software development, system architecture, and management of complex IT projects.",
        },
        badge: { fr: "Formation", en: "Education" },
        badgeType: "academic",
        current: false,
    },
    {
        id: 5,
        year: { fr: "2026 — ACTUEL", en: "2026 — PRESENT" },
        icon: "bi-star-fill",
        title: {
            fr: "Master 2 — MSc eBIHAR Big Data & IA",
            en: "Master's (2nd year) — MSc eBIHAR Big Data & AI",
        },
        subtitleIcon: "bi-building",
        subtitle: {
            fr: "ESTIA — École Supérieure des Technologies Industrielles Avancées (en ligne)",
            en: "ESTIA — École Supérieure des Technologies Industrielles Avancées (online)",
        },
        description: {
            fr: "Master of Science en intelligence artificielle et big data, suivi 100 % en ligne : ingénierie Big Data, IA (Machine Learning, Deep Learning), développement full stack, architectures cloud et cybersécurité.",
            en: "Master of Science in artificial intelligence and big data, taken 100% online: Big Data engineering, AI (Machine Learning, Deep Learning), full stack development, cloud architectures and cybersecurity.",
        },
        badge: { fr: "En Cours", en: "Ongoing" },
        badgeType: "current",
        current: true,
    },
];
