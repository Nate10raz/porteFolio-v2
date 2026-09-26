const badgeClass = `
    rounded-[20px] border px-[1.2rem] py-2 font-sans text-[0.85rem] font-medium
    transition-all duration-300
    hover:-translate-y-0.5 hover:border-accent hover:bg-none hover:bg-deep hover:text-accent
    hover:shadow-[0_0_12px_rgba(93,211,158,0.3),0_4px_15px_rgba(0,0,0,0.2)]
    hover:[text-shadow:0_0_6px_rgba(93,211,158,0.35)]
`;

// Badge de technologie. Avec `onClick`, il devient un bouton de filtre
// (et `active` le met en surbrillance) ; sinon c'est une simple étiquette.
// `title` : infobulle du bouton (déjà traduite).
export default function TechBadge({
                                      name,
                                      active = false,
                                      onClick,
                                      title,
                                  }: {
    name: string;
    active?: boolean;
    onClick?: (name: string) => void;
    title?: string;
}) {
    const stateClass = active
        ? 'border-accent bg-deep text-accent shadow-[0_0_12px_rgba(93,211,158,0.3)]'
        : 'border-mist bg-linear-135 from-forest to-deep text-fog';

    if (!onClick) {
        return <span className={`${badgeClass} ${stateClass}`}>{name}</span>;
    }

    return (
        <button
            type="button"
            onClick={() => onClick(name)}
            aria-pressed={active}
            title={title}
            className={`${badgeClass} ${stateClass} cursor-pointer`}
        >
            {name}
        </button>
    );
}
