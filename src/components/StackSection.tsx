import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function StackSection() {
    const containerRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.stack-card');
        const centerIndex = Math.floor(cards.length / 2);

        // Create the Scroll-Linked Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", 
                scrub: 1, 
                pin: true, 
            }
        });

        // 1. PHASE 1: The Fan Out (Symmetrical)
        cards.forEach((card: any, i) => {
            let dist = i - centerIndex; 
            
            tl.to(card, {
                xPercent: dist * 110, 
                z: Math.abs(dist) * -400, 
                rotateY: dist * -15, 
                ease: "power2.out",
                transformPerspective: 1500
            }, 0); 
        });

        // 2. PHASE 2: The Fly-Through
        tl.to('.stack-card', {
            z: 1500, 
            opacity: 0, 
            ease: "power2.inOut",
            // Removed stagger so all cards fly forward at the exact same time
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="stack" className="h-screen w-full relative bg-[#F8F9FA]">
            <div ref={stageRef} className="stage-3d">
                {/* 1. Far Left Card */}
                <div className="stack-card pos-left-2 cursor-pointer">
                    <div className="inner-card absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-900 border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-2xl font-bold">Mobile & Frontend</h3>
                        <p className="text-gray-500 mt-2 text-center text-sm px-4 leading-relaxed">Flutter, Java, Jetpack Compose, MVVM, GetX</p>
                    </div>
                </div>

                {/* 2. Mid Left Card */}
                <div className="stack-card pos-left-1 cursor-pointer">
                    <div className="inner-card absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-900 border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-2xl font-bold">Languages</h3>
                        <p className="text-gray-500 mt-2 text-center text-sm px-4 leading-relaxed">Dart, Kotlin, Java, Python, C, SQL</p>
                    </div>
                </div>

                {/* 3. Center Card */}
                <div className="stack-card pos-center center-card cursor-pointer">
                    <div className="inner-card absolute inset-0 flex flex-col items-center justify-center bg-[#6672f2] text-white border border-[#6672f2] rounded-[24px] shadow-2xl shadow-[#6672f2]/30">
                        <h3 className="text-3xl font-bold mb-2">My Stack</h3>
                        <p className="text-white/85 text-center px-6 leading-relaxed">The technologies and tools I use to build production-grade applications.</p>
                    </div>
                </div>

                {/* 4. Mid Right Card */}
                <div className="stack-card pos-right-1 cursor-pointer">
                    <div className="inner-card absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-900 border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-2xl font-bold">Backend & APIs</h3>
                        <p className="text-gray-500 mt-2 text-center text-sm px-4 leading-relaxed">Firebase, REST APIs, MongoDB, Postman, Razorpay</p>
                    </div>
                </div>

                {/* 5. Far Right Card */}
                <div className="stack-card pos-right-2 cursor-pointer">
                    <div className="inner-card absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-900 border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-2xl font-bold">Tools & Design</h3>
                        <p className="text-gray-500 mt-2 text-center text-sm px-4 leading-relaxed">Git, Android Studio, Figma, Google Play Console, UI/UX</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
