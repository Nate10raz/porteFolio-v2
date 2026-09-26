'use client';

import { useState } from 'react';
import { sendMessage } from '@/app/actions/sendMessage';
import { btnForest } from '@/styles/buttons';
import { CONTACT_LIMITS, SendMessageInput } from '@/lib/contact';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

const labelClass = 'mb-2 block font-sans text-sm font-semibold uppercase tracking-[1.5px] text-mist';
const fieldClass = 'w-full rounded-xl border-2 border-forest bg-deep/40 px-4 py-3 font-sans text-base text-fog outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(93,211,158,0.15)] disabled:opacity-60';

type Status = 'idle' | 'loading' | 'success' | 'error';

const emptyForm: SendMessageInput = { name: '', email: '', message: '', zn_hp: '' };

export default function ContactForm({ lang, labels }: { lang: Locale; labels: Dictionary['contact']['form'] }) {
    const [formData, setFormData] = useState<SendMessageInput>(emptyForm);
    const [status, setStatus] = useState<Status>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const result = await sendMessage(formData, lang);

        if (result.success) {
            setStatus('success');
            setFormData(emptyForm);
        } else {
            setStatus('error');
            setErrorMessage(result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative rounded-2xl border border-forest bg-deep/30 p-6 text-left sm:p-8">
            <div className="mb-5">
                <label htmlFor="name" className={labelClass}>
                    {labels.name}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={CONTACT_LIMITS.name}
                    autoComplete="name"
                    className={fieldClass}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className={labelClass}>
                    {labels.email}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={CONTACT_LIMITS.email}
                    autoComplete="email"
                    className={fieldClass}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="message" className={labelClass}>
                    {labels.message}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={CONTACT_LIMITS.message}
                    className={fieldClass}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <p className="mt-1 text-right font-sans text-xs text-text-muted">
                    {formData.message.length} / {CONTACT_LIMITS.message}
                </p>
            </div>

            {/* Honeypot anti-spam : hors écran, ignoré par les lecteurs d'écran
                et la navigation clavier. Un humain ne le remplit jamais. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="zn_hp">{labels.honeypot}</label>
                <input
                    type="text"
                    id="zn_hp"
                    name="zn_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    // Demande aux gestionnaires de mots de passe (1Password, LastPass,
                    // Bitwarden) de ne pas toucher à ce champ
                    data-1p-ignore
                    data-lpignore="true"
                    data-bwignore

                    value={formData.zn_hp}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className={btnForest}
                disabled={status === 'loading'}
            >
                {status === 'loading' ? labels.sending : labels.send}
            </button>

            {status === 'success' && (
                <p role="status" className="mt-4 font-sans text-[0.95rem] text-accent">
                    {labels.success}
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="mt-4 font-sans text-[0.95rem] text-red-300">{errorMessage}</p>
            )}
        </form>
    );
}