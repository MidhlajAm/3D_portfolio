import React from 'react';
import { motion } from 'framer-motion';

// Import Icons
import flutterIcon from '../assets/icons/Flutter.png';
import javaIcon from '../assets/icons/Java.png';
import reactIcon from '../assets/icons/React.png';
import vueIcon from '../assets/icons/Vue.js.png';
import threeIcon from '../assets/icons/Three.js.png';
import firebaseIcon from '../assets/icons/Firebase.png';
import mongoIcon from '../assets/icons/MongoDB.png';
import expressIcon from '../assets/icons/Express.png';
import fastApiIcon from '../assets/icons/FastAPI.png';
import mysqlIcon from '../assets/icons/MySQL.png';
import dartIcon from '../assets/icons/Dart.png';
import kotlinIcon from '../assets/icons/Kotlin.png';
import pythonIcon from '../assets/icons/Python.png';
import cIcon from '../assets/icons/C.png';
import figmaIcon from '../assets/icons/Figma.png';
import githubIcon from '../assets/icons/GitHub.png';
import androidStudioIcon from '../assets/icons/Android Studio.png';
import vsCodeIcon from '../assets/icons/Visual Studio Code (VS Code).png';
import playConsoleIcon from '../assets/icons/google-play-console-icon-seeklogo.png';

const skillCategories = [
    {
        title: "Frontend & Web",
        description: "Building smooth, cross-platform user interfaces.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        skills: [
            { name: "Flutter", icon: flutterIcon },
            { name: "React", icon: reactIcon },
            { name: "Vue.js", icon: vueIcon },
            { name: "Three.js", icon: threeIcon },
            { name: "Jetpack Compose", icon: "https://upload.wikimedia.org/wikipedia/commons/9/98/Jetpack_Compose_logo.png?_=20260331144549" },
            { name: "GetX", icon: "https://camo.githubusercontent.com/2faf438fdd0c11b915289d7cb7e07faec7370897385ef8e6b8669fcd97930fe1/68747470733a2f2f6170692e696e746f70726f732e636f6d2f75706c6f6164732f323032332d30332f756e617574682d313637393339393231353830302d35333034626536346262383934396630623138653731623566393434383863302e706e67" }
        ]
    },
    {
        title: "Backend & APIs",
        description: "Architecting robust databases and cloud functions.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3-6h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
        skills: [
            { name: "Firebase", icon: firebaseIcon },
            { name: "MongoDB", icon: mongoIcon },
            { name: "Express", icon: expressIcon },
            { name: "FastAPI", icon: fastApiIcon },
            { name: "MySQL", icon: mysqlIcon },
            { name: "Postman", icon: "https://identity-assets.getpostman.com/images/logo-postman.svg" }
        ]
    },
    {
        title: "Languages & Core",
        description: "Strong foundation in data structures and syntax.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
        ),
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-100",
        skills: [
            { name: "Dart", icon: dartIcon },
            { name: "Kotlin", icon: kotlinIcon },
            { name: "Python", icon: pythonIcon },
            { name: "Java", icon: javaIcon },
            { name: "C", icon: cIcon },
            { name: "Data Structures", icon: null }
        ]
    },
    {
        title: "Tools & Design",
        description: "Designing workflows and managing lifecycles.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.813-6.841m-11.996 11.498L11.996 12m-8.457 4.077c-.183.366-.278.773-.278 1.185 0 3.204 2.457 5.86 5.614 6.28a2.25 2.25 0 0 1 1.821-1.821c-.42-3.157-3.076-5.614-6.28-5.614ZM12 12c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 12 12 12Z" />
            </svg>
        ),
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-100",
        skills: [
            { name: "Figma", icon: figmaIcon },
            { name: "GitHub", icon: githubIcon },
            { name: "VS Code", icon: vsCodeIcon },
            { name: "Android Studio", icon: androidStudioIcon },
            { name: "Play Console", icon: playConsoleIcon },
            { name: "UI / UX", icon: "https://media.licdn.com/dms/image/v2/C4D0BAQEL_jS93IaF9A/company-logo_200_200/company-logo_200_200/0/1630553624022/ui_ux_designer_logo?e=1787184000&v=beta&t=t9BgNvDOiazn0AZfB7hJWWl07oJEtMki0BZiEX3v9A8" }
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="w-full bg-white relative overflow-hidden">
            <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
                {/* Decorative Jellyfish Video */}
                <div className="absolute -top-4 md:left-[15%] lg:left-[22%] w-48 h-48 md:w-80 md:h-80 pointer-events-none mix-blend-multiply opacity-80 hidden md:block">
                    <video
                        src="https://ik.imagekit.io/midhlaj786/Onam/jellyfish%20upscaled.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 text-center relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                        <span className="text-sm font-semibold text-[#7A52F4] tracking-wide uppercase">
                            Capabilities
                        </span>
                        <span className="w-8 h-[2px] bg-[#7A52F4] inline-block" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Technical <span className="text-gray-400">Skills</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group flex flex-col p-8 rounded-[32px] bg-white border-2 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-[#7A52F4]/30 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${category.bgColor} ${category.color} ${category.borderColor} border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                                {category.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                {category.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        {skill.icon && (
                                            <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
                                        )}
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
