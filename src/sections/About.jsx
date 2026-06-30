import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const MD_BREAKPOINT = 768;

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const photoAreaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MD_BREAKPOINT);

  // Track viewport width
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading split
      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.fromTo(split.chars, { y: '100%', opacity: 0 }, {
        y: '0%', opacity: 1, stagger: 0.03, duration: 0.5, ease: 'power4.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
      });

      // Left content
      gsap.fromTo('.about-left-content > *', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: '.about-left-content', start: 'top 80%', once: true },
      });

      // Stats counter
      gsap.utils.toArray('.stat-number').forEach((el) => {
        const target = el.dataset.target;
        const isPercent = target.includes('%');
        const num = parseInt(target);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (isPercent ? '%' : target.includes('+') ? '+' : '');
          },
        });
      });

      // Photo entrance animation
      if (photoAreaRef.current) {
        gsap.fromTo(photoAreaRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoAreaRef.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      }

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mouse Handlers for Flashlight Reveal — only on desktop
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const el = photoAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(el, {
      '--lens-x': `${x}px`,
      '--lens-y': `${y}px`,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const handleMouseEnter = (e) => {
    if (isMobile) return;
    const el = photoAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(el, {
      '--lens-x': `${x}px`,
      '--lens-y': `${y}px`
    });

    gsap.to(el, {
      '--lens-radius': '130px',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    const el = photoAreaRef.current;
    if (!el) return;

    gsap.to(el, {
      '--lens-radius': '0px',
      duration: 0.4,
      ease: 'power2.inOut'
    });
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ── Mobile Photo (shown first on small screens, hidden on md+) ── */}
        <div className="block md:hidden flex justify-center opacity-0" ref={isMobile ? photoAreaRef : undefined}>
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-2 border-[#2a2a2a] mx-auto"
            style={{
              boxShadow: '0 0 30px rgba(255,255,255,0.06), 0 0 60px rgba(200,200,255,0.03)',
            }}
          >
            <img
              src="/pic.jpeg"
              alt="Mohammad Zain"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.02) contrast(1.1) grayscale(10%) saturate(0.9)',
              }}
            />
          </div>
        </div>

        {/* ── Left column — Text content ── */}
        <div className="about-left-content space-y-6">
          <p className="text-xs tracking-[0.2em] text-muted font-body">WHO I AM</p>
          <h2 ref={headingRef} className="font-display text-[56px] leading-none text-white overflow-hidden">
            MOHAMMAD<br />ZAIN
          </h2>
          <p className="text-sm text-secondary font-body">BS Computer Science</p>
          <p className="text-[15px] text-muted leading-[1.8] font-body">
            I am a MERN Stack Developer with a passion for crafting immersive, performance-driven interfaces.
            Currently building full-stack web applications using MongoDB, Express, React, and Node.js while completing my CS degree.
            I believe code should be as elegant as the design it produces.
            From transforming complex problems into clean, scalable architectures to obsessing over pixel-perfect UI details — I thrive at the intersection of logic and creativity.

          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { num: '5+', label: 'Projects Shipped' },
              { num: '25+', label: 'Commits / Month' },
              { num: '8+', label: 'Technologies Learnt' },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded-lg p-4 text-center">
                <span className="stat-number font-display text-3xl text-white block" data-target={s.num}>0</span>
                <span className="text-[11px] text-muted font-body mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[15px] text-muted leading-[1.8] font-body">
            My goal is to become a full-stack engineer known for building products
            that are both technically robust and visually exceptional.
          </p>
        </div>

        {/* ── Right column — Desktop photo with Batman + lens reveal (hidden on mobile) ── */}
        <div
          ref={!isMobile ? photoAreaRef : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block relative h-[450px] md:h-[550px] w-full overflow-hidden cursor-none opacity-0"
          style={{
            '--lens-radius': '0px',
            '--lens-x': '50%',
            '--lens-y': '50%',
            maskImage: 'radial-gradient(ellipse 85% 80% at center, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at center, black 50%, transparent 100%)',
          }}
        >
          {/* Underlay Batman Image (always visible) */}
          <img
            src="/batman-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              filter: 'brightness(0.45) contrast(1.15) grayscale(20%)',
            }}
          />

          {/* Overlay Zain Image with Flashlight Reveal */}
          <img
            src="/pic.jpeg"
            alt="Mohammad Zain"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              clipPath: 'circle(var(--lens-radius) at var(--lens-x) var(--lens-y))',
              filter: 'brightness(0.55) contrast(1.1) grayscale(25%) saturate(0.8)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
