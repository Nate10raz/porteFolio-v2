import type { Localized } from "@/i18n/config";

// Données des projets : utilisées par la section "Projets" de l'accueil
// ET par les pages détaillées /projets/[slug] (et /en/projets/[slug]).
//
// Textes traduits : { fr: "...", en: "..." }. Une simple chaîne est utilisée
// telle quelle dans les deux langues (ex: nom de technologie).
//
// Le PREMIER projet de la liste est mis en avant (grande carte) sur l'accueil.
//
// Seuls id, slug, title, type, summary, description et tech sont obligatoires.
// Tous les autres champs sont optionnels : un bloc n'est affiché QUE s'il est
// rempli. Remplis-les au fur et à mesure (voir le modèle en bas du fichier).

export type ProjectImage = {
    src: string;             // URL Cloudinary (res.cloudinary.com/dkddygjxy/...) ou fichier de /public (ex: /projects/x/cover.webp)
    alt: Localized;          // description de l'image (accessibilité)
    caption?: Localized;     // légende affichée sous l'image
    kind?: 'web' | 'mobile'; // format : paysage (web) ou portrait (mobile)
};

export type ProjectStat = {
    value: Localized;        // ex: "4", "3 mois", "Top 5"
    label: Localized;        // ex: "développeurs", "de développement"
};

export type ProjectStep = {
    name: Localized;         // ex: "App mobile Flutter"
    detail?: Localized;      // ex: "Saisie des relevés"
};

export type Project = {
    id: number;
    slug: string;            // partie de l'URL : /projets/<slug> (identique en FR et EN)
    title: Localized;
    type: Localized;
    summary: Localized;      // 1-2 phrases en texte brut (SEO, aperçu de partage)
    description: Localized<React.ReactNode>; // texte de la carte (peut contenir du <strong>)
    tech: Localized[];       // stack principale (les 5 premières apparaissent sur la carte)
    tools?: Localized[];     // outils (IDE, Git...) : affichés seulement sur la page détaillée

    githubUrl?: string;
    demoUrl?: string;

    // --- Étude de cas (page détaillée) ---
    period?: Localized;      // ex: "Juin – Août 2025"
    team?: Localized;        // ex: "Équipe de 4"
    role?: Localized;        // ton rôle précis
    cover?: ProjectImage;    // image principale (carte + en-tête de page)
    videoUrl?: string;       // courte vidéo de démo (.mp4 sur Cloudinary)
    stats?: ProjectStat[];
    context?: Localized;     // le problème / le besoin de départ
    architecture?: ProjectStep[]; // schéma simplifié, dans l'ordre du flux
    decisions?: Localized[]; // choix techniques et pourquoi
    challenges?: { problem: Localized; solution: Localized }[];
    results?: Localized[];   // ce que le projet a apporté / appris
    gallery?: ProjectImage[];
};

