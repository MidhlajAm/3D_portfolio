import React from 'react';
import NavigationBar from './components/NavigationBar';
import ShapesCanvas from './components/3D/ShapesCanvas';
import MarqueeBackground from './components/MarqueeBackground';
import ProfileCard from './components/ProfileCard';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

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

        {/* Layer 10 — 3D Shapes Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ShapesCanvas />
        </div>

        {/* Layer 20 — Centered Profile Card */}
        <div className="relative z-20 pointer-events-auto">
          <ProfileCard name="Midhlaj" />
        </div>
      </section>

      {/* ABOUT SECTION - Changed to white to match the new video background */}
      <div id="about" className="relative z-20 bg-white pb-24 md:pb-32">
        <AboutSection />
        
      </div>

      {/* SKILLS SECTION */}
      <SkillsSection />

      {/* SERVICES SECTION */}
      <ServicesSection />

      {/* PROJECTS SECTION (Horizontal Scroll) */}
      <ProjectsSection />

      {/* CONTACT SECTION (Combined with Footer Video Background) */}
      <ContactSection />

      {/* Layer 50 — Fixed Navigation Bar */}
      <NavigationBar />
    </main>
  );
}