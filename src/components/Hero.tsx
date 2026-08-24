import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero3DScene } from './canvas/Hero3DScene';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Coins, Code2, Terminal, Flame, FileDown } from 'lucide-react';


export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCelebrate = () => {
    sounds.playWarp();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#e2e8f0', '#94a3b8']
    });
  };


  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-zinc-800/[0.1] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-900/[0.2] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status / Terminal Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-subtle text-xs font-mono text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>5+ Years Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-200 font-semibold">Mobile &amp; FinTech Apps</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
              >
                I&apos;m{' '}
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Ankith.
                </span>
              </motion.h1>

              {/* Animated Rotating Sub-headline */}
              <div className="h-12 sm:h-14 flex items-center overflow-hidden">
                <span className="text-xl sm:text-3xl font-medium text-zinc-500 mr-2.5">
                  a
                </span>
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-xl sm:text-3xl font-bold text-zinc-200"
                >
                  {PERSONAL_INFO.roles[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Intro Paragraph with Humour Note */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
            >
              Architecting mission-critical{' '}
              <span className="text-white font-semibold">React Native mobile applications</span>{' '}
              in banking &amp; e-commerce, fluid 60 FPS gesture mechanics, interactive 3D WebGL experiences, and{' '}
              <span className="text-zinc-200 font-semibold underline decoration-zinc-500/40 decoration-2 underline-offset-4">
                a healthy pinch of humour
              </span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-black font-bold text-sm shadow-lg hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-black" />
                <span>Featured Projects</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </a>


              <a
                href="/Ankith_Mahindrakar_Resume.pdf"
                download="Ankith_Mahindrakar_Resume.pdf"
                onClick={() => sounds.playCoinClink()}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 text-white font-bold text-sm border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
                title="Download Official Resume PDF"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Resume PDF</span>
              </a>

              <a
                href="#numismatics"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl glass-panel text-zinc-300 hover:text-white hover:border-white/30 hover:scale-105 active:scale-95 font-semibold text-sm transition-all duration-300 cursor-pointer"
              >
                <Coins className="w-4 h-4 text-zinc-300" />
                <span className="hidden sm:inline">3D Coins</span>
              </a>

              <button
                onClick={handleCelebrate}
                className="p-3.5 rounded-2xl glass-panel text-zinc-400 hover:text-white hover:border-white/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Celebrate & Confetti"
              >
                <Flame className="w-4 h-4 text-amber-400" />
              </button>
            </motion.div>


            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10"
            >
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-1">
                    {stat.value}
                    {i === 0 && <span className="text-xs">📱</span>}
                    {i === 2 && <span className="text-xs">🪙</span>}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>


          {/* Right Column: 3D Interactive WebGL Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 h-[420px] sm:h-[500px] w-full relative flex items-center justify-center"
          >
            {/* Holographic Glowing Background Behind 3D Core */}
            <div className="absolute inset-0 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-sm overflow-hidden">
              {/* Three.js Canvas Scene */}
              <Hero3DScene />
            </div>

            {/* Floating Glass Tech Badges around 3D Avatar */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 left-4 px-3 py-1.5 rounded-xl glass-panel bg-black/80 border border-white/15 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-xl pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>React Native &amp; Expo</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 -left-3 px-3 py-1.5 rounded-xl glass-panel bg-black/80 border border-white/15 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-xl pointer-events-none"
            >
              <span>✨</span>
              <span>60 FPS Reanimated</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
              className="absolute top-16 -right-3 px-3 py-1.5 rounded-xl glass-panel bg-black/80 border border-white/15 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-xl pointer-events-none hidden sm:flex"
            >
              <span>🔒</span>
              <span>FinTech Security</span>
            </motion.div>

            {/* Corner Decorative Tech Elements */}
            <div className="absolute -top-3 -right-3 flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-0.5 rounded-full border border-white/15 shadow-lg">
              <Sparkles className="w-3 h-3 text-zinc-300" />
              <span>3D AVATAR</span>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

