import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingPhrase from './FloatingPhrase';
import { phrases } from '../data/phrases';

const HeartJar = () => {
    const [activePhrases, setActivePhrases] = useState([]);

    const addPhrase = () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        const newPhrase = {
            id: Date.now() + Math.random(),
            text: randomPhrase,
        };
        setActivePhrases((prev) => [...prev, newPhrase]);
    };

    const removePhrase = (id) => {
        setActivePhrases((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <>
            <div className="fixed top-24 left-8 md:top-32 md:left-20 z-50">
                {/* The Moon Button */}
                <motion.button
                    whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addPhrase}
                    className="relative group cursor-pointer block"
                    aria-label="Open Heart Jar"
                >
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
