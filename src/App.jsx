import React from 'react';
import NavigationBar from './components/NavigationBar';
import ShapesCanvas from './components/3D/ShapesCanvas';
import MarqueeBackground from './components/MarqueeBackground';
import ProfileCard from './components/ProfileCard';
import AboutSection from './components/AboutSection';
import StackSection from './components/StackSection';
import Footer from './components/Footer';

export default function App() {
  return (
    /* 2. Cleaned up wrapper classes to prevent GSAP ScrollTrigger conflicts */
    <main className="relative w-full bg-canvas">

      {/* 3. Wrapped Hero items inside a dedicated min-h-screen section */}
      <section
        id="home"
        className="relative min-h-screen w-full flex items-center justify-center bg-white"
      >
        {/* Layer 0 — Background Marquee */}
        <MarqueeBackground
          text="Midhlaj AM!"
          repeat={6}
          duration={60}
          sizeClass="text-[16vw]"
          opacity={1}
        />

        {/* Blending Gradient to seamlessly mix Hero white into About gray */}
        {/* Placed at z-0 so it renders BEHIND the 3D shapes */}
        <div className="absolute inset-x-0 -bottom-1 h-32 bg-gradient-to-b from-white to-canvas z-0 pointer-events-none"></div>

        {/* Layer 10 — 3D Shapes Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ShapesCanvas />
        </div>

        {/* Layer 20 — Centered Profile Card */}
        <div className="relative z-20 pointer-events-auto">
          <ProfileCard name="Midhlaj" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative min-h-screen w-full flex items-center justify-center py-20 z-20"
      >
        <AboutSection />
      </section>

      {/* STACK SECTION (GSAP 3D ScrollTrigger) */}
      <StackSection />

      {/* Footer with Video Background */}
      <Footer />

      {/* Layer 50 — Fixed Navigation Bar */}
      <NavigationBar />
    </main>
  );
}