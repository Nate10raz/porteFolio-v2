import type { BadgeType } from "@/data/education";

// Élément de la timeline, avec des textes déjà traduits
export type TimelineItemData = {
    id: number;
    year: string;
    icon: string;
    title: string;
    subtitleIcon: string;
    subtitle: string;
    description: string;
    badge: string;
    badgeType: BadgeType;
    current: boolean;
};

const badgeStyles: Record<BadgeType, string> = {
    academic: 'border-forest bg-forest/40 text-mist',
    language: 'border-accent/30 bg-accent/10 text-accent',
    current: 'border-accent bg-linear-135 from-accent/20 to-accent/5 text-accent shadow-[0_0_10px_rgba(93,211,158,0.2)]',
};

export default function TimeLineItem({ item, currentLabel }: { item: TimelineItemData; currentLabel: string }) {
    return (
        <div className="group relative mb-14 flex gap-6 last:mb-0 lg:gap-10">
            {/* Marqueur */}
            <div className="relative flex shrink-0 flex-col items-center">
                <div
                    className={`
                        relative z-2 flex size-[46px] items-center justify-center rounded-full border-2
                        bg-linear-135 transition-all duration-400 group-hover:scale-110 lg:size-[58px]
                        ${
                            item.current
                                ? 'border-accent from-forest to-accent shadow-[0_0_25px_rgba(93,211,158,0.4)]'
                                : 'border-mist from-forest to-deep group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(93,211,158,0.3)]'
                        }
                    `}
                >
                    <i className={`${item.icon} text-[1.4rem] ${item.current ? 'text-abyss' : 'text-accent'}`}></i>
                </div>
                {item.current && (
                    <div className="absolute top-1/2 left-1/2 z-1 size-[46px] -translate-x-1/2 -translate-y-1/2 animate-timeline-pulse rounded-full border-2 border-accent motion-reduce:hidden lg:size-[58px]"></div>
                )}
            </div>

            {/* Contenu */}
            <div className="flex-1 pt-3">
                <div className="mb-3 font-sans text-[0.85rem] font-semibold tracking-[2px] text-accent uppercase">
                    {item.year}
                </div>
                <div
                    className={`
                        relative overflow-hidden rounded-2xl border-2 bg-deep/35
                        px-[1.4rem] py-[1.2rem] sm:px-8 sm:py-[1.8rem]
                        transition-all duration-400 ease-in-out
                        group-hover:translate-x-[5px] group-hover:shadow-[0_10px_35px_rgba(44,93,102,0.2)]
                        before:absolute before:top-0 before:-left-full before:size-full
                        before:bg-linear-to-r before:from-transparent before:via-accent/7 before:to-transparent
                        before:transition-[left] before:duration-700 group-hover:before:left-full
                        ${
                            item.current
                                ? 'border-accent shadow-[0_0_30px_rgba(93,211,158,0.1)]'
                                : 'border-forest group-hover:border-mist'
                        }
                    `}
                >
                    {item.current && (
                        <div className="mb-3 inline-flex items-center gap-2 font-sans text-[0.78rem] font-semibold tracking-[1.5px] text-accent uppercase">
                            <span className="size-2 animate-dot-blink rounded-full bg-accent"></span>
                            {currentLabel}
                        </div>
                    )}
                    <h3 className="mb-2 font-display text-[1.2rem] font-bold text-fog sm:text-[1.4rem]">
                        {item.title}
                    </h3>
                    <p className="mb-4 flex items-center gap-1.5 font-sans text-[0.9rem] text-mist">
                        <i className={`${item.subtitleIcon} text-[0.85rem] text-accent`}></i>
                        {item.subtitle}
                    </p>
                    <p className="mb-5 text-base leading-[1.7] text-text-muted">
                        {item.description}
                    </p>
                    <span className={`rounded-[20px] border px-[0.9rem] py-[0.3rem] font-sans text-xs font-semibold tracking-[1px] uppercase ${badgeStyles[item.badgeType]}`}>
                        {item.badge}
                    </span>
                </div>
            </div>
        </div>
    );
}
