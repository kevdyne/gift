import React, { useEffect, useRef, useCallback } from 'react';

const SparkleTrail = () => {
    const containerRef = useRef(null);
    const lastSpawnTime = useRef(0);
    const activeCount = useRef(0);

    const THROTTLE_MS = 35;
    const MAX_SPARKLES = 40;

    const colors = [
        'rgba(255, 255, 255, 0.9)',
        'rgba(255, 215, 100, 0.9)',
        'rgba(255, 180, 200, 0.9)',
        'rgba(200, 180, 255, 0.9)',
    ];

    const spawnSparkle = useCallback((x, y) => {
        if (activeCount.current >= MAX_SPARKLES) return;
        const container = containerRef.current;
        if (!container) return;

        activeCount.current++;

        const sparkle = document.createElement('div');
        const size = 3 + Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const driftX = (Math.random() - 0.5) * 20;
        const driftY = Math.random() * 15 + 5;
        const animDuration = 500 + Math.random() * 300;

        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: sparkle-fade ${animDuration}ms ease-out forwards;
            --drift-x: ${driftX}px;
            --drift-y: ${driftY}px;
        `;

        container.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
            activeCount.current--;
        }, animDuration);
    }, []);

    useEffect(() => {
        const handlePointerMove = (e) => {
            const now = Date.now();
            if (now - lastSpawnTime.current < THROTTLE_MS) return;
            lastSpawnTime.current = now;

            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const y = e.clientY ?? e.touches?.[0]?.clientY;
            if (x != null && y != null) {
                spawnSparkle(x, y);
            }
        };

        document.addEventListener('pointermove', handlePointerMove, { passive: true });
        document.addEventListener('touchmove', handlePointerMove, { passive: true });

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('touchmove', handlePointerMove);
        };
    }, [spawnSparkle]);

    return (
        <>
            <style>{`
                @keyframes sparkle-fade {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--drift-x), var(--drift-y)) scale(0.1);
                    }
                }
            `}</style>
            <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
        </>
    );
};

export default SparkleTrail;
