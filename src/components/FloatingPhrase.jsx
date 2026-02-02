import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingPhrase = ({ text, onComplete, id }) => {
    // Center horizontally relative to screen (now full screen overlay)
    // Shift slightly left/right but keep generally readable
    // Ensure phrases stay within 10vw and 90vw to avoid getting cut off on mobile
    const windowWidth = window.innerWidth;
    const padding = Math.min(windowWidth * 0.1, 50); // 10% padding or 50px
    const maxOffset = (windowWidth / 2) - padding - 150; // 150 is approx half text width
    const randomXOffset = (Math.random() - 0.5) * 2 * maxOffset;

    // Make it faster: 8-12 seconds instead of 15-25
    const duration = 8 + Math.random() * 4;

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete(id);
        }, duration * 1000);
        return () => clearTimeout(timer);
    }, [id, duration, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 150, x: randomXOffset, scale: 0.8 }}
            animate={{
                opacity: [0, 1, 1, 0],
                y: window.innerHeight * 0.7,
                x: randomXOffset + (Math.random() - 0.5) * 100,
                scale: [0.8, 1, 1.05, 1],
                rotate: [0, (Math.random() - 0.5) * 10, 0]
            }}
            transition={{
                type: "tween",
                ease: "easeInOut",
                duration: duration,
                times: [0, 0.1, 0.8, 1]
            }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-none whitespace-pre-wrap text-center max-w-sm z-50"
            style={{
                textShadow: '0 0 10px rgba(255,255,255,0.3)',
            }}
        >
            <div className="backdrop-blur-md bg-black/30 border border-white/20 px-6 py-4 rounded-xl text-white font-light tracking-wide text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {text}
            </div>
        </motion.div>
    );
};

export default FloatingPhrase;
