// Styles de boutons partagés (ex-.btn-forest / .btn-forest-outline).
// Utilisables sur <a> comme sur <button> : className={btnForest}

const btnBase = `
    relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden
    rounded-full border-2 border-mist px-8 py-3.5 sm:px-10 sm:py-4
    font-sans text-[0.9rem] leading-normal font-semibold uppercase tracking-[1px] text-fog
    transition-all duration-400 ease-in-out
    hover:-translate-y-[3px] hover:border-accent hover:text-fog
    hover:shadow-[0_10px_30px_rgba(44,93,102,0.4)]
    before:absolute before:top-0 before:-left-full before:size-full
    before:bg-linear-to-r before:from-transparent before:via-fog/20 before:to-transparent
    before:transition-[left] before:duration-600 hover:before:left-full
    disabled:pointer-events-none disabled:opacity-60
`;

export const btnForest = `${btnBase} bg-linear-135 from-forest to-deep`;

export const btnForestOutline = `${btnBase} bg-transparent hover:bg-forest`;
