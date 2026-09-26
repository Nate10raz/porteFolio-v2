// Règles du formulaire de contact, partagées entre le client (maxLength,
// compteur) et le serveur (validation réelle dans sendMessage).

export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    message: 5000,
};

export type SendMessageInput = {
    name: string;
    email: string;
    message: string;
    // Honeypot : champ caché, invisible pour un humain. Les robots qui
    // remplissent tous les champs le remplissent aussi → on les ignore.
    zn_hp: string;
};

export type SendMessageResult =
    | { success: true }
    | { success: false; error: string };
