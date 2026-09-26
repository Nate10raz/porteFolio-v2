import { ImageResponse } from 'next/og';
import { site } from '@/data/site';
import { hasLocale, tr } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image d'aperçu affichée quand le lien est partagé (LinkedIn, WhatsApp, Slack...).
// Générée au build, reprend la palette "Dark Forest" du site.
export const alt = tr(site.title, 'fr');
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const role = getDictionary(hasLocale(lang) ? lang : 'fr').hero.role;

    // Police des titres du site (Cinzel, licence OFL), lue au moment du build
    const cinzel = await readFile(join(process.cwd(), 'src/assets/fonts/Cinzel-Bold.ttf'));

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom, #041416 0%, #0b3238 50%, #041416 100%)',
                    color: '#cdeeed',
                    fontFamily: 'Cinzel',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        padding: '12px 28px',
                        marginBottom: 48,
                        border: '3px solid #6f9fa5',
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #2c5d66, #0b3238)',
                        fontSize: 56,
                        fontWeight: 700,
                        letterSpacing: 4,
                    }}
                >
                    ZN
                </div>
                <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: 2 }}>
                    Razafindrakoto
                </div>
                <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#5dd39e', letterSpacing: 2 }}>
                    Zo Nantenaina
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 40,
                        fontSize: 30,
                        letterSpacing: 8,
                        textTransform: 'uppercase',
                        color: '#6f9fa5',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {role}
                </div>
                <div style={{ display: 'flex', width: 120, height: 4, marginTop: 36, borderRadius: 2, background: 'linear-gradient(to right, #5dd39e, #2c5d66)' }} />
            </div>
        ),
        {
            ...size,
            fonts: [{ name: 'Cinzel', data: cinzel, style: 'normal', weight: 700 }],
        }
    );
}
