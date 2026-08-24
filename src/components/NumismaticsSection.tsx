import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coin3DViewer } from './canvas/Coin3DViewer';
import { COIN_COUNTRIES_DATA } from '../data/portfolioData';
import type { CoinCountry } from '../types';
import { sounds } from '../utils/audio';
import { Coins, Globe2, Award } from 'lucide-react';

export const NumismaticsSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CoinCountry>(COIN_COUNTRIES_DATA[0]);

  return (
    <section id="numismatics" className="relative py-28 overflow-hidden border-y border-white/10">
      {/* Subtle ambient illumination */}
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Coins className="w-3.5 h-3.5 text-zinc-400" />
            <span>NUMISMATIC PASSION SPOTLIGHT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Endless Love for{' '}
            <span className="text-zinc-400">
              Coin Collecting.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg italic leading-relaxed">
            &ldquo;My love for collection of coins is endless. I started to collect coins since I was 12, it grew on me like wildfire in a dense forest. I have around 26 country coins and to be honest now I lost the count.&rdquo;
          </p>
        </div>

        {/* 3D Coin Viewer and Interactive Story Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Interactive WebGL Coin Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <Coin3DViewer />
          </motion.div>

          {/* Right: Selected Country Details & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Spotlight Card */}
            <div className="p-8 rounded-3xl glass-panel relative border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedCountry.country}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      Currency: {selectedCountry.currency}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200 font-mono text-xs flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{selectedCountry.rarity}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Minting Material & Epoch
                  </div>
                  <div className="text-sm font-semibold text-zinc-200 mt-0.5">
                    {selectedCountry.material} • {selectedCountry.yearRange}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Collection Story & Trivia
                  </div>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    {selectedCountry.story}
                  </p>
                </div>
              </div>

              {/* Collector Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="text-base font-bold text-white font-mono">12 Yrs</div>
                  <div className="text-[10px] text-zinc-400">Started Age</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="text-base font-bold text-white font-mono">26+</div>
                  <div className="text-[10px] text-zinc-400">Countries</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div className="text-base font-bold text-white font-mono">∞</div >
                  <div className="text-[10px] text-zinc-400">Passion</div>
                </div>
              </div>
            </div>

            {/* Quick Country Selector Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>SELECT A COUNTRY ARCHIVE:</span>
                </span>
                <span className="text-zinc-400">Click to explore</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COIN_COUNTRIES_DATA.map((coin) => {
                  const isSelected = selectedCountry.country === coin.country;
                  return (
                    <button
                      key={coin.country}
                      onClick={() => {
                        setSelectedCountry(coin);
                        sounds.playCoinClink();
                      }}
                      onMouseEnter={() => sounds.playHover()}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-white/40 text-white shadow'
                          : 'bg-zinc-900/60 border-white/10 hover:border-white/20 text-zinc-300'
                      }`}
                    >
                      <span className="text-xl">{coin.flag}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold truncate">{coin.country}</div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">{coin.currency}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

