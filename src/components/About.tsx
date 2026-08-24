import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Code, Compass, Smile, Sparkles, Eye, FileDown } from 'lucide-react';
import { sounds } from '../utils/audio';

const ABOUT_CARDS = [
  {
    icon: Smartphone,
    title: 'React Native & FinTech',
    desc: 'Architecting mission-critical mobile banking and financial applications with biometric authentication, encrypted tokens, and real-time transaction streaming.',
    tag: 'Mobile FinTech'
  },
  {
    icon: Code,
    title: 'Frontend & Web Architecture',
    desc: 'Crafting pixel-precise, responsive interfaces with React, modern CSS systems, TypeScript, and micro-interactions that captivate users.',
    tag: 'Web & 3D'
  },
  {
    icon: Compass,
    title: 'The Numismatist Mindset',
    desc: 'Collecting coins from 26+ countries since age 12 has fostered an eye for historical detail, patience, rarity, and meticulous cataloging.',
    tag: 'Collector Ethos'
  },
  {
    icon: Smile,
    title: 'Culture & Collaboration',
    desc: 'Great software is engineered with serious dedication, but built best with open collaboration, high spirits, and a fun team vibe.',
    tag: 'Engineering Culture'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>ORIGIN &amp; PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Engineering{' '}
            <span className="text-zinc-400">
              Philosophy.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Bridging technical precision in cross-platform mobile architecture with high-performance WebGL aesthetics.
          </p>
        </div>

        {/* Featured Story Box with Minimal Border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl glass-panel relative border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-white/10 text-white">
                  <Eye className="w-5 h-5" />
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Mobile FinTech &amp; Shared Architecture
                </h3>
              </div>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                With a track record architecting enterprise systems for banking leaders like <span className="text-white font-semibold">Mashreq</span> and <span className="text-white font-semibold">ADCB</span>, plus high-scale retail with <span className="text-white font-semibold">Dollar Tree</span>, I specialize in crafting zero-latency payment flows, biometric security, Tamagui shared cross-platform architectures, and silky 60/120 FPS Reanimated motion.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['React Native', 'Tamagui', 'TypeScript', 'Reanimated 3', 'GraphQL', 'NestJS', 'Three.js', 'Numismatics'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-xl text-center space-y-3">
              <div className="text-4xl">📱 🪙 ⚡</div>
              <div className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                Core Engineering Creed
              </div>
              <p className="text-xs text-zinc-400">
                FinTech Rigor + Zero-Jank 60 FPS + Seamless UX.
              </p>

              <a
                href="/Ankith_Mahindrakar_Resume.pdf"
                download="Ankith_Mahindrakar_Resume.pdf"
                onClick={() => sounds.playCoinClink()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md cursor-pointer mt-1"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* 4 Interactive Feature Pillar Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ABOUT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
