import React from 'react';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export default function ServicesSection() {
    return (
        <section id="services" className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
            
            {/* Section Header */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                        <span className="text-sm font-semibold text-[#7A52F4] tracking-wide uppercase">
                            What I Do
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                        Specialized <br/><span className="text-gray-400">Services</span>
                    </h2>
                </div>
                <p className="text-gray-500 max-w-md text-lg leading-relaxed">
                    I deliver end-to-end engineering solutions, transforming complex requirements into seamless, high-performance digital experiences.
                </p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                
                {/* 1. Mobile Development (Large Block) */}
                <motion.div 
                    variants={fadeUp}
                    className="md:col-span-2 group relative overflow-hidden rounded-[32px] bg-black border border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 md:p-10 min-h-[280px] flex flex-col justify-center"
                >
                    {/* Image - Absolute Right Side to fit seamlessly */}
                    <div className="absolute inset-y-0 right-0 w-full md:w-[50%] pointer-events-none p-4 md:p-0">
                        <img 
                            src="https://ik.imagekit.io/midhlaj786/Onam/Generated%20Image%20August%2002,%202026%20-%201_47PM.jpg" 
                            alt="Mobile App Development" 
                            className="w-full h-full object-contain object-right"
                        />
                    </div>

                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                    
                    {/* Content - Left Side */}
                    <div className="relative z-20 flex-1 flex flex-col items-start w-full md:w-[50%] md:pr-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Mobile App<br/>Development</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Building production-grade native and cross-platform applications using Flutter and Jetpack Compose (Kotlin).
                        </p>
                    </div>
                </motion.div>

                {/* 2. Web Development (Tall Block) */}
                <motion.div 
                    variants={fadeUp}
                    className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-[32px] bg-[#1e34ba] text-white shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col justify-between"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Video Header */}
                    <div className="w-full relative z-0">
                        <video 
                            src="https://ik.imagekit.io/midhlaj786/Onam/webdev.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-auto object-cover pointer-events-none"
                        />
                        {/* Subtle blend gradient in case the video background isn't perfectly flush */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1e34ba] to-transparent pointer-events-none"></div>
                    </div>

                    <div className="relative z-10 p-8 md:p-10 pt-0 flex-1 flex flex-col justify-end">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">Web<br/>Development</h3>
                        <p className="text-white/80 leading-relaxed mb-6">
                            Crafting immersive, high-performance web applications and 3D experiences.
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Vue', 'Three.js', 'MongoDB', 'Express'].map(tech => (
                                <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 3. Backend & APIs (Standard Block) */}
                <motion.div 
                    variants={fadeUp}
                    className="md:col-span-1 group relative overflow-hidden rounded-[32px] bg-[#8a50fa] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 min-h-[300px] flex flex-col justify-start"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <img 
                            src="https://ik.imagekit.io/midhlaj786/Onam/Generated%20Image%20August%2002,%202026%20-%202_28PM.jpg" 
                            alt="Backend & APIs" 
                            className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Optional subtle gradient to ensure top text stays legible */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#8a50fa]/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2">Backend & APIs</h3>
                        <p className="text-white/90 text-sm leading-relaxed max-w-[200px]">
                            Robust server-side architecture, real-time databases, and secure REST integrations.
                        </p>
                    </div>
                </motion.div>

                {/* 4. UI/UX Design (Standard Block) */}
                <motion.div 
                    variants={fadeUp}
                    className="md:col-span-1 group relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 min-h-[300px] flex flex-col justify-start"
                >
                    {/* Background Video */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <video 
                            src="https://ik.imagekit.io/midhlaj786/Onam/1210450b09db91c75877189e2b47812c.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Stronger gradient mask to ensure top text stays highly legible */}
                        <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-white via-white/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-black mb-2 drop-shadow-sm">UI / UX Design</h3>
                        <p className="text-gray-800 font-medium text-sm leading-relaxed max-w-[200px] drop-shadow-sm">
                            Translating Figma designs into pixel-perfect, accessible, and responsive user interfaces.
                        </p>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
