'use client';

import { useEffect, useRef, useState } from 'react';

// Fait apparaître son contenu en fondu (+ léger glissement vers le haut)
// la première fois qu'il entre dans l'écran. `delay` (en secondes) permet
// de décaler les éléments d'une liste pour un effet "en cascade".
export default function Reveal({
                                   children,
                                   delay = 0,
                                   className = '',
                               }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // une seule fois
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}s` }}
            className={`
                transition-all duration-800 ease-in-out
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
