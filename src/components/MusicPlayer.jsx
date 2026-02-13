import React, { useEffect, useRef } from 'react';

const MusicPlayer = () => {
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Load YouTube IFrame Player API code asynchronously
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '152',
                width: '100%',
                videoId: 'GurljGjfrVs',
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'showinfo': 0,
                    'rel': 0,
                    'modestbranding': 1,
                    'loop': 1,
                    'playlist': 'GurljGjfrVs',
                    'playsinline': 1, // Crucial for mobile!
                },
                events: {
                    'onReady': onPlayerReady,
                }
            });
        };

        return () => {
            // Cleanup (optional, but good practice)
            if (window.YT && playerRef.current) {
                // playerRef.current.destroy(); // leads to errors on re-renders sometimes, skip for now
            }
        };
    }, []);

    const onPlayerReady = (event) => {
        // Try to play immediately (works on desktop)
        event.target.playVideo();

        // Add a global listener to ensure playback on first interaction (mobile fallback)
        const playOnInteraction = () => {
            if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                playerRef.current.playVideo();
                // We can't unmute here reliably without user gesture on the *video element itself*,
                // but playVideo() usually starts it unmuted if the user clicked *anywhere*.
            }
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('touchstart', playOnInteraction);
            window.removeEventListener('keydown', playOnInteraction);
        };

        window.addEventListener('click', playOnInteraction);
        window.addEventListener('touchstart', playOnInteraction);
        window.addEventListener('keydown', playOnInteraction);
    };

    return (
        <div className="fixed bottom-20 right-6 z-[60] w-80 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:bg-white/20 transition-all duration-300">
            <div className="p-1 bg-white/5">
                <div id="youtube-player" style={{ borderRadius: '12px', overflow: 'hidden' }}></div>
            </div>
        </div>
    );
};

export default MusicPlayer;
