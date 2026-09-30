'use client';

import { useEffect, useRef } from 'react';

// Fond animé "réseau de neurones" du Hero (canvas 2D, sans librairie).
//
// - Des points (neurones) dérivent lentement et se relient quand ils sont proches.
// - Effet de profondeur (pseudo-3D) : chaque point a une profondeur z ∈ [0, 1] ;
//   les points "lointains" sont plus petits, plus pâles et plus lents, et se
//   décalent moins avec le curseur (parallaxe).
// - Le curseur attire légèrement les neurones proches et se relie à eux.
//
// Garde-fous de performance :
// - nombre de points selon la taille de l'écran (≈ 35 sur mobile, 70 max) ;
// - lignes regroupées par niveau de transparence : quelques appels de dessin
//   par image au lieu d'un par ligne ;
// - pause quand le Hero n'est plus visible ou quand l'onglet est en arrière-plan ;
// - netteté plafonnée (devicePixelRatio ≤ 1.5) ;
// - "réduire les animations" activé → une seule image fixe, aucune boucle.

const LINK_DISTANCE = 140;   // distance max (px) pour relier deux neurones
const MOUSE_RADIUS = 180;    // rayon d'influence du curseur (px)
const PARALLAX = 18;         // décalage max (px) des points proches selon le curseur
const BUCKETS = 6;           // niveaux de transparence des liaisons (regroupement des tracés)

type Neuron = { x: number; y: number; z: number; vx: number; vy: number };

// variant :
//  - "hero" : dans un conteneur (position absolue), ex. le Hero seul ;
//  - "page" : fixé derrière toute la page (reste en place pendant le scroll).
export default function NeuralBackground({ variant = 'hero' }: { variant?: 'hero' | 'page' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        let width = 0;
        let height = 0;
        let neurons: Neuron[] = [];
        let frame = 0;
        let isVisible = true;
        const mouse = { x: 0, y: 0, active: false };

        function resize() {
            const rect = canvas!.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas!.width = Math.round(width * dpr);
            canvas!.height = Math.round(height * dpr);
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

            // ≈ 1 neurone pour 16 000 px², entre 35 et 70
            const count = Math.round(Math.min(70, Math.max(35, (width * height) / 16000)));
            neurons = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random(),
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
            }));
        }

        function draw() {
            ctx!.clearRect(0, 0, width, height);

            // Décalage de parallaxe : le curseur "incline" légèrement la scène
            const offsetX = mouse.active ? (mouse.x / width - 0.5) * -2 : 0;
            const offsetY = mouse.active ? (mouse.y / height - 0.5) * -2 : 0;

            // Positions affichées (avec parallaxe proportionnelle à la profondeur)
            const points = neurons.map((n) => {
                const depth = 0.35 + 0.65 * n.z; // 0.35 (loin) → 1 (proche)
                return {
                    x: n.x + offsetX * PARALLAX * depth,
                    y: n.y + offsetY * PARALLAX * depth,
                    depth,
                };
            });

            // Liaisons entre neurones proches, regroupées en BUCKETS niveaux de
            // transparence : un seul tracé (stroke) par niveau au lieu d'un par ligne.
            const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);
            const maxDistSq = LINK_DISTANCE * LINK_DISTANCE;
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxDistSq) {
                        const strength = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * Math.min(points[i].depth, points[j].depth);
                        const bucket = Math.min(BUCKETS - 1, Math.floor(strength * BUCKETS));
                        buckets[bucket].push(points[i].x, points[i].y, points[j].x, points[j].y);
                    }
                }
            }
            ctx!.lineWidth = 1;
            buckets.forEach((segments, bucket) => {
                if (!segments.length) return;
                ctx!.strokeStyle = `rgba(93, 211, 158, ${((bucket + 0.5) / BUCKETS) * 0.35})`;
                ctx!.beginPath();
                for (let k = 0; k < segments.length; k += 4) {
                    ctx!.moveTo(segments[k], segments[k + 1]);
                    ctx!.lineTo(segments[k + 2], segments[k + 3]);
                }
                ctx!.stroke();
            });

            // Liaisons vers le curseur (les neurones proches "s'allument")
            if (mouse.active) {
                for (const p of points) {
                    const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                    if (dist < MOUSE_RADIUS) {
                        const alpha = (1 - dist / MOUSE_RADIUS) * 0.6 * p.depth;
                        ctx!.strokeStyle = `rgba(93, 211, 158, ${alpha})`;
                        ctx!.beginPath();
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(mouse.x, mouse.y);
                        ctx!.stroke();
                    }
                }
            }

            // Neurones
            for (const p of points) {
                const near = mouse.active && Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE_RADIUS;
                ctx!.fillStyle = near
                    ? `rgba(93, 211, 158, ${0.5 + 0.5 * p.depth})`   // accent quand proche du curseur
                    : `rgba(111, 159, 165, ${0.25 + 0.5 * p.depth})`; // brume sinon
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, 0.8 + 1.8 * p.depth, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        function update() {
            for (const n of neurons) {
                const speed = 0.4 + 0.6 * n.z; // les neurones lointains bougent moins vite

                // Légère attraction vers le curseur
                if (mouse.active) {
                    const dx = mouse.x - n.x;
                    const dy = mouse.y - n.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < MOUSE_RADIUS && dist > 1) {
                        const force = (1 - dist / MOUSE_RADIUS) * 0.02;
                        n.vx += (dx / dist) * force;
                        n.vy += (dy / dist) * force;
                    }
                }

                // Frottement : la vitesse revient doucement vers une dérive calme
                n.vx *= 0.99;
                n.vy *= 0.99;
                n.x += n.vx * speed;
                n.y += n.vy * speed;

                // Rebond sur les bords
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;
                n.x = Math.max(0, Math.min(width, n.x));
                n.y = Math.max(0, Math.min(height, n.y));

                // Garde une dérive minimale (sinon les points finiraient immobiles)
                if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.05;
                if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.05;
            }
        }

        function loop() {
            update();
            draw();
            frame = requestAnimationFrame(loop);
        }

        function start() {
            if (reduceMotion || frame || !isVisible || document.hidden) return;
            frame = requestAnimationFrame(loop);
        }

        function stop() {
            cancelAnimationFrame(frame);
            frame = 0;
        }

        // Le curseur est suivi sur toute la fenêtre (le canvas est sous le texte),
        // mais n'a d'effet que lorsqu'il survole le Hero.
        function onPointerMove(event: PointerEvent) {
            if (event.pointerType !== 'mouse') return;
            const rect = canvas!.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
            mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
        }

        function onPointerLeave() {
            mouse.active = false;
        }

        function onVisibilityChange() {
            if (document.hidden) stop();
            else start();
        }

        resize();
        draw(); // première image tout de suite (reste fixe si "réduire les animations")

        const resizeObserver = new ResizeObserver(() => {
            resize();
            draw();
        });
        resizeObserver.observe(canvas);

        // Pause dès que le Hero sort de l'écran
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) start();
            else stop();
        });
        intersectionObserver.observe(canvas);

        if (!reduceMotion) {
            window.addEventListener('pointermove', onPointerMove, { passive: true });
            document.documentElement.addEventListener('pointerleave', onPointerLeave);
            document.addEventListener('visibilitychange', onVisibilityChange);
        }
        start();

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener('pointermove', onPointerMove);
            document.documentElement.removeEventListener('pointerleave', onPointerLeave);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none inset-0 h-full w-full animate-[hero-fade-in_2s_var(--ease-in-out)_0.3s_both] ${
                variant === 'page' ? 'fixed -z-10' : 'absolute'
            }`}
        />
    );
}
