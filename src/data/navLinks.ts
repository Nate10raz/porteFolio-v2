// Liens de la navbar. Les libellés sont dans src/i18n/dictionaries (clé nav.<key>).
// target : "#ancre" = section de l'accueil, "/chemin" = page (préfixée selon la langue).

export const navLinks = [
    { key: "about", target: "#about" },
    { key: "experience", target: "#experience" },
    { key: "parcours", target: "#parcours" },
    { key: "skills", target: "#skills" },
    { key: "projects", target: "#projects" },
    { key: "blog", target: "/blog" },
    { key: "contact", target: "#contact" },
] as const;
