import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { ArrowUp, Coins } from 'lucide-react';


export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-black border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 font-bold text-white tracking-tight">
            <span className="text-zinc-400 font-mono">⚡</span>
            <span>Ankith Mahindrakar</span>
            <span className="text-xs font-mono text-zinc-400">({PERSONAL_INFO.handle})</span>
          </div>
          <p className="text-xs text-zinc-400 flex items-center gap-1">
            <span>Crafted with Three.js, React, Framer Motion, and</span>
            <Coins className="w-3.5 h-3.5 text-zinc-400 inline" />
            <span>coins from 26+ countries</span>
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-400">
          {PERSONAL_INFO.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="hover:text-white transition"
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-zinc-400">
            © {new Date().getFullYear()} Ankith M.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
