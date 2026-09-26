import type { Localized } from "@/i18n/config";

// Informations globales du site (SEO, liens, CV...).
// Les textes traduits s'écrivent { fr: "...", en: "..." }.

export const site = {
    url: "https://www.zonantenaina.tech",
    name: "Razafindrakoto Zo Nantenaina",
    title: {
        fr: "Razafindrakoto Zo Nantenaina — Développeur Informatique",
        en: "Razafindrakoto Zo Nantenaina — Software Developer",
    } as Localized,
    description: {
        fr: "Portfolio de Razafindrakoto Zo Nantenaina, étudiant en M1 Informatique à IT University Madagascar. " +
            "Spécialisé en développement web, mobile et logiciel (Java, Spring Boot, Flutter, C#, Docker).",
        en: "Portfolio of Razafindrakoto Zo Nantenaina, first-year Master's student in Computer Science at IT University Madagascar. " +
            "Specialized in web, mobile and software development (Java, Spring Boot, Flutter, C#, Docker).",
    } as Localized,
    email: "razafindrakotozo0@gmail.com",
    linkedin: "https://www.linkedin.com/in/zo-nantenaina-razafindrakoto-9086a7362",
    github: "https://github.com/Nate10raz",
    photo: "https://res.cloudinary.com/dkddygjxy/image/upload/v1784061722/RAZAFINDRAKOTO_Zo_Nantenaina_-_DEV-50_uy46yy.png",

    // CV hébergé sur Cloudinary. Pour le mettre à jour : Media Library >
    // CV_Zo_Nantenaina > "Replace" (garde le même Public ID, donc la même URL).
    cvSourceUrl: "https://res.cloudinary.com/dkddygjxy/image/upload/CV_Zo_Nantenaina.pdf",
    cvFileName: "CV_Razafindrakoto_Zo_Nantenaina.pdf",

    // Devise affichée dans le pied de page
    motto: {
        fr: "La technologie est un outil, pas une fin en soi. Utilisez-la pour créer, pas pour détruire.",
        en: "Technology is a tool, not an end in itself. Use it to create, not to destroy.",
    } as Localized,

    // Badge de disponibilité du Hero. Mettre `open: false` pour le masquer.
    availability: {
        open: true,
        status: { fr: "Disponible immédiatement", en: "Available now" } as Localized,
        lookingFor: [
            { fr: "Alternance", en: "Work-study" },
            { fr: "CDI / CDD", en: "Full-time / Fixed-term" },
        ] as Localized[],
        workModes: [
            "Antananarivo",
            { fr: "Télétravail", en: "Remote" },
            { fr: "Hybride", en: "Hybrid" },
        ] as Localized[],
    },
};
