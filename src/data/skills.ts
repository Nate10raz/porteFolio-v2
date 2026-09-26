import type { Localized } from "@/i18n/config";

// Compétences techniques, par catégorie.
// Textes traduits : { fr: "...", en: "..." } ; une simple chaîne sert pour les deux langues.

export type SkillCategoryData = {
    id: number;
    icon: string;
    title: Localized;
    skills: Localized[];
};

export const skillCategories: SkillCategoryData[] = [
    {
        id: 1,
        icon: "bi-code-slash",
        title: { fr: "Langages de Programmation", en: "Programming Languages" },
        skills: ["JavaScript", "Java", "C#", "PHP", "C/C++"],
    },
    {
        id: 2,
        icon: "bi-window-stack",
        title: { fr: "Frameworks & Bibliothèques", en: "Frameworks & Libraries" },
        skills: ["Spring Boot", ".Net Framework", "Flutter", "Node.js", "Express.js", "Bootstrap"],
    },
    {
        id: 3,
        icon: "bi-database",
        title: { fr: "Bases de Données", en: "Databases" },
        skills: ["MySQL", "PostgreSQL", "SqlServer", "Oracle", "MongoDB"],
    },
    {
        id: 4,
        icon: "bi-tools",
        title: { fr: "Outils & Technologies", en: "Tools & Technologies" },
        skills: ["Git", "Docker", "Linux", "VS Code", { fr: "Produits JetBrain", en: "JetBrains products" }],
    },
    {
        id: 5,
        icon: "bi-cloud",
        title: { fr: "Service Cloud", en: "Cloud Services" },
        skills: ["Firebase", { fr: "AWS Service", en: "AWS services" }],
    },
];
