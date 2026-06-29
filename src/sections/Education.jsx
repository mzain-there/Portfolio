import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    year: '2022 — Present',
    degree: 'BS Computer Science',
    institution: 'PMAS Arid Agriculture University, Rawalpindi',
    badge: 'Current',
    description: 'Pursuing a four-year degree focused on core CS fundamentals and modern software engineering, applying theoretical knowledge to real-world full-stack projects.',
    highlights: [
      { label: 'Semester', value: '5th' },
      { label: 'Focus', value: 'Software Engineering' },
    ],
    courses: [
      'Programming Fundamentals',
      'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Computer Networks',
    ],
  },
  {
    year: '2020 — 2022',
    degree: 'Intermediate (ICS)',
    institution: 'Jinnah School and College, Rawalpindi',
    score: '84%',
    description: 'Studied Computer Science with Physics and Mathematics. First exposure to programming logic, problem-solving, and computational thinking that sparked my passion for software development.',
    highlights: [
      { label: 'Score', value: '84%' },
      { label: 'Group', value: 'ICS' },
    ],
    courses: [
      'Computer Science',
      'Physics',
      'Mathematics',
    ],
  },
  {
    year: '2018 — 2020',
    degree: 'Matric (Science)',
    institution: 'Jinnah School and College, Rawalpindi',
    score: '90%',
    description: 'Completed matriculation with a Science major, developing strong analytical and mathematical reasoning skills that became the backbone of my technical journey.',
    highlights: [
      { label: 'Score', value: '90%' },
      { label: 'Group', value: 'Science' },
    ],
    courses: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science',
    ],
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
              className="edu-card bg-surface border border-border rounded-[10px] p-6 hover:border-[#444] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted font-body">{edu.year}</span>
                {edu.badge && (
                  <span className="px-3 py-1 text-[10px] border border-accent text-white rounded-full">{edu.badge}</span>
                )}
                {edu.score && !edu.badge && (
                  <span className="px-3 py-1 text-[10px] border border-border text-secondary rounded-full">{edu.score}</span>
                )}
              </div>

              {/* Degree & Institution */}
              <h3 className="font-display text-2xl text-white mb-1">{edu.degree}</h3>
              <p className="text-xs text-secondary mb-3 font-body">{edu.institution}</p>

              {/* Description */}
              <p className="text-[13px] text-muted leading-relaxed font-body mb-4">{edu.description}</p>

              {/* Highlight pills */}
              {edu.highlights && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {edu.highlights.map((h) => (
                    <span
                      key={h.label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-body rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-secondary"
                    >
                      <span className="text-muted">{h.label}:</span>
                      <span className="text-white">{h.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Courses / Subjects */}
              {edu.courses && (
                <div className="mt-auto">
                  <p className="text-[11px] tracking-[0.1em] text-muted font-body mb-2 uppercase">
                    {edu.degree.includes('BS') ? 'Key Courses' : 'Subjects'}
                  </p>
                  <ul className="space-y-1.5">
                    {edu.courses.map((course) => (
                      <li key={course} className="flex items-start gap-2 text-[12px] text-secondary font-body leading-snug">
                        <span className="mt-[5px] w-1 h-1 rounded-full bg-[#555] flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
