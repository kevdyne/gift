import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Stars = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const layers = [
            // Far layer: tiny, dim, very slow
            { count: 80, sizeMin: 0.8, sizeMax: 1.5, opMin: 0.15, opMax: 0.35, speedMin: 80, speedMax: 120 },
            // Mid layer: medium size and speed
            { count: 50, sizeMin: 1.5, sizeMax: 2.5, opMin: 0.35, opMax: 0.65, speedMin: 40, speedMax: 70 },
            // Near layer: large, bright, fast
            { count: 20, sizeMin: 2.5, sizeMax: 4, opMin: 0.55, opMax: 1.0, speedMin: 20, speedMax: 40 },
        ];

        let id = 0;
        const allStars = layers.flatMap((layer, layerIdx) =>
            Array.from({ length: layer.count }).map(() => ({
                id: id++,
                layer: layerIdx,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
                opacity: layer.opMin + Math.random() * (layer.opMax - layer.opMin),
                duration: layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
            }))
        );
        setStars(allStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.layer === 2 ? 0.9 : star.layer === 1 ? 0.6 : 0.3})`,
                    }}
                    animate={{
                        opacity: [star.opacity, star.opacity + 0.2, star.opacity],
                        x: ["-10vw", "100vw"],
                        y: ["-10vh", "100vh"],
                    }}
                    transition={{
                        opacity: {
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        x: {
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        },
                        y: {
                            duration: star.duration * 1.5,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }
                    }}
                />
            ))}
            {/* Shooting Star */}
            <motion.div
                className="absolute top-0 right-0 w-[200px] h-[2px] bg-gradient-to-l from-transparent via-white to-transparent"
                animate={{
                    x: [-500, 1000],
                    y: [0, 500],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatDelay: 5,
                }}
                style={{ rotate: '45deg' }}
            />
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-[#050510] relative overflow-hidden text-slate-100 font-sans selection:bg-rose-500/30">
            {/* Deep Night Sky Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_#1a1a40, _#050510_70%)] pointer-events-none" />
            <Stars />

            <header className="fixed top-8 center w-full z-50 flex justify-center pointer-events-none">
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    src="/header.png"
                    alt="happy b.dei Viah"
                    className="h-40 md:h-60 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />
            </header>

            <main className="relative z-10 min-h-screen w-full relative">
                {children}
            </main>

            <footer className="fixed bottom-0 left-0 w-full p-4 z-40 flex justify-center backdrop-blur-sm">
                <p className="text-sm font-light tracking-wider opacity-60 mix-blend-overlay">
                    Cheers!🥂.. kevn🥱
                </p>
            </footer>
        </div>
    );
};

export default Layout;
