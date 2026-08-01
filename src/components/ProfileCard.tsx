import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
  'UI / UX Expert',
  'Product Design',
  'App Developer',
  'Collaborative Team Player',
  'Web Developer',
];

interface ProfileCardProps {
  name?: string;
  avatarUrl?: string;
  roleChangeInterval?: number; // In milliseconds
}

export default function ProfileCard({
  name = 'Midhlaj AM',
  avatarUrl = 'src/assets/midhalaj_avatar_og.jpg',
  roleChangeInterval = 3000,
}: ProfileCardProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Cycle role title automatically without forcing card flips
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, roleChangeInterval);

    return () => clearInterval(timer);
  }, [roleChangeInterval]);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center pointer-events-auto">
      {/* 1. Header Greeting & Dynamic Role Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Hi, I'm <span className="font-bold italic">{name}!</span>
        </h1>

        <div className="h-8 mt-2 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-lg md:text-xl font-medium text-gray-600"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. 3D Flipping Card Container */}
      <div
        className="w-[280px] h-[280px] md:w-[310px] md:h-[310px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full rounded-[36px] shadow-2xl shadow-black/10"
        >
          {/* FRONT FACE: Avatar Image */}
          <div
            className="absolute inset-0 w-full h-full rounded-[36px] bg-[#E3D8CC] p-3 flex items-center justify-center overflow-hidden border border-white/40"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#D3C5B7]">
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* BACK FACE: Glassmorphism Rotating Circular Badge */}
          <div
            className="absolute inset-0 w-full h-full rounded-[36px] bg-white/40 backdrop-blur-2xl p-6 flex flex-col items-center justify-center border border-white/60 shadow-2xl shadow-black/5 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Rotating Curved Text & Inner Rings */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_12s_linear_infinite]"
              >
                {/* Outer Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.12)"
                  strokeWidth="0.8"
                />

                {/* Inner Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.12)"
                  strokeWidth="0.8"
                />

                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[8.5px] font-bold uppercase tracking-[0.22em] fill-gray-800">
                  <textPath href="#circlePath" startOffset="0%">
                    ✦ SCROLL DOWN ✦ AND KNOW ME BETTER
                  </textPath>
                </text>
              </svg>

              {/* Center Down Arrow Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-800 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Social Proof Avatar Pill */}
      <div className="mt-5 flex items-center gap-2 px-3.5  rounded-full">
        <div className="flex -space-x-2 overflow-hidden">
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Client"
          />
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
            alt="Client"
          />
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            alt="Client"
          />
        </div>
        <span className="text-xs font-semibold text-gray-700">
          80+ Happy Clients
        </span>
      </div>

      {/* 4. Call-to-Action Button */}
      <button className="mt-4 px-10 py-4 rounded-full bg-white text-gray-950 font-bold text-base md:text-lg border-[4px] border-[#EEEEFD] hover:border-[#E2E2FC] hover:bg-gray-50/80 transition-all duration-200 active:scale-95 shadow-sm">
        Let's Work Together!
      </button>
    </div>
  );
}