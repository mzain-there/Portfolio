import { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import BatCanvas from './components/BatCanvas';
import Loader from './components/Loader';
import Cursor from './components/Cursor';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Connect Lenis to GSAP ticker
    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);

  // Scale reveal when loading finishes
  useEffect(() => {
    if (!loading && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
      );
    }
  }, [loading]);

  return (
    <>
      {/* Custom Mouse Cursor */}
      <Cursor />

      {/* Persistent Flying Bats Canvas */}
      <BatCanvas />

      {/* Fullscreen Initializer Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Content Area */}
      <div 
        ref={contentRef}
        style={{ opacity: loading ? 0 : 1 }}
        className="relative overflow-hidden w-full"
      >
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Certificates />
        <TechStack />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