export const projects: Project[] = [
    {
        id: 1,
        slug: "suivi-consommation-eau",
        title: {
            fr: "Plateforme de suivi de la consommation d'eau potable",
            en: "Drinking water consumption monitoring platform",
        },
        type: { fr: "Stage de fin d'étude de Licence", en: "Bachelor's final-year internship" },
        summary: {
            fr: "Plateforme web et mobile de suivi de la consommation d'eau potable, réalisée à Orange Digital Center dans le cadre de l'Orange Summer Challenge 2025.",
            en: "Web and mobile platform for monitoring drinking water consumption, built at Orange Digital Center as part of the Orange Summer Challenge 2025.",
        },
        description: {
            fr: (
                <>
                    Au sein de <strong>Orange Digital Center</strong> et dans le cadre de l&apos;
                    <strong>Orange Summer Challenge 2025 (OSC25)</strong>, conception et développement
                    d&apos;une plateforme web et mobile pour le suivi de la consommation d&apos;eau potable.
                </>
            ),
            en: (
                <>
                    At <strong>Orange Digital Center</strong>, as part of the{' '}
                    <strong>Orange Summer Challenge 2025 (OSC25)</strong>, design and development of a web
                    and mobile platform for monitoring drinking water consumption.
                </>
            ),
        },
        tech: [
            "Java Spring Boot",
            "Thymeleaf",
            { fr: "Java Natif (mobile)", en: "Native Java (mobile)" },
            "PostgreSQL",
            { fr: "service cloud AWS", en: "AWS cloud services" },
        ],
        tools: ["IntelliJ IDEA Ultimate", "Git", "GitHub"],
    },
    {
        id: 2,
        slug: "mastermind",
        title: "Mastermind",
        type: { fr: "Projet personnel", en: "Personal Project" },
        summary: {
            fr: "Reproduction en ligne du jeu de déduction Mastermind : trois niveaux de difficulté, comptes joueurs, classement et statistiques.",
            en: "Online remake of the Mastermind deduction game: three difficulty levels, player accounts, leaderboard and statistics.",
        },
        description: {
            fr: "Reproduction du jeu de déduction Mastermind, jouable en ligne : trois niveaux de difficulté (jusqu'à 10 couleurs et 6 positions, avec chronomètre), comptes joueurs, classement général et par niveau avec score pondéré, statistiques et profil.",
            en: "Remake of the Mastermind deduction game, playable online: three difficulty levels (up to 10 colors and 6 positions, with a timer), player accounts, overall and per-level leaderboards with a weighted score, statistics and profile.",
        },
        tech: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
        demoUrl: "https://master-mind-nine.vercel.app",
        period: { fr: "2026 — en cours", en: "2026 — ongoing" },
        cover: {
            src: "/projects/mastermind/cover.webp",
            alt: {
                fr: "Trois écrans du jeu Mastermind : choix de la difficulté, partie en cours et classement",
                en: "Three screens of the Mastermind game: difficulty selection, game in progress and leaderboard",
            },
        },
        stats: [
            { value: "3", label: { fr: "niveaux de difficulté", en: "difficulty levels" } },
            { value: "4", label: { fr: "classements (général + par niveau)", en: "leaderboards (overall + per level)" } },
        ],
        architecture: [
            { name: { fr: "Interface Next.js", en: "Next.js front end" }, detail: { fr: "Hébergée sur Vercel", en: "Hosted on Vercel" } },
            { name: "Supabase", detail: { fr: "Scores et niveaux de difficulté", en: "Scores and difficulty levels" } },
        ],
        gallery: [
            {
                src: "/projects/mastermind/partie.webp",
                alt: { fr: "Partie en cours avec les indices rouges et blancs", en: "Game in progress with red and white hints" },
                caption: { fr: "Partie en cours", en: "Game in progress" },
                kind: "mobile",
            },
            {
                src: "/projects/mastermind/difficulte.webp",
                alt: { fr: "Choix du niveau : Normal, Difficile, Expert", en: "Level selection: Normal, Hard, Expert" },
                caption: { fr: "Trois niveaux de difficulté", en: "Three difficulty levels" },
                kind: "mobile",
            },
            {
                src: "/projects/mastermind/classement.webp",
                alt: { fr: "Classement des joueurs avec score pondéré", en: "Player leaderboard with weighted score" },
                caption: { fr: "Classement général et par niveau", en: "Overall and per-level leaderboard" },
                kind: "mobile",
            },
        ],
    },
    {
        id: 3,
        slug: "flm-ambatomainty",
        title: { fr: "Site web de l'église FLM Ambatomainty", en: "FLM Ambatomainty church website" },
        type: { fr: "Projet personnel — en cours", en: "Personal Project — in progress" },
        summary: {
            fr: "Site web de l'église FLM Ambatomainty (Fiangonana Loterana Malagasy), bilingue malgache / français : annonces, événements et présentation de l'église. En cours de développement.",
            en: "Website for the FLM Ambatomainty church (Malagasy Lutheran Church), bilingual Malagasy / French: announcements, events and church presentation. Currently in development.",
        },
        description: {
            fr: "Site web de l'église FLM Ambatomainty (Fiangonana Loterana Malagasy), bilingue malgache / français, pour publier les annonces et les événements et présenter l'église. En cours de développement.",
            en: "Website for the FLM Ambatomainty church (Malagasy Lutheran Church), bilingual Malagasy / French, to publish announcements and events and present the church. Currently in development.",
        },
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
        // Lien de démo retiré tant que le site n'est pas prêt (seul l'accueil est finalisé) :
        // demoUrl: "https://flm-ambatomainty.vercel.app",
        period: { fr: "2026 — en cours", en: "2026 — ongoing" },
        cover: {
            src: "/projects/flm-ambatomainty/cover.webp",
            alt: {
                fr: "Page d'accueil du site FLM Ambatomainty sur ordinateur et sur mobile",
                en: "FLM Ambatomainty website home page on desktop and mobile",
            },
        },
        gallery: [
            {
                src: "/projects/flm-ambatomainty/accueil-mg.webp",
                alt: { fr: "Page d'accueil en malgache", en: "Home page in Malagasy" },
                caption: { fr: "Accueil — version malgache", en: "Home — Malagasy version" },
                kind: "web",
            },
            {
                src: "/projects/flm-ambatomainty/accueil-fr.webp",
                alt: { fr: "Page d'accueil en français", en: "Home page in French" },
                caption: { fr: "Accueil — version française", en: "Home — French version" },
                kind: "web",
            },
            {
                src: "/projects/flm-ambatomainty/accueil-mobile.webp",
                alt: { fr: "Page d'accueil sur mobile", en: "Home page on mobile" },
                caption: { fr: "Accueil sur mobile", en: "Home on mobile" },
                kind: "mobile",
            },
        ],
    },
    {
        id: 4,
        slug: "crypto-web-mobile",
        title: { fr: "Application web et mobile Crypto", en: "Crypto web & mobile application" },
        type: { fr: "Projet Académique", en: "Academic Project" },
        summary: {
            fr: "Application web de cryptomonnaie (Spring Boot, REST) et application mobile Flutter connectée, avec Firebase.",
            en: "Cryptocurrency web application (Spring Boot, REST) and a connected Flutter mobile app, using Firebase.",
        },
        description: {
            fr: "Rôle : conception et développement de l'application web de cryptomonnaie Crypt (Spring Boot, REST), conception du schéma Firebase, et développement de l'application mobile Flutter connectée à l'application web.",
            en: "Role: design and development of the Crypt cryptocurrency web application (Spring Boot, REST), design of the Firebase schema, and development of the Flutter mobile app connected to the web application.",
        },
        tech: [
            "Java Spring Boot",
            "Flutter",
            "Firebase Service",
            "VueJS",
            "PostgreSQL",
            "ASP .NET Core API",
            "Docker",
        ],
        tools: ["IntelliJ IDEA", "Rider"],
        role: {
            fr: "Conception et développement de l'application web (Spring Boot, REST), conception du schéma Firebase et développement de l'application mobile Flutter connectée à l'application web.",
            en: "Design and development of the web application (Spring Boot, REST), design of the Firebase schema and development of the Flutter mobile app connected to the web application.",
        },
    },
    {
        id: 5,
        slug: "application-crm",
        title: { fr: "Application CRM", en: "CRM Application" },
        type: { fr: "Projet Académique", en: "Academic Project" },
        summary: {
            fr: "Reprise d'un CRM en Java (Spring Boot, Thymeleaf) et développement d'une application web liée en C# ASP.NET Core Razor Pages.",
            en: "Took over a Java CRM (Spring Boot, Thymeleaf) and built a connected web application in C# ASP.NET Core Razor Pages.",
        },
        description: {
            fr: "Reprise d'un projet CRM existant développé en Java (Spring Boot, Thymeleaf) et développement d'une application web, liée au CRM, en C# avec ASP.NET Core Razor Pages.",
            en: "Took over an existing CRM project built in Java (Spring Boot, Thymeleaf) and developed a web application connected to the CRM, in C# with ASP.NET Core Razor Pages.",
        },
        tech: ["Java Spring Boot", "Thymeleaf", "C# ASP .NET Core", "MySQL"],
        tools: ["IntelliJ IDEA", "Rider"],
    },
];

