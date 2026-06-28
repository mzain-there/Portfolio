import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from '../components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Web', 'SaaS', 'E-Commerce', 'AI', 'C++'];

const PROJECTS = [
  {
    id: 1,
    title: 'BlogHub',
    category: 'Web',
    description: 'A responsive blogging platform and dashboard powered by React and Tailwind CSS.',
    tech: ['React', 'Vite', 'Tailwind', 'DummyJSON API'],
  },
  {
    id: 2,
    title: 'BillSplit',
    category: 'SaaS',
    description: 'An elegant expense splitting SaaS application with real-time calculations and shared ledgers.',
    tech: ['React', 'Node.js', 'Express'],
  },
  {
    id: 3,
    title: 'GymFit',
    category: 'Web',
    description: 'A comprehensive membership registration, billing, and trainer management platform for fitness centers.',
    tech: ['Node.js', 'Express', 'HTML/CSS'],
  },
  {
    id: 4,
    title: 'StrideWeek',
    category: 'Web',
    description: 'A lightweight Progressive Web App productivity and schedule tracker built with vanilla JavaScript.',
    tech: ['PWA', 'Vanilla JS'],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.projects-heading', { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 85%',
          once: true,
        }
      });

      // Stagger Animation for Cards
      gsap.fromTo('.project-card', 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter & Search Logic
  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body projects-heading">MY WORK</p>
        <h2 className="font-display text-5xl text-white mb-12 projects-heading">Projects</h2>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 text-xs font-body rounded-full border transition-all duration-300 ${
                  selectedFilter === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-muted border-[#444] hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] text-white text-sm font-body px-4 py-2.5 rounded border border-border focus:border-[#444] focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="project-card bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:border-[#444] transition-all duration-300 flex flex-col group"
            >
              {/* Image Area */}
              <div className="h-[200px] bg-[#111] overflow-hidden relative flex items-center justify-center">
                {/* Background base (always visible but dark) */}
                <div className="absolute inset-0 bg-[#080808] flex items-center justify-center border-b border-border">
                  <span className="font-display text-2xl text-muted/30 tracking-widest">{project.title}</span>
                </div>

                {/* Hover Reveal Image / Dark Placeholder overlay */}
                <div className="project-img-overlay absolute inset-0 bg-black flex flex-col items-center justify-center p-4">
                  <span className="font-display text-4xl text-white tracking-widest mb-2">{project.title.toUpperCase()}</span>
                  <span className="text-[11px] text-muted tracking-widest font-mono">VIEW CASE STUDY</span>
                </div>

                {/* Category Badge */}
                <span className="absolute top-4 right-4 bg-[#1a1a1a]/80 backdrop-blur text-[10px] text-accent px-2.5 py-1 border border-border rounded-full font-mono">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base text-white font-medium font-body mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-body mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="px-2 py-1 text-[11px] text-muted border border-[#444] rounded-full font-body"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted font-body">
              No projects found matching the criteria.
            </div>
          )}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </section>
  );
}
