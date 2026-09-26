import {ContactLinkData} from "@/components/Contact";

// Encadre chaque "0" d'une adresse email (avec une infobulle "zéro" / "zero") pour
// qu'on ne le confonde pas avec la lettre "o" (ex: razafindrakotozo0).
function highlightZeros(text: string, zeroLabel: string) {
    return text.split(/(0)/).map((part, index) =>
        part === '0' ? (
            <span
                key={index}
                className="group/zero relative inline-block rounded-md border-2 border-accent bg-[rgba(110,255,236,0.12)] px-[0.2em] font-mono font-bold text-fog slashed-zero"
            >
                0
                <span role="tooltip" className="pointer-events-none absolute -top-[0.6rem] left-1/2 -translate-x-1/2 -translate-y-full rounded-md border border-forest bg-deep px-2 py-1 font-sans text-xs font-normal whitespace-nowrap text-fog opacity-0 transition-all duration-200 group-hover/zero:-translate-y-[110%] group-hover/zero:opacity-100">
                    {zeroLabel}
                </span>
                <span className="pointer-events-none absolute -top-[0.2rem] left-1/2 -translate-x-1/2 border-6 border-transparent border-t-deep opacity-0 transition-opacity duration-200 group-hover/zero:opacity-100"></span>
            </span>
        ) : (
            part
        )
    );
}

export default function ContactLink({ contactLink, zeroLabel }: { contactLink: ContactLinkData; zeroLabel: string }) {
    const isEmail = contactLink.href.includes("@") && !contactLink.href.startsWith("http");
    const href = isEmail ? `mailto:${contactLink.href}` : contactLink.href;

    return (
        <a
            href={href}
            className="
                flex items-center gap-4 rounded-[15px] border-2 border-forest bg-deep/40
                px-8 py-[1.2rem] font-sans text-[1.1rem] text-fog
                transition-all duration-400
                hover:translate-x-2.5 hover:border-accent hover:bg-forest
                hover:shadow-[0_10px_30px_rgba(44,93,102,0.3)]
            "
            {...(!isEmail && { target: "_blank", rel: "noopener noreferrer" })}
        >
            <i className={`${contactLink.icon} text-2xl text-accent`}></i>
            <span>
                <strong>{isEmail ? highlightZeros(contactLink.label, zeroLabel) : contactLink.label}</strong>
            </span>
        </a>
    );
}
