const linkClass = 'inline-flex items-center gap-2 rounded-[20px] border border-mist px-[1.2rem] py-2 font-sans text-[0.85rem] text-fog transition-all duration-300 hover:border-accent hover:text-accent';

export type ProjectLinksLabels = { demo: string; code: string; privateCode: string; privateRepo: string };

// Liens externes d'un projet : démo en ligne + code source (ou "privé").
export default function ProjectLinks({ githubUrl, demoUrl, labels }: { githubUrl?: string; demoUrl?: string; labels: ProjectLinksLabels }) {
    return (
        <>
            {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <i className="bi bi-box-arrow-up-right text-base"></i> {labels.demo}
                </a>
            )}

            {githubUrl ? (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <i className="bi bi-github text-base"></i> {labels.code}
                </a>
            ) : (
                <span className="group/github relative inline-flex cursor-not-allowed items-center gap-2 rounded-[20px] border border-dashed border-forest px-[1.2rem] py-2 font-sans text-[0.85rem] text-text-muted opacity-50 transition-opacity duration-300 select-none hover:opacity-75">
                    <i className="bi bi-github text-base"></i> {labels.privateCode}

                    {/* Tooltip + petite flèche */}
                    <span role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-lg border border-forest bg-deep px-[0.7rem] py-[0.3rem] text-xs whitespace-nowrap text-fog opacity-0 transition-opacity duration-250 group-hover/github:opacity-100">
                        {labels.privateRepo}
                    </span>
                    <span className="pointer-events-none absolute bottom-[calc(100%+2px)] left-1/2 -translate-x-1/2 border-5 border-transparent border-t-forest opacity-0 transition-opacity duration-250 group-hover/github:opacity-100"></span>
                </span>
            )}
        </>
    );
}
