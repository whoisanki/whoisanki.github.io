import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollCurveLine: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.0005
  });

  const [dimensions, setDimensions] = useState({ width: 1400, height: 6000 });

  useEffect(() => {
    const updateDimensions = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 5
      );
      setDimensions({
        width: window.innerWidth,
        height: docHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const interval = setInterval(updateDimensions, 2000);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearInterval(interval);
    };
  }, []);

  const { width, height } = dimensions;

  // Serpentine Bézier curve down the page
  const midX = width / 2;
  const leftX = Math.max(70, width * 0.16);
  const rightX = Math.min(width - 70, width * 0.84);

  // Control points based on document segments
  const h1 = height * 0.12; // Hero to About
  const h2 = height * 0.28; // About to Numismatics
  const h3 = height * 0.45; // Numismatics to Skills
  const h4 = height * 0.62; // Skills to Projects
  const h5 = height * 0.78; // Projects to Timeline
  const h6 = height * 0.92; // Timeline to Contact
  const hEnd = height;

  const pathD = `
    M ${midX} 0
    C ${midX + 160} ${h1 * 0.4}, ${leftX} ${h1 * 0.7}, ${leftX} ${h1}
    C ${leftX} ${h1 + (h2 - h1) * 0.4}, ${rightX} ${h1 + (h2 - h1) * 0.6}, ${rightX} ${h2}
    C ${rightX} ${h2 + (h3 - h2) * 0.4}, ${leftX + 50} ${h2 + (h3 - h2) * 0.6}, ${leftX + 50} ${h3}
    C ${leftX + 50} ${h3 + (h4 - h3) * 0.4}, ${rightX - 50} ${h3 + (h4 - h3) * 0.6}, ${rightX - 50} ${h4}
    C ${rightX - 50} ${h4 + (h5 - h4) * 0.4}, ${midX - 80} ${h4 + (h5 - h4) * 0.6}, ${midX - 80} ${h5}
    C ${midX - 80} ${h5 + (h6 - h5) * 0.4}, ${rightX - 80} ${h5 + (h6 - h5) * 0.6}, ${rightX - 80} ${h6}
    C ${rightX - 80} ${h6 + (hEnd - h6) * 0.5}, ${midX} ${h6 + (hEnd - h6) * 0.7}, ${midX} ${hEnd}
  `;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Bright Electric Neon Multi-Stop Gradient */}
          <linearGradient id="neonScrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />      {/* Electric Neon Cyan */}
            <stop offset="20%" stopColor="#00e5ff" stopOpacity="1" />     {/* Bright Aqua */}
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="1" />     {/* Electric Purple */}
            <stop offset="60%" stopColor="#ec4899" stopOpacity="1" />     {/* Neon Pink */}
            <stop offset="80%" stopColor="#38bdf8" stopOpacity="1" />     {/* Sky Neon */}
            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />    {/* Emerald Glow */}
          </linearGradient>

          {/* Deep Outer Neon Halo Filter */}
          <filter id="neonOuterGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core Sharp Neon Laser Filter */}
          <filter id="neonCoreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coreBlur" />
            <feMerge>
              <feMergeNode in="coreBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint Neon Guide Track */}
        <path
          d={pathD}
          stroke="rgba(0, 245, 255, 0.12)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Layer 1: Wide Ambient Neon Atmospheric Aura */}
        <motion.path
          d={pathD}
          stroke="url(#neonScrollGradient)"
          strokeWidth="12"
          opacity="0.35"
          filter="url(#neonOuterGlow)"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
        />

        {/* Layer 2: Intense Mid-Glow Neon Ribbon */}
        <motion.path
          d={pathD}
          stroke="url(#neonScrollGradient)"
          strokeWidth="5"
          opacity="0.85"
          filter="url(#neonCoreGlow)"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
        />

        {/* Layer 3: Ultra-Crisp High-Luminosity Laser Core */}
        <motion.path
          d={pathD}
          stroke="#ffffff"
          strokeWidth="1.8"
          opacity="0.95"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
