import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const XIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const ExternalLinkIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);

const GithubIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Slide up animation
    gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });

    // Trap focus + Escape key
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9995, background: 'rgba(0,0,0,0.94)' }}
      onClick={(e) => { if (e.target === modalRef.current) onClose(); }}
    >
      <div
        ref={cardRef}
        className="relative bg-surface border border-border rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-10"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          <XIcon size={20} />
        </button>

        {/* Title */}
        <h2 className="font-display text-4xl text-white mb-2">{project.title}</h2>
        <span className="inline-block px-3 py-1 text-xs border border-border text-muted rounded-full mb-6">
          {project.category}
        </span>

        {/* TODO: Replace with real content */}
        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <div>
            <h3 className="text-white font-body font-medium text-base mb-2">Overview</h3>
            <p>{project.description || '[Full project description to be added here. Explain what the project does and why it was built.]'}</p>
          </div>
          <div>
            <h3 className="text-white font-body font-medium text-base mb-2">Problem</h3>
            <p>[Describe the problem this project solves. What pain point does it address?]</p>
          </div>
          <div>
            <h3 className="text-white font-body font-medium text-base mb-2">Solution</h3>
            <p>[Explain your technical approach and key decisions made during development.]</p>
          </div>
          <div>
            <h3 className="text-white font-body font-medium text-base mb-2">Outcome</h3>
            <p>[Share the results — metrics, user feedback, or lessons learned.]</p>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 text-[11px] border border-[#444] text-muted rounded-full">{t}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded hover:opacity-90 transition-opacity"
          >
            <ExternalLinkIcon size={14} /> Live Demo
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 border border-accent text-white text-sm font-medium rounded hover:bg-white hover:text-black transition-all"
          >
            <GithubIcon size={14} /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
