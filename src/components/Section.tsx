import Reveal from "@/components/Reveal";

// dark : fond en dégradé (abyss → deep) avec un fin liseré en haut,
// pour faire alterner visuellement les sections. Légèrement transparent pour
// laisser voir le réseau de neurones animé en fond de la page d'accueil.
const darkClass = `
    relative bg-linear-to-b from-abyss/70 to-deep/70
    before:absolute before:inset-x-0 before:top-0 before:h-px
    before:bg-linear-to-r before:from-transparent before:via-forest before:to-transparent
`;

export default function Section({id, children, dark = false}: {
    id: string;
    children: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <section id={id} className={`py-15 sm:py-20 lg:py-30 ${dark ? darkClass : ''}`}>
            <Reveal>{children}</Reveal>
        </section>
    );
}
