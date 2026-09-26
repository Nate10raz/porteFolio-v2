import { SectionProps } from "@/components/sectionProps";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ContactLink from "@/components/ContactLink";
import ContactForm from "@/components/Contactform";
import { btnForest } from "@/styles/buttons";
import { getDictionary } from "@/i18n/dictionaries";

export type ContactLinkData = {
    icon: string;
    label: string;
    href: string;
}

type ContactInfo = {
    contactLinks: ContactLinkData[];
}

export default function Contact({ contactInfo, number, dark, lang }: SectionProps & { contactInfo: ContactInfo }) {
    const t = getDictionary(lang);

    return(
        <Section id="contact" dark={dark}>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <SectionHeader number={number} title={t.sections.contact} centered/>
                    </div>

                    {/* Deux colonnes côte à côte sur desktop, empilées sur mobile */}
                    <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
                        {/* Coordonnées */}
                        <div className="text-center lg:text-left">
                            <p className="mb-10 text-[1.2rem] leading-[1.8] text-text-muted">
                                {t.contact.text}
                            </p>

                            <div className="mb-10 flex flex-col gap-6">
                                {contactInfo.contactLinks.map(link => (
                                    <ContactLink key={link.label} contactLink={link} zeroLabel={t.contact.zero}/>
                                ))}
                            </div>

                            <a href="/cv" download className={btnForest}>
                                <i className="bi bi-download"></i> {t.contact.downloadCv}
                            </a>
                        </div>

                        {/* Formulaire */}
                        <ContactForm lang={lang} labels={t.contact.form}/>
                    </div>
                </div>
            </div>
        </Section>
    );
}
