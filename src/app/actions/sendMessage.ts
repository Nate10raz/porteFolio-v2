'use server';

import { Resend } from 'resend';
import { site } from '@/data/site';
import { CONTACT_LIMITS, SendMessageInput, SendMessageResult } from '@/lib/contact';
import { hasLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

const resend = new Resend(process.env.RESEND_API_KEY);

// Expéditeur : "onboarding@resend.dev" ne fonctionne qu'en test (envoi vers
// son propre compte uniquement). Une fois le domaine vérifié chez Resend,
// définir RESEND_FROM="Portfolio <contact@zonantenaina.tech>" dans l'environnement.
const FROM = process.env.RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>';
const TO = process.env.CONTACT_TO ?? site.email;

export async function sendMessage(
    data: SendMessageInput,
    lang: Locale = 'fr'
): Promise<SendMessageResult> {
    // Messages d'erreur dans la langue du visiteur
    const errors = getDictionary(hasLocale(lang) ? lang : 'fr').contact.errors;

    // Honeypot rempli = robot. On répond "succès" pour ne pas lui donner
    // d'indice, mais on n'envoie rien.
    if (data.zn_hp) {
        // Tracé dans les logs pour repérer un éventuel faux positif
        // (ex: autocomplétion du navigateur qui remplirait le champ).
        console.warn('Formulaire bloqué par le honeypot (probable robot) :', data.email);
        return { success: true };
    }

    // Validation côté serveur — TOUJOURS nécessaire : une Server Action peut
    // être appelée directement, sans passer par le formulaire.
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';

    if (!name || !email || !message) {
        return { success: false, error: errors.required };
    }

    if (
        name.length > CONTACT_LIMITS.name ||
        email.length > CONTACT_LIMITS.email ||
        message.length > CONTACT_LIMITS.message
    ) {
        return { success: false, error: errors.tooLong };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: errors.invalidEmail };
    }

    try {
        const { error } = await resend.emails.send({
            from: FROM,
            to: TO,
            replyTo: email,
            subject: `Nouveau message de ${name} — Portfolio${lang === 'en' ? ' (EN)' : ''}`,
            text: `De : ${name} (${email})\n\n${message}`,
        });

        if (error) {
            console.error('Erreur Resend :', error);
            return { success: false, error: errors.sendFailed };
        }

        return { success: true };
    } catch (err) {
        console.error('Erreur inattendue :', err);
        return { success: false, error: errors.unexpected };
    }
}
