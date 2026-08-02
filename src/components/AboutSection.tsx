import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants for clean staggered reveals
const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.21, 0.47, 0.32, 0.98]
        },
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

export default function AboutSection() {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
            {/* Top Bar: About me Tag & Right Bullet Note */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
                <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-gray-900 inline-block" />
                    <span className="text-sm font-semibold text-gray-900 tracking-wide">
                        About me
                    </span>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Staggered Headline, Bio & Action Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="lg:col-span-6 flex flex-col items-start"
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.12] mb-8"
                    >
                        Meet Midhlaj AM Your Lead <span className="text-[#7A52F4]">Software Engineer</span>
                    </motion.h2>

                    <motion.div
                        variants={fadeInUp}
                        className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed mb-10"
                    >
                        <p>
                            Computer Science undergraduate with 6+ years of software development experience across mobile and web platforms, including a professional Flutter internship. Proficient in Dart, Kotlin, Java, Python, and modern web technologies, with hands-on experience in Firebase, REST APIs, GetX, MVVM, and real-time systems.
                        </p>
                        <p>
                            I architect and publish production-grade mobile apps on Google Play and build responsive, dynamic web applications—managing everything from high-fidelity UI design to robust backend integration. Whether engineering real-time sensor platforms or custom cross-platform web and mobile solutions, I prioritize code maintainability and an exceptional user experience.
                        </p>
                    </motion.div>

                    <motion.button
                        variants={fadeInUp}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            boxShadow: "0px 6px 0px #5a37c4, 0px 12px 20px rgba(122, 82, 244, 0.4)"
                        }}
                        whileHover={{
                            y: 2,
                            boxShadow: "0px 4px 0px #5a37c4, 0px 8px 15px rgba(122, 82, 244, 0.4)"
                        }}
                        whileTap={{
                            y: 6,
                            boxShadow: "0px 0px 0px #5a37c4, 0px 0px 0px rgba(122, 82, 244, 0.4)"
                        }}
                        className="inline-flex items-center gap-3 bg-[#7A52F4] hover:bg-[#724aeb] text-white font-medium text-sm md:text-base px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                        <span>Get In Touch</span>
                        <div className="w-7 h-7 rounded-full bg-white text-[#7A52F4] flex items-center justify-center">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </div>
                    </motion.button>
                </motion.div>

                {/* Right Column: Animated Hero Image & Overlapping Badge */}
                <div className="hidden lg:flex lg:col-span-6 relative justify-center lg:justify-end">
                    {/* Main Photo Slide-in */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="relative w-full max-w-[480px] h-[480px] md:h-[520px] flex items-center justify-center"
                    >
                        <video 
                            src="https://ik.imagekit.io/midhlaj786/Onam/robot_about.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-[85%] h-[85%] object-contain pointer-events-none"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}