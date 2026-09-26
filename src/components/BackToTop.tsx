'use client';

import { useState, useEffect } from 'react';

export default function BackToTop({ label }: { label: string }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 400);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function scrolleToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <button
            id="backToTop"
            aria-label={label}
            onClick={scrolleToTop}
            className={`
                fixed bottom-8 right-8 z-999
                flex h-12.5 w-12.5 items-center justify-center
                rounded-full border-2 border-mist
                bg-linear-to-br from-forest to-deep
                text-accent text-xl cursor-pointer
                shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                transition-all duration-400 ease-in-out
                hover:border-accent hover:text-fog hover:-translate-y-1
                hover:shadow-[0_0_20px_rgba(93,211,158,0.4),0_4px_20px_rgba(0,0,0,0.3)]
                ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}
              `}
        >
            <i className="bi bi-arrow-up"></i>
        </button>
    );
}