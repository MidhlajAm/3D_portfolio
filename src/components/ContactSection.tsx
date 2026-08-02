import React from 'react';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
};

export default function ContactSection() {
    return (
        <section id="contact" className="relative w-full h-screen flex flex-col items-center justify-start pt-[10vh] md:pt-[15vh] px-6 overflow-hidden">
            
            {/* Background Video (Merged from Footer) */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                >
                    <source src="https://res.cloudinary.com/dezwll9jv/video/upload/v1785580249/Subtle_gentle_wind_animation_ewpkj1.mp4" type="video/mp4" />
                </video>
                {/* Blending Gradient at the Top to blend seamlessly with ProjectsSection (#F8F9FA) */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F8F9FA] to-transparent"></div>
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-white/20 rounded-full opacity-50 pointer-events-none z-10"></div>
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-white/20 rounded-full opacity-50 pointer-events-none z-10"></div>
            
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                className="relative z-20 text-center w-full max-w-4xl"
            >
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                    <span className="text-sm font-semibold text-[#7A52F4] tracking-wide uppercase">
                        Get In Touch
                    </span>
                    <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-12">
                    Let's Build <br /> Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A52F4] to-[#F6A51E]">Great.</span>
                </h2>

                <p className="text-xl md:text-2xl text-white font-semibold mb-16 max-w-2xl mx-auto leading-relaxed drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Currently open for new opportunities. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you!
                </p>

                {/* Floating Contact Pills */}
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="mailto:midhlaj.am786@gmail.com" className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full transition-colors duration-300 shadow-lg">
                        <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <span className="font-bold text-white tracking-wide drop-shadow-md">midhlaj.am786@gmail.com</span>
                    </a>
                    <a href="tel:+918078336549" className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full transition-colors duration-300 shadow-lg">
                        <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span className="font-bold text-white tracking-wide drop-shadow-md">+91-8078336549</span>
                    </a>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
                    <a href="https://linkedin.com/in/midhlaj-am" target="_blank" rel="noreferrer" className="group flex items-center text-white hover:text-gray-200 transition-colors font-bold drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <svg className="w-5 h-5 mr-1.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                    </a>
                    <span className="hidden md:inline text-white font-bold drop-shadow-md">•</span>
                    <a href="https://github.com/MidhlajAm" target="_blank" rel="noreferrer" className="group flex items-center text-white hover:text-gray-200 transition-colors font-bold drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <svg className="w-5 h-5 mr-1.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                    </a>
                    <span className="hidden md:inline text-white font-bold drop-shadow-md">•</span>
                    <span className="flex items-center text-white font-bold drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        Malappuram, Kerala
                    </span>
                </div>
            </motion.div>

            {/* Footer Text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                    transition={{ 
                        opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                        y: { duration: 1 } 
                    }}
                    className="text-white/90 font-medium tracking-widest uppercase text-sm drop-shadow-md whitespace-nowrap" 
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                    Thank you for the visit
                </motion.p>
            </div>
        </section>
    );
}
