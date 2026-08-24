import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { Coins, Code, Sparkles, Rocket, Milestone, Smartphone } from 'lucide-react';

const ICON_MAP = {
  coin: Coins,
  code: Code,
  mobile: Smartphone,
  sparkle: Sparkles,
  rocket: Rocket
};


export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="relative py-28 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Milestone className="w-3.5 h-3.5 text-zinc-400" />
            <span>JOURNEY & MILESTONES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            The Evolution of{' '}
            <span className="text-zinc-400">
              Passion & Code.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            From collecting global coins as a 12-year-old to sculpting 3D interactive web worlds.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 sm:-translate-x-1/2 w-0.5 bg-white/10" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = ICON_MAP[item.iconType] || Sparkles;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-zinc-950 border border-white/30 shadow-md flex items-center justify-center text-zinc-300 group-hover:scale-125 group-hover:border-white group-hover:text-white transition-all duration-300 z-10">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/30 hover:shadow-lg transition-all duration-300 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {item.tag}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-xs font-mono text-zinc-400 mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

