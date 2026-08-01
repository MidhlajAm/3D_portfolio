import React from 'react';

interface MarqueeBackgroundProps {
  text?: string;
  repeat?: number;
  duration?: number;
  sizeClass?: string;
  opacity?: number;
}

const MarqueeBackground: React.FC<MarqueeBackgroundProps> = ({
  text = 'Midhlaj AM!',
  repeat = 6,
  duration = 18,
  sizeClass = 'text-[22vw]',
  opacity = 1,
}) => {
  const gap = '\u00a0\u00a0\u00a0';
  const tokens = Array.from({ length: repeat }, () => text).join(gap);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          transform: 'translateY(-50%)',
        }}
      >
        <div
          className="marquee-track"
          style={{ animation: `marquee ${duration}s linear infinite` }}
        >
          <span className={`marquee-span font-black leading-none tracking-tighter text-black select-none ${sizeClass}`}
            style={{
              fontFamily: '"Clash Display", "Syne", "Plus Jakarta Sans", sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}>
            {tokens}
          </span>
          <span
            aria-hidden="true"
            className={`marquee-span font-black leading-none tracking-tighter text-black select-none ${sizeClass}`}
            style={{
              fontFamily: '"Clash Display", "Syne", "Plus Jakarta Sans", sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}
          >
            {tokens}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBackground;