import type { Localized } from "@/i18n/config";

// Certifications et formations complémentaires (cours en ligne, badges...).
// La section "Certifications" n'apparaît sur le site que si la liste n'est pas vide.
// Textes traduits : { fr: "...", en: "..." } ; une simple chaîne sert pour les deux langues.

export type Certification = {
    id: number;
    name: Localized;        // ex: "AWS Certified Cloud Practitioner"
    issuer: string;         // ex: "Amazon Web Services", "Coursera", "OpenClassrooms"
    date: Localized;        // ex: { fr: "Mars 2026", en: "March 2026" }
    kind: 'certification' | 'formation';
    credentialUrl?: string; // lien de vérification (Credly, Coursera...)
    badge?: string;         // image du badge (URL Cloudinary), sinon une icône est affichée
    skills?: Localized[];
};

export const certifications: Certification[] = [
    // Exemple :
    // {
    //     id: 1,
    //     name: "AWS Certified Cloud Practitioner",
    //     issuer: "Amazon Web Services",
    //     date: "Mars 2026",
    //     kind: "certification",
    //     credentialUrl: "https://www.credly.com/badges/...",
    //     skills: ["Cloud", "AWS"],
    // },
];
