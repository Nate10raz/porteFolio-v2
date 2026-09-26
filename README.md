# Portfolio — Razafindrakoto Zo Nantenaina (v2)

Portfolio personnel bilingue (français / anglais) : [zonantenaina.tech](https://www.zonantenaina.tech).

Version 2, reconstruite avec **Next.js 16** (App Router), **React 19**, **TypeScript** et **Tailwind CSS v4**.
La v1 (HTML / CSS / JS) reste disponible sur [Nate10raz/porteFolio](https://github.com/Nate10raz/porteFolio).

## Fonctionnalités

- Site bilingue : français à la racine (`/`), anglais sous `/en` — sélecteur FR | EN dans la navbar
- Sections : À propos, Expérience, Parcours, Compétences, Certifications, Projets, Recommandations, Blog, Contact
  (les sections sans contenu sont masquées automatiquement, la numérotation s'adapte)
- Page détaillée par projet (`/projets/<slug>`) avec étude de cas, visuels et chiffres clés
- Filtre des projets par technologie
- Blog en MDX avec coloration syntaxique (masqué tant qu'aucun article n'est publié)
- Formulaire de contact (Server Action + [Resend](https://resend.com)) avec protection anti-spam
- Téléchargement du CV (`/cv`, fichier hébergé sur Cloudinary)
- SEO : métadonnées par langue, `hreflang`, sitemap, robots.txt, données structurées, image d'aperçu générée

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

Créer un fichier `.env.local` à la racine (il n'est jamais commité) :

| Variable | Obligatoire | Rôle |
|---|---|---|
| `RESEND_API_KEY` | oui | Clé API Resend pour le formulaire de contact |
| `RESEND_FROM` | non | Expéditeur, une fois le domaine vérifié chez Resend (ex : `Portfolio <contact@zonantenaina.tech>`). Par défaut : `onboarding@resend.dev` (mode test) |
| `CONTACT_TO` | non | Adresse de réception des messages (par défaut : l'e-mail défini dans `src/data/site.ts`) |

## Modifier le contenu

Tout le contenu est dans `src/data/` ; les textes traduits s'écrivent `{ fr: "...", en: "..." }`.

| Fichier | Contenu |
|---|---|
| `src/data/site.ts` | Nom, liens, photo, CV, devise, badge de disponibilité |
| `src/data/experiences.ts` | Expériences professionnelles |
| `src/data/education.ts` | Parcours (formation) |
| `src/data/skills.ts` | Compétences |
| `src/data/projects.tsx` | Projets (le premier est le « projet phare ») + modèle d'étude de cas |
| `src/data/certifications.ts` | Certifications et formations |
| `src/data/recommendations.ts` | Recommandations (avec l'accord des personnes citées) |
| `src/i18n/dictionaries/` | Textes de l'interface (`fr.ts`, `en.ts`) |
| `src/content/blog/` | Articles du blog (`.mdx`, `draft: true` = visible seulement en local) |

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lancer le build de production |
| `npm run lint` | Vérification ESLint |

## Déploiement

Déployé sur [Vercel](https://vercel.com) : chaque push sur `main` déclenche un déploiement.
Penser à définir `RESEND_API_KEY` dans les variables d'environnement du projet Vercel.
