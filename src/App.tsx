import { useEffect } from 'react';

import { ParticleBackground } from './components/canvas/ParticleBackground';
import { ScrollCurveLine } from './components/ScrollCurveLine';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';

import { Hero } from './components/Hero';
import { About } from './components/About';
import { NumismaticsSection } from './components/NumismaticsSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    // Smooth scrolling anchor handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 relative selection:bg-white/20 selection:text-white">

      {/* Background Particle Cosmos */}
      <ParticleBackground />

      {/* Background Continuous Curved Scroll Line */}
      <ScrollCurveLine />

      {/* Futuristic Custom Cursor */}
      <CustomCursor />


      {/* Glassmorphism Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 space-y-4">
        <Hero />
        <About />
        <NumismaticsSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
