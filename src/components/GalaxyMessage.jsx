import React from 'react';
import { motion } from 'framer-motion';

const GalaxyMessage = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex justify-center overflow-hidden">
            <motion.div
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "-100%", opacity: [0, 1, 1, 0] }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1]
                }}
                className="relative max-w-sm md:max-w-md text-center p-8 mt-20"
            >
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(100,50,255,0.2)]">
                    <div className="space-y-8">
                        <p className="text-xl md:text-2xl font-light text-blue-100 tracking-wide leading-relaxed">
                            I know this is the least gift you expected, but it's all I can offer (at least as of now)
                        </p>
                        <p className="text-xl md:text-2xl font-normal text-rose-100 italic">
                            hope u'll receive it with all and like it,
                        </p>
                        <div className="w-16 h-[1px] bg-white/20 mx-auto my-4" />
                        <p className="text-lg md:text-xl text-slate-200 font-light leading-loose">
                            U mean a lot to me than you can imagine & worstly, than I care to admit it to myself
                            <br />
                            Hope the feeling is mutual, <span className="text-rose-200 font-normal">enjoy this day mi amor!</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GalaxyMessage;
