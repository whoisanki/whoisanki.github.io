import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Sparkles, Send, FileDown } from 'lucide-react';
import { sounds } from '../utils/audio';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Numismatics 3D', href: '#numismatics', badge: '3D' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sounds.toggleMute();
    setIsMuted(newState);
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-500 via-white to-slate-400 origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/15 p-0.5 group-hover:border-white/40 transition-all duration-300 flex items-center justify-center">
              <span className="font-bold text-white text-base font-mono">⚡</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-slate-300 transition-colors">
                Ankith M.
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                @whoisanki
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sounds.playClick()}
                onMouseEnter={() => sounds.playHover()}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-white/15 text-white border border-white/20">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Icons (Resume Download, Audio Toggle & CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Download Resume Button */}
            <a
              href="/Ankith_Mahindrakar_Resume.pdf"
              download="Ankith_Mahindrakar_Resume.pdf"
              onClick={() => sounds.playCoinClink()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel hover:bg-white/15 text-zinc-200 hover:text-white text-xs font-medium border border-white/15 transition-all cursor-pointer"
              title="Download Ankith's Resume (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 text-zinc-300" />
              <span>Resume</span>
            </a>

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-zinc-900/60 border-white/10 text-zinc-500 hover:text-zinc-300'
                  : 'bg-zinc-800 border-white/20 text-white shadow-sm'
              }`}
              title={isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs shadow-md hover:bg-zinc-200 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </a>
          </div>


          {/* Mobile Menu & Audio Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                sounds.playClick();
              }}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 mx-4 p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  sounds.playClick();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:bg-white/10 transition"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-white/20 text-white">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-2">
              <a
                href="/Ankith_Mahindrakar_Resume.pdf"
                download="Ankith_Mahindrakar_Resume.pdf"
                onClick={() => {
                  setMobileMenuOpen(false);
                  sounds.playCoinClink();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass-panel text-white font-semibold text-sm border border-white/20"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black font-bold text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get In Touch</span>
              </a>
            </div>

          </motion.div>
        )}
      </header>

    </>
  );
};
