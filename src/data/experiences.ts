import type { Localized } from "@/i18n/config";

// Expériences professionnelles (stages, alternance, emplois...),
// de la plus récente à la plus ancienne.
// Les textes traduits s'écrivent { fr: "...", en: "..." } ; une simple chaîne
// est utilisée telle quelle dans les deux langues (ex: nom d'entreprise).

export type Experience = {
    id: number;
    role: Localized;          // intitulé du poste
    company: string;
    contractType: Localized;  // ex: "Stage de fin d'études", "Alternance", "CDI"
    period: Localized;
    location?: Localized;
    missions: Localized[];    // missions / réalisations principales
    tech: Localized[];
    projectSlug?: string;     // lien vers la page projet associée (/projets/<slug>)
};

export const experiences: Experience[] = [
    {
        id: 1,
        role: { fr: "Stagiaire développeur web & mobile", en: "Web & Mobile Developer Intern" },
        company: "Orange Digital Center",
        contractType: { fr: "Stage de fin d'études — Licence", en: "Final-year internship — Bachelor's" },
        period: { fr: "Juillet – Novembre 2025", en: "July – November 2025" },
        missions: [
            {
                fr: "Conception et développement d'une plateforme web et mobile de suivi de la consommation d'eau potable.",
                en: "Designed and developed a web and mobile platform for monitoring drinking water consumption.",
            },
            {
                fr: "Projet réalisé dans le cadre de l'Orange Summer Challenge 2025 (OSC25).",
                en: "Project carried out as part of the Orange Summer Challenge 2025 (OSC25).",
            },
            // À compléter : autres missions, réalisations, résultats...
        ],
        tech: [
            "Java Spring Boot",
            "Thymeleaf",
            { fr: "Java Natif (mobile)", en: "Native Java (mobile)" },
            "PostgreSQL",
            { fr: "service cloud AWS", en: "AWS cloud services" },
            "Git",
        ],
        projectSlug: "suivi-consommation-eau",
    },
];
