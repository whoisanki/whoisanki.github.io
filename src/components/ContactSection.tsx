import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon
} from './icons/SocialIcons';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  Flame,
  Phone
} from 'lucide-react';

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon
};

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'React Native & FinTech Mobile Architecture',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sounds.playCoinClink();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#e2e8f0', '#94a3b8']
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    sounds.playCoinClink();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#e2e8f0', '#94a3b8']
    });
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playWarp();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#e2e8f0', '#94a3b8']
    });

    const subject = encodeURIComponent(`[Portfolio Connect] ${formState.topic} from ${formState.name}`);
    const body = encodeURIComponent(
      `Hi Ankit,\n\nName: ${formState.name}\nEmail: ${formState.email}\nTopic: ${formState.topic}\n\nMessage:\n${formState.message}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };


  return (
    <section id="contact" className="relative py-28 overflow-hidden border-t border-white/10">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-zinc-400" />
            <span>LET&apos;S TALK CODE & HOT WINGS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Get In{' '}
            <span className="text-zinc-400">
              Touch.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            &ldquo;Wanna know much about Numismatics? Let&apos;s talk about how awesome they are! We can code while we eat hot wings!&rdquo;
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Connect & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Email & Phone Contact Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-6 rounded-3xl glass-panel space-y-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-zinc-900 text-white border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase">Direct Email</div>
                    <div className="text-base font-bold text-white font-mono break-all">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 font-semibold text-xs hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={() => sounds.playClick()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs shadow-md hover:bg-zinc-200 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Mail</span>
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-3xl glass-panel space-y-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-zinc-900 text-white border border-white/10">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase">Direct Phone / WhatsApp</div>
                    <div className="text-base font-bold text-white font-mono">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleCopyPhone}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 font-semibold text-xs hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied to Clipboard!' : 'Copy Phone'}</span>
                  </button>

                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    onClick={() => sounds.playClick()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>


            {/* Social Channels Matrix */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-400 uppercase px-1">
                Social Profiles & Networks
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PERSONAL_INFO.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon] || Sparkles;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClick()}
                      onMouseEnter={() => sounds.playHover()}
                      className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 group-hover:text-white group-hover:scale-105 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white group-hover:text-zinc-200 transition-colors">
                          {social.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          {social.username}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Coin & Wing Fun Fact Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs text-zinc-400 flex items-center gap-3">
              <span className="text-2xl">🪙🌶️</span>
              <p>
                Got a rare coin from an obscure corner of the world? Drop me a message — I might just trade you my favorite custom WebGL shader for it!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Message Dispatcher Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 relative">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Send a Direct Transmission
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the parameters below to initiate email client dispatch.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-zinc-400" />
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satoshi Nakamoto"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-white/40 focus:outline-none text-white text-sm font-sans placeholder:text-zinc-600 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. dev@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-white/40 focus:outline-none text-white text-sm font-sans placeholder:text-zinc-600 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Topic of Discussion</label>
                  <select
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-white/40 focus:outline-none text-white text-sm font-sans transition cursor-pointer"
                  >
                    <option value="React Native & FinTech Mobile Architecture">📱 React Native & FinTech Mobile Architecture</option>
                    <option value="Spicy Wings & Coding">🌶️ Spicy Wings & Coding Session</option>
                    <option value="Numismatic Coin Trade & Story">🪙 Numismatic Coin Trade & Story</option>
                    <option value="Frontend & 3D Project Collaboration">💻 Frontend & 3D Project Collaboration</option>
                    <option value="Just Saying Hi & Sharing Humour">😄 Just Saying Hi & Sharing Humour</option>
                  </select>

                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, coin collection, or favorite wing flavor..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-white/40 focus:outline-none text-white text-sm font-sans placeholder:text-zinc-600 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white text-black font-bold text-sm shadow-lg hover:bg-zinc-200 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Mailto</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

