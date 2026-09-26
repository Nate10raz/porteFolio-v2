import { site } from "@/data/site";

// GET /cv : récupère le CV sur Cloudinary et le renvoie en téléchargement
// avec un nom de fichier propre. Comme la réponse vient de notre propre
// domaine, un simple <a href="/cv"> suffit côté client (pas de JS).
export async function GET() {
    const response = await fetch(site.cvSourceUrl);

    if (!response.ok || !response.body) {
        // Secours : on redirige vers le fichier Cloudinary directement
        return Response.redirect(site.cvSourceUrl, 302);
    }

    return new Response(response.body, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${site.cvFileName}"`,
            // Cache 1h côté CDN : un CV remplacé sur Cloudinary apparaît en moins d'une heure
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
