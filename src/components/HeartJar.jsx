import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingPhrase from './FloatingPhrase';
import { phrases } from '../data/phrases';

const BurstParticle = ({ x, y, angle, onComplete, id }) => {
    const distance = 40 + Math.random() * 60;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    const size = 4 + Math.random() * 6;
    const isHeart = Math.random() > 0.5;

    return (
        <motion.div
            initial={{ x, y, opacity: 1, scale: 1 }}
            animate={{
                x: endX,
                y: endY + 20,
                opacity: 0,
                scale: 0.2,
            }}
            transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
            onAnimationComplete={() => onComplete(id)}
            className="fixed pointer-events-none z-[100]"
            style={{ fontSize: size }}
        >
            {isHeart ? '💖' : '✨'}
        </motion.div>
    );
};

const HeartJar = () => {
    const [activePhrases, setActivePhrases] = useState([]);
    const [burstParticles, setBurstParticles] = useState([]);

    const addPhrase = useCallback((e) => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        const newPhrase = {
            id: Date.now() + Math.random(),
            text: randomPhrase,
        };
        setActivePhrases((prev) => [...prev, newPhrase]);

        // Spawn burst particles from the tap position
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const particleCount = 8 + Math.floor(Math.random() * 5);
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: Date.now() + Math.random() + i,
            x: cx,
            y: cy,
            angle: (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5,
        }));
        setBurstParticles((prev) => [...prev, ...newParticles]);
    }, []);

    const removePhrase = (id) => {
        setActivePhrases((prev) => prev.filter((p) => p.id !== id));
    };

    const removeParticle = useCallback((id) => {
        setBurstParticles((prev) => prev.filter((p) => p.id !== id));
    }, []);

    return (
        <>
            <div className="fixed top-24 left-8 md:top-32 md:left-20 z-50">
                {/* The Moon Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addPhrase}
                    className="relative group cursor-pointer block"
                    aria-label="Open Heart Jar"
                >
                    {/* Pulsing Glow Aura */}
                    <motion.div
                        className="absolute inset-[-12px] md:inset-[-16px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,200,150,0.08) 50%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-gray-100 shadow-[0_0_50px_rgba(255,255,255,0.2)] overflow-hidden transition-all duration-500">
                        {/* Moon Texture / Craters */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 via-gray-100 to-white opacity-90" />
                        <div className="absolute top-4 left-6 w-3 h-3 bg-gray-400/20 rounded-full blur-[1px]" />
                        <div className="absolute bottom-6 right-8 w-6 h-6 bg-gray-400/20 rounded-full blur-[2px]" />
                        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gray-400/10 rounded-full blur-[4px]" />

                        <Heart
                            size={30}
                            weight="fill"
                            className="text-rose-200/30 absolute opacity-100 transition-opacity duration-300 transform scale-75"
                            fill="currentColor"
                        />
                    </div>

                    <div className="mt-2 text-center opacity-100 transition-opacity duration-300 text-xs font-light tracking-widest text-white/50">
                        TAP ME
                    </div>
                </motion.button>
            </div>

            {/* Burst Particles */}
            <AnimatePresence>
                {burstParticles.map((p) => (
                    <BurstParticle key={p.id} {...p} onComplete={removeParticle} />
                ))}
            </AnimatePresence>

            {/* Floating Phrases Container - Full Screen Overlay */}
            <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
                <AnimatePresence>
                    {activePhrases.map((phrase) => (
                        <FloatingPhrase
                            key={phrase.id}
                            id={phrase.id}
                            text={phrase.text}
                            onComplete={removePhrase}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
};

export default HeartJar;
