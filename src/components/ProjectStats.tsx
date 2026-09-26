// Chiffres clés d'un projet (durée, équipe, utilisateurs...), textes déjà traduits
export default function ProjectStats({ stats, className = '' }: { stats: { value: string; label: string }[]; className?: string }) {
    return (
        <dl className={`grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] ${className}`}>
            {stats.map((stat) => (
                // flex-col-reverse : la valeur s'affiche au-dessus du libellé,
                // tout en gardant l'ordre sémantique <dt> puis <dd>
                <div key={stat.label} className="flex flex-col-reverse rounded-2xl border border-forest bg-deep/40 px-5 py-4">
                    <dt className="font-sans text-[0.8rem] tracking-[1px] text-text-muted uppercase">{stat.label}</dt>
                    <dd className="font-display text-[1.8rem] leading-tight font-bold text-accent">{stat.value}</dd>
                </div>
            ))}
        </dl>
    );
}
