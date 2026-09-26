import type { Localized } from "@/i18n/config";

// Recommandations (encadrant de stage, professeur, collègue...).
// ⚠️ N'ajoute une citation qu'avec l'ACCORD de la personne, idéalement en reprenant
// mot pour mot une recommandation écrite (ex: recommandation LinkedIn).
// La section n'apparaît sur le site que si la liste n'est pas vide.

export type Recommendation = {
    id: number;
    quote: Localized;      // idéalement dans la langue d'origine + une traduction
    author: string;
    role: Localized;       // ex: { fr: "Encadrant de stage", en: "Internship supervisor" }
    organization: string;  // ex: "Orange Digital Center"
    linkedin?: string;     // profil LinkedIn de la personne (renforce la crédibilité)
    photo?: string;        // URL Cloudinary, sinon ses initiales sont affichées
};

export const recommendations: Recommendation[] = [
    // Exemple :
    // {
    //     id: 1,
    //     quote: "Zo a fait preuve d'une grande autonomie...",
    //     author: "Prénom Nom",
    //     role: "Encadrant de stage",
    //     organization: "Orange Digital Center",
    //     linkedin: "https://www.linkedin.com/in/...",
    // },
];
