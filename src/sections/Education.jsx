import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    year: '2022 — Present', degree: 'BS Computer Science',
    institution: 'PMAS Arid Agriculture University, Rawalpindi',
    description: '[Add academic description here]', // TODO: Replace with real content
    badge: 'Current',
  },
  {
    year: '2020 — 2022', degree: 'Intermediate (ICS)',
    institution: 'Jinnah School and College, Rawalpindi',
    description: '[Add academic description here]', // TODO: Replace with real content
    score: '83%',
  },
  {
    year: '2018 — 2020', degree: 'Matric (Science)',
    institution: 'Jinnah School and College, Rawalpindi',
    description: '[Add academic description here]', // TODO: Replace with real content
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.edu-heading', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: '.edu-heading', start: 'top 85%', once: true },
      });
      gsap.fromTo('.edu-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: '.edu-cards', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body edu-heading">EDUCATION</p>
        <h2 className="font-display text-5xl text-white mb-12 edu-heading">Academic Background</h2>

        <div className="edu-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="edu-card bg-surface border border-border rounded-[10px] p-6 hover:border-[#444] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted font-body">{edu.year}</span>
                {edu.badge && (
                  <span className="px-3 py-1 text-[10px] border border-accent text-white rounded-full">{edu.badge}</span>
                )}
                {edu.score && (
                  <span className="px-3 py-1 text-[10px] border border-border text-secondary rounded-full">{edu.score}</span>
                )}
              </div>
              <h3 className="font-display text-2xl text-white mb-1">{edu.degree}</h3>
              <p className="text-xs text-secondary mb-3 font-body">{edu.institution}</p>
              <p className="text-[13px] text-muted leading-relaxed font-body">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
