import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    {
        title: "JSBNC IPTV Player",
        subtitle: "IPTV Player",
        description: "An Xtream API playlist loading IPTV player built with Jetpack Compose and Media3 ExoPlayer, featuring multi-profile, cached loading, smooth live playback, and advanced player settings.",
        tech: ["Jetpack Compose", "Media3", "ExoPlayer", "Kotlin"],
        primaryColor: "#8b5cf6",
        shadowColor: "#5b21b6",
        image: "https://res.cloudinary.com/dezwll9jv/image/upload/v1785668047/WhatsApp_Image_2026-07-17_at_2.30.16_PM_l7nuue.jpg",
        link: "https://jsbmniptv.tech/"
    },
    {
        title: "StudyCo",
        subtitle: "Education Platform",
        description: "A secure education platform featuring offline downloads, Razorpay cart, single-device login enforcement, and real-time FCM push notifications.",
        tech: ["Flutter", "Dart", "Firebase", "GetX", "Razorpay"],
        primaryColor: "#8b5cf6",
        shadowColor: "#5b21b6",
        image: "https://midhlajam.github.io/images/projects/studyco.png",
        link: "https://github.com/MidhlajAm/studyco_app"
    },
    {
        title: "Task Hive",
        subtitle: "Rewards Application",
        description: "A full-stack Flutter rewards application powered by MongoDB Atlas, featuring real-time leaderboards and dynamic campaign engines.",
        tech: ["Flutter", "MongoDB", "GetX", "Dart"],
        primaryColor: "#8b5cf6",
        shadowColor: "#5b21b6",
        image: "https://ik.imagekit.io/midhlaj786/Onam/Gemini_Generated_Image_vwvauovwvauovwva.png",
        link: "https://github.com/MidhlajAm/task_hive"
    },
    {
        title: "Motion Comfort",
        subtitle: "Motion Sickness Reduction App",
        description: "Android app using real-time accelerometer data to generate synchronized visual cues reducing motion sickness, featuring custom Canvas rendering.",
        tech: ["Kotlin", "Jetpack Compose", "MVVM"],
        primaryColor: "#8b5cf6",
        shadowColor: "#5b21b6",
        image: "https://ik.imagekit.io/midhlaj786/Onam/Gemini_Generated_Image_r65lf1r65lf1r65l.png",
        link: "https://github.com/MidhlajAm/MotionComfortJP"
    },
    {
        title: "Jigsaw Puzzle Pro",
        subtitle: "Interactive Game",
        description: "Flutter puzzle game with glassmorphism UI, dynamic online image search via Pexels REST API, and a coin-based daily rewards system.",
        tech: ["Flutter", "GetX", "Pexels API"],
        primaryColor: "#8b5cf6",
        shadowColor: "#5b21b6",
        image: "https://ik.imagekit.io/midhlaj786/Onam/Gemini_Generated_Image_n86fqnn86fqnn86f.png",
        link: "https://github.com/MidhlajAm/jigsaw_puzzle"
    },
];

export default function ProjectsSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate the container horizontally. 
    // -100% means it moves fully to the left. We adjust the percentage based on the number of items.
    // 5 items = approx -80% to show the last one fully.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <section ref={targetRef} id="projects" className="relative h-[500vh] bg-[#F8F9FA]">
            {/* Sticky container that holds the horizontal scrolling track */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Background Typography */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                    <h2 className="text-[20vw] font-black whitespace-nowrap leading-none tracking-tighter">
                        SELECTED WORKS
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24 pb-12">
                    {/* Intro Slide */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                            <span className="text-sm font-semibold text-[#7A52F4] tracking-wide uppercase">
                                Portfolio
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                            Featured <br /> <span className="text-gray-400">Projects</span>
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
                            A curated selection of my recent mobile and full-stack applications. Keep scrolling to explore.
                        </p>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project, index) => (
                        <div key={index} className="w-[85vw] md:w-[60vw] lg:w-[50vw] flex-shrink-0 h-[70vh] flex flex-col cursor-pointer">
                            <motion.div
                                onClick={() => window.open(project.link, '_blank')}
                                style={{
                                    border: `4px solid ${project.primaryColor}`,
                                    boxShadow: `0px 12px 0px ${project.shadowColor}, 0px 20px 25px rgba(0,0,0,0.15)`,
                                    backgroundColor: '#ffffff'
                                }}
                                whileHover={{
                                    y: 6,
                                    boxShadow: `0px 6px 0px ${project.shadowColor}, 0px 10px 15px rgba(0,0,0,0.15)`
                                }}
                                whileTap={{
                                    y: 12,
                                    boxShadow: `0px 0px 0px ${project.shadowColor}, 0px 0px 0px rgba(0,0,0,0.15)`
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-full h-full flex flex-col rounded-[32px] overflow-hidden"
                            >
                                {/* Stylish Image */}
                                <div className="w-full h-[60%] bg-gray-100 relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Project Details */}
                                <div className="w-full h-[40%] bg-white p-8 md:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-baseline justify-between mb-2">
                                            <h3 className="text-2xl md:text-3xl font-black text-gray-900">{project.title}</h3>
                                            <span className="text-sm font-bold" style={{ color: project.primaryColor }}>{project.subtitle}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white border-2 text-gray-800 rounded-full text-xs font-bold shadow-sm"
                                                style={{ borderColor: project.primaryColor }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Floating "Skip to Next Section" Button */}
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-14 h-14 bg-white text-[#7A52F4] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 hover:shadow-[0_8px_30px_rgb(122,82,244,0.3)] transition-all duration-300 border border-gray-100 group"
                    title="Skip to Contact"
                >
                    <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
}
