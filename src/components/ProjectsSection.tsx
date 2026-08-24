import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { sounds } from '../utils/audio';
import { GithubIcon } from './icons/SocialIcons';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';


export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>FEATURED PORTFOLIO PROJECTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Crafted with Code &amp;{' '}
            <span className="text-zinc-400">
              Creativity.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            Interactive web applications, 3D WebGL experiences, and frontend engineering experiments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'mobile', label: 'Mobile FinTech' },
            { id: '3d', label: '3D WebGL' },
            { id: 'web', label: 'Web Apps' },
            { id: 'creative', label: 'Creative Lab' },
          ].map((tab) => (

            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                sounds.playClick();
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white text-black font-bold shadow-md scale-105'
                  : 'glass-panel text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => sounds.playHover()}
              className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-300 uppercase">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-zinc-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-zinc-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                        }}
                        className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition cursor-pointer"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                        }}
                        className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition cursor-pointer"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    {project.subtitle}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2">
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags and Modal Opener */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-900 border border-white/5 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(project);
                    sounds.playClick();
                  }}
                  className="text-xs font-bold text-white hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Quick View</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>


      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-300 uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
                <div className="text-sm font-mono text-zinc-400">
                  {selectedProject.subtitle}
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                  Key Technical Highlights
                </div>
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 font-semibold text-xs hover:border-white/30 transition"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target={selectedProject.liveUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs shadow-md hover:bg-zinc-200 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
