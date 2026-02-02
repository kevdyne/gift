import React from 'react';

const MusicPlayer = () => {
    return (
        <div className="fixed bottom-20 right-6 z-[60] w-80 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:bg-white/20 transition-all duration-300">
            <div className="p-1 bg-white/5">
                <iframe
                    style={{ borderRadius: '12px' }}
                    width="100%"
                    height="152"
                    src="https://www.youtube.com/embed/Oa_RSwwpPaA?si=GiftApp&controls=1&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=Oa_RSwwpPaA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default MusicPlayer;
