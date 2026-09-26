import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routage des langues (le "middleware" s'appelle "proxy" depuis Next.js 16).
//
//   /            → servi en français (réécriture interne vers /fr)
//   /projets/x   → servi en français (réécriture interne vers /fr/projets/x)
//   /en/...      → servi en anglais, tel quel
//   /fr/...      → redirigé vers /... (une seule URL publique par page française)
//
// Pas de redirection automatique selon la langue du navigateur : plus
// prévisible pour les visiteurs et pour Google. Le choix se fait via le
// sélecteur FR | EN de la navbar.
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/en' || pathname.startsWith('/en/')) {
        return NextResponse.next();
    }

    if (pathname === '/fr' || pathname.startsWith('/fr/')) {
        // Les images d'aperçu générées (/fr/opengraph-image) sont servies directement
        if (pathname.includes('/opengraph-image')) return NextResponse.next();

        const url = request.nextUrl.clone();
        url.pathname = pathname.replace(/^\/fr/, '') || '/';
        return NextResponse.redirect(url, 308);
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/fr' : `/fr${pathname}`;
    return NextResponse.rewrite(url);
}

export const config = {
    // Ignore les fichiers internes de Next.js, la route du CV et tout fichier
    // avec une extension (favicon.ico, sitemap.xml, robots.txt, images...)
    matcher: ['/((?!_next|cv|.*\\..*).*)'],
};
