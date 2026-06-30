import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: '🎨',
    description: 'Building responsive, interactive user interfaces with modern web technologies.',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Responsive Design', icon: null },
      { name: 'GSAP', icon: null },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    description: 'Developing scalable server-side applications, RESTful APIs, and database management.',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'REST APIs', icon: null },
      { name: 'C / C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '📦',
    description: 'Leveraging powerful frameworks and libraries to accelerate development and deliver polished products.',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
    ],
  },
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

      // Category cards stagger
      gsap.fromTo('.skill-category-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: '.skill-cards-grid', start: 'top 80%', once: true },
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

        {/* Skill Category Cards */}
        <div className="skill-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-category-card bg-surface border border-border rounded-[10px] p-6 hover:border-[#444] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-display text-2xl text-white">{category.title}</h3>
              </div>

              {/* Description */}
              <p className="text-[13px] text-muted leading-relaxed font-body mb-5">{category.description}</p>

              {/* Skills List */}
              <div className="mt-auto space-y-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#111] border border-[#1e1e1e] hover:border-[#333] hover:bg-[#161616] transition-all duration-300 group"
                  >
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300 flex-shrink-0 ${skill.invert ? 'invert' : ''}`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#555] group-hover:bg-white transition-colors duration-300" />
                      </span>
                    )}
                    <span className="text-[13px] text-secondary group-hover:text-white transition-colors duration-300 font-body">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
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
    </section>
  );
}
