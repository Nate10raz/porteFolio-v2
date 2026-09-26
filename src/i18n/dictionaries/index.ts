import type { Locale } from "@/i18n/config";
import { fr, type Dictionary } from "./fr";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
    return dictionaries[lang];
}

// Remplace les {variables} d'un texte : fill("{count} projets", { count: 3 })
export function fill(text: string, values: Record<string, string | number>) {
    return text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));
}

export type { Dictionary };
