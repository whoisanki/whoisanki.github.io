import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../data/portfolioData';
import type { Skill } from '../types';
import { sounds } from '../utils/audio';
import {
  Code,
  Layers,
  Wrench,
  Sparkles,
  Smartphone,
  Activity,
  Atom,
  FileCode2,
  ShieldCheck,
  Layout,
  Palette,
  Box,
  Wand2,
  Zap,
  GitBranch,
  Gauge,
  Volume2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Activity,
  Atom,
  FileCode2,
  ShieldCheck,
  Layout,
  Palette,
  Box,
  Sparkles,
  Layers,
  Wand2,
  Zap,
  GitBranch,
  Gauge,
  Volume2
};

const CATEGORIES = [
  { id: 'all', label: 'All Techs', icon: Sparkles },
  { id: 'mobile', label: 'Mobile & FinTech', icon: Smartphone },
  { id: 'frontend', label: 'Frontend Stack', icon: Code },
  { id: 'creative3d', label: '3D & Motion', icon: Box },
  { id: 'tools', label: 'Tools & Workflow', icon: Wrench },
];


export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>TECH ARSENAL & CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Skills &amp;{' '}
            <span className="text-zinc-400">
              Modern Technologies.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            Engineering robust web architecture, fluid 3D animations, and clean responsive interfaces.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  sounds.playClick();
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md scale-105'
                    : 'glass-panel text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill: Skill, idx: number) => {
            const IconComponent = ICON_MAP[skill.iconName] || Code;
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/30 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-zinc-300">
                      {skill.level}%
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Level Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-zinc-500 via-zinc-300 to-white rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

