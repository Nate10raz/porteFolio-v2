export default function SectionHeader({
                                          number,
                                          title,
                                          centered = false,
                                      }: {
    number: string;
    title: string;
    centered?: boolean;
}) {
    return (
        <div className="relative mb-20">
            <span className="mb-4 block font-display text-base font-semibold tracking-[2px] text-accent">
                {number}
            </span>
            <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-fog">
                {title}
            </h2>
            <div className={`h-[3px] w-20 rounded-sm bg-linear-to-r from-accent to-forest ${centered ? 'mx-auto' : ''}`}></div>
        </div>
    );
}
