import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_SKILLS = [
  { name: 'HTML/CSS', percent: 92 },
  { name: 'JavaScript', percent: 85 },
  { name: 'React', percent: 82 },
  { name: 'Node.js', percent: 70 },
  { name: 'SQL / MongoDB', percent: 65 },
  { name: 'C / C++', percent: 60 },
];

const SOFT_SKILLS = [
  'Problem Solving', 'Technical Writing', 'Team Working',
  'Leadership', 'Communication', 'Critical Thinking',
  'Time Management', 'Adaptability',
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-heading', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: '.skills-heading', start: 'top 85%', once: true },
      });

      // Skill bars + counters
      document.querySelectorAll('.skill-item').forEach((el) => {
        const bar = el.querySelector('.skill-bar-fill');
        const counter = el.querySelector('.skill-counter');
        const target = parseInt(el.dataset.percent);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val) + '%';
            bar.style.width = obj.val + '%';
          },
        });
      });

      // Soft skills stagger
      gsap.fromTo('.soft-chip', { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.06, duration: 0.4,
        scrollTrigger: { trigger: '.soft-skills-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body skills-heading">EXPERTISE</p>
        <h2 className="font-display text-5xl text-white mb-12 skills-heading">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Technical */}
          <div>
            <h3 className="text-sm text-secondary mb-8 font-body">Technical Skills</h3>
            <div className="space-y-6">
              {TECH_SKILLS.map((skill) => (
                <div key={skill.name} className="skill-item" data-percent={skill.percent}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-textPrimary font-body">{skill.name}</span>
                    <span className="skill-counter text-sm text-muted font-mono">0%</span>
                  </div>
                  <div className="w-full h-[2px] bg-border rounded">
                    <div className="skill-bar-fill h-full bg-white rounded" style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft */}
          <div>
            <h3 className="text-sm text-secondary mb-8 font-body">Soft Skills</h3>
            <div className="soft-skills-grid flex flex-wrap gap-3">
              {SOFT_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="soft-chip px-5 py-2.5 text-sm text-muted border border-[#333] rounded-full hover:border-[#888] hover:text-textPrimary transition-all duration-300 cursor-default font-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