export function getProject(slug: string) {
    return projects.find((project) => project.slug === slug);
}

/* ---------------------------------------------------------------------------
   MODÈLE — champs à ajouter à un projet pour enrichir sa page détaillée.
   Chaque texte peut être une chaîne (même texte FR/EN) ou { fr: "...", en: "..." }.

    period: { fr: "Juin – Août 2025", en: "June – August 2025" },
    team: { fr: "Équipe de 4 développeurs", en: "Team of 4 developers" },
    cover: {
        src: "https://res.cloudinary.com/dkddygjxy/image/upload/....png",
        alt: { fr: "Tableau de bord", en: "Dashboard" },
    },
    videoUrl: "https://res.cloudinary.com/dkddygjxy/video/upload/....mp4",
    stats: [
        { value: { fr: "3 mois", en: "3 months" }, label: { fr: "de développement", en: "of development" } },
        { value: "2", label: { fr: "plateformes (web + mobile)", en: "platforms (web + mobile)" } },
    ],
    context: { fr: "Le problème de départ, en 2-4 phrases.", en: "The initial problem, in 2-4 sentences." },
    architecture: [
        { name: { fr: "App mobile", en: "Mobile app" }, detail: "Flutter" },
        { name: "API REST", detail: "Spring Boot" },
        { name: { fr: "Base de données", en: "Database" }, detail: "PostgreSQL" },
    ],
    decisions: [{ fr: "Pourquoi tel choix technique...", en: "Why this technical choice..." }],
    challenges: [{ problem: { fr: "...", en: "..." }, solution: { fr: "...", en: "..." } }],
    results: [{ fr: "Ce que le projet a apporté", en: "What the project achieved" }],
    gallery: [
        { src: "...", alt: "...", caption: { fr: "Écran de connexion", en: "Login screen" }, kind: "mobile" },
        { src: "...", alt: "...", caption: { fr: "Tableau de bord", en: "Dashboard" }, kind: "web" },
    ],
--------------------------------------------------------------------------- */
