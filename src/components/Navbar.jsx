import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG components for maximum compatibility
const MenuIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const XIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const NAV_LINKS = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'];
const SECTION_IDS = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const navRef = useRef(null);
  const [active, setActive] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const nav = navRef.current;

    // Slide in on load
    gsap.fromTo(nav, { y: -120 }, { y: 0, duration: 0.8, ease: 'power3.out', delay: 3.8 });

    // Show/hide on scroll
    const onScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 100) {
        gsap.to(nav, { y: -120, duration: 0.3, ease: 'power2.in' });
      } else {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      }
      lastScroll.current = curr;
    };
    window.addEventListener('scroll', onScroll);

    // Active section detection
    const observers = SECTION_IDS.map((id, i) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(NAV_LINKS[i]); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  const scrollTo = (link) => {
    const id = SECTION_IDS[NAV_LINKS.indexOf(link)];
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6"
        style={{
          zIndex: 9990,
          background: 'rgba(10, 10, 10, 0.30)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-120px)',
        }}
      >
        {/* Logo */}
        <span className="font-display text-3xl md:text-4xl text-white tracking-widest cursor-pointer" onClick={() => scrollTo('Home')}>MZ</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`text-[15px] font-body transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                active === link ? 'text-white' : 'text-muted hover:text-textPrimary'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Spacer to keep navigation centered */}
        <div className="hidden md:block w-8" />

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-bg flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9989 }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className={`font-display text-3xl tracking-wider bg-transparent border-none cursor-pointer ${
              active === link ? 'text-white' : 'text-muted'
            }`}
          >
            {link}
          </button>
        ))}
        <a
          href="/cv.pdf"
          download
          className="mt-4 px-6 py-3 text-sm text-white border border-accent hover:bg-white hover:text-black transition-all duration-300"
        >
          Download CV
        </a>
      </div>
    </>
  );
}
