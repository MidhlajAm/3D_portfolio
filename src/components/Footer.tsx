import React from 'react';

export default function Footer() {
    return (
        <footer className="relative w-full h-[400px] md:h-[500px] overflow-hidden z-20">
            {/* Blending Gradient at the Top */}
            <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-canvas via-canvas/80 to-transparent z-10 pointer-events-none"></div>

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="https://res.cloudinary.com/dezwll9jv/video/upload/v1785580249/Subtle_gentle_wind_animation_ewpkj1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </footer>
    );
}
