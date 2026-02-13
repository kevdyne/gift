import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingPhrase = ({ text, onComplete, id }) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Duration: ~5 seconds
    const duration = 5 + Math.random() * 1;

    // Spawn near center horizontally, upper-center vertically
    const startX = (Math.random() - 0.5) * vw * 0.3;
    const startY = vh * 0.2 + Math.random() * vh * 0.15;

    // Gentle feather drop: short distance for short duration
    const horizontalDrift = (Math.random() - 0.5) * vw * 0.1; // slight sway
    const dropDistance = vh * (0.05 + Math.random() * 0.05); // only 5-10% of screen height

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete(id);
        }, duration * 1000);
        return () => clearTimeout(timer);
    }, [id, duration, onComplete]);

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: startX,
                y: startY,
            }}
            animate={{
                opacity: [0, 0.9, 0.9, 0],
                x: startX + horizontalDrift,
                y: startY + dropDistance,
            }}
            transition={{
                type: "tween",
                ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier, like a feather
                duration: duration,
                times: [0, 0.1, 0.75, 1],
            }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none whitespace-pre-wrap text-center max-w-[85vw] sm:max-w-sm z-50"
        >
            {/* Lantern glow behind card */}
            <div
                className="absolute inset-[-8px] rounded-2xl opacity-50 blur-xl"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,160,50,0.3) 0%, rgba(255,100,20,0.1) 60%, transparent 80%)',
                }}
            />
            <div
                className="relative backdrop-blur-md border px-6 py-4 rounded-xl font-light tracking-wide text-lg"
                style={{
                    background: 'linear-gradient(to top, rgba(180,80,0,0.25), rgba(255,160,50,0.15), rgba(255,200,100,0.08))',
                    borderColor: 'rgba(255,180,80,0.3)',
                    color: '#fff8ee',
                    boxShadow: '0 0 25px rgba(255,140,40,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                    textShadow: '0 0 12px rgba(255,160,50,0.3)',
                }}
            >
                {text}
            </div>
        </motion.div>
    );
};

export default FloatingPhrase;
