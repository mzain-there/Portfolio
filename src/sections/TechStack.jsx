import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

const MARQUEE_NAMES = [
  'HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'EXPRESS.JS', 'MONGODB', 
  'MYSQL', 'GIT', 'GITHUB', 'VITE', 'C', 'C++', 'TAILWIND CSS', 'FIGMA'
];

export default function TechStack() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.tech-heading', { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.tech-heading',
          start: 'top 85%',
          once: true,
        }
      });

      // Grid Animation
      gsap.fromTo('.tech-item', 
        { y: 30, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech-stack" ref={sectionRef} className="py-24 md:py-32 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body tech-heading">MY TOOLKIT</p>
        <h2 className="font-display text-5xl text-white mb-12 tech-heading">Tech Stack</h2>

        {/* Icon Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center"
        >
          {TECH_ITEMS.map((tech) => (
            <div
              key={tech.name}
              className="tech-item flex flex-col items-center justify-center p-6 bg-surface border border-border rounded-lg hover:-translate-y-[6px] hover:border-[#444] transition-all duration-300 group cursor-default"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className={`w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300 ${tech.invert ? 'invert' : ''}`}
                onError={(e) => {
                  // Fallback for icons that might fail or have different structure
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-xs text-muted group-hover:text-textPrimary transition-colors duration-300 font-body">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="w-full bg-[#070707] py-6 border-y border-border overflow-hidden relative">
        <div className="flex w-[200%] marquee-track whitespace-nowrap">
          {/* Double list for infinite seamless loop */}
          {[...MARQUEE_NAMES, ...MARQUEE_NAMES, ...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, index) => (
            <span 
              key={index} 
              className="font-display text-4xl md:text-6xl text-white/20 mx-8 hover:text-white transition-colors duration-300 cursor-default tracking-widest"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
