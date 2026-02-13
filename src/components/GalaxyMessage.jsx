import React, { useRef, useEffect } from 'react';

const GalaxyMessage = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const DURATION = 120000; // 60 seconds in milliseconds
        let startTime = null;
        let animId;

        const tick = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) % DURATION;
            const progress = elapsed / DURATION; // 0 → 1

            const vh = window.innerHeight;
            const cardHeight = el.scrollHeight;
            // Total distance: from bottom of screen to fully above screen
            const startY = vh;
            const endY = -cardHeight;
            const y = startY + (endY - startY) * progress;

            el.style.transform = `translateY(${y}px)`;
            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex justify-center overflow-hidden">
            <div
                ref={cardRef}
                className="relative max-w-sm md:max-w-md text-center p-8 mt-20"
            >
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(100,50,255,0.2)]">
                    <div className="flex flex-col space-y-32"> {/* Large vertical spacing */}

                        {/* Section 1 */}
                        <p className="text-xl md:text-2xl font-light text-blue-100 tracking-wide leading-relaxed">
                            I know this is the least gift you expected, <br />but it's all I can offer (at least as of now)
                            <br /> <br />
                            <br /> <span className="text-xl md:text-2xl font-normal text-rose-100 italic">
                                hope u'll receive it with all and like it, </span>
                        </p>


                        {/* Section 2 */}
                        <p className="text-lg md:text-xl text-slate-200 font-light leading-loose">
                            U mean a lot to me than you can imagine <br />& worstly, than I care to admit it to myself
                            <br /><br />
                            it's just that sometimes I wish we were closer but we just ain't..
                            <br /><br />
                            wish I could hold u, be w/u en really say u mine,,
                            <br /><br />
                            well, I guess not all couples r perfect &#123;that's if evn ours counts as one&#125;,
                            <br /><br />
                            tbh u makn me lose interest every cngl day and evn though idwt, I guess it has to happen for my peace..
                            <br /><br />
                            don't get wrong, I do love u, en there was a time I'd do anything to be w/u..
                            <br /><br />
                            u cute, have humor, intelligent, a bit God fearing, and everything I could think of that makes me lv u even more, even the bad parts of u...
                            <br /><br />
                            anyways,, I nvr do this at all, cjui n nn imenikuta, hopefully it'll be the last day me pouring myself this much..
                            <br /><br />
                            let me not let me continue to yap, can't tell if u care anymore,
                        </p>

                        <div className="w-16 h-[1px] bg-white/20 mx-auto" />

                        <p className="text-lg md:text-xl text-slate-200 font-light leading-loose">
                            <br /> <span className="text-rose-200 font-normal text-2xl mt-4 block">enjoy this day mi amor!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalaxyMessage;
