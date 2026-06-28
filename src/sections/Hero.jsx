import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import MagneticButton from '../components/MagneticButton';

const ROLES = ['MERN Stack Developer', 'Problem Solver', 'Open Source Contributor', 'CS Student'];

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 3.6 });

      // Name split
      const split = new SplitType(nameRef.current, { types: 'chars' });
      gsap.fromTo(
        split.chars,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.04, duration: 0.6, ease: 'power4.out', delay: 3.8 }
      );

      // Summary + buttons
      gsap.fromTo('.hero-summary', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 4.4 });
      gsap.fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 4.6 });
      gsap.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 5 });

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      if (roleRef.current) {
        gsap.to(roleRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            setRoleIndex((i) => (i + 1) % ROLES.length);
            gsap.fromTo(roleRef.current,
              { clipPath: 'inset(0 0 0 100%)' },
              { clipPath: 'inset(0 0 0 0)', duration: 0.4, ease: 'power2.out' }
            );
          },
        });
      }
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ zIndex: 1 }}
    >
      {/* Eyebrow */}
      <p className="hero-eyebrow text-xs tracking-[0.2em] text-muted mb-6 font-body opacity-0">
        MERN STACK DEVELOPER · RAWALPINDI, PAKISTAN
      </p>

      {/* Name */}
      <h1
        ref={nameRef}
        className="font-display text-[52px] md:text-[88px] text-white leading-none tracking-wider overflow-hidden"
      >
        MOHAMMAD ZAIN
      </h1>

      {/* Role typewriter */}
      <div className="h-8 mt-4 mb-6 overflow-hidden">
        <p ref={roleRef} className="text-lg text-secondary font-body" style={{ clipPath: 'inset(0 0 0 0)' }}>
          {ROLES[roleIndex]}
        </p>
      </div>

      {/* Summary */}
      <p className="hero-summary text-[17px] md:text-[19px] text-muted leading-[1.85] max-w-[720px] mb-10 font-body opacity-0">
        I am a dedicated MERN Stack Developer specializing in building high-performance, responsive, and visually stunning web applications.
        By blending modern front-end design systems with robust and scalable back-end architectures, I create seamless, user-centric digital experiences.
        Currently enrolled in BS Computer Science at PMAS Arid Agriculture University, Rawalpindi, constantly pushing the boundaries of web technologies.
      </p>

      {/* CTA buttons */}
      <div className="hero-buttons flex gap-4 opacity-0">
        <MagneticButton
          onClick={scrollToProjects}
          className="px-7 py-3 bg-white text-black text-sm font-medium font-body hover:scale-[1.03] transition-transform duration-300"
        >
          View Projects
        </MagneticButton>
        <MagneticButton
          as="a"
          href="/cv.pdf"
          download
          className="px-7 py-3 border border-accent text-white text-sm font-body hover:bg-white hover:text-black transition-all duration-300"
        >
          Download CV
        </MagneticButton>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2 opacity-0">
        <span className="text-xs text-[#444] tracking-[0.15em] font-body">SCROLL</span>
        <div className="w-[1px] h-8 bg-[#333] overflow-hidden">
          <div className="scroll-line w-full h-full bg-[#666]" />
        </div>
      </div>
    </section>
  );
}
