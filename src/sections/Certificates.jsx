import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AwardIcon = ({ size = 28, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

gsap.registerPlugin(ScrollTrigger);

// TODO: Replace with real content
const CERTS = [
  { title: '[Certificate Name]', issuer: '[Issuing Organisation]', date: '[Month Year]' },
  { title: '[Certificate Name]', issuer: '[Issuing Organisation]', date: '[Month Year]' },
  { title: '[Certificate Name]', issuer: '[Issuing Organisation]', date: '[Month Year]' },
];

export default function Certificates() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-heading', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: '.cert-heading', start: 'top 85%', once: true },
      });
      gsap.fromTo('.cert-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: '.cert-cards', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body cert-heading">ACHIEVEMENTS</p>
        <h2 className="font-display text-5xl text-white mb-12 cert-heading">Licences & Certificates</h2>

        <div className="cert-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTS.map((cert, i) => (
            <div
              key={i}
              className="cert-card bg-surface border border-border rounded-[10px] p-6 hover:border-[#444] hover:-translate-y-1 transition-all duration-300"
            >
              <AwardIcon size={28} className="text-muted mb-4" />
              <h3 className="font-display text-xl text-white mb-1">{cert.title}</h3>
              <p className="text-xs text-secondary mb-1 font-body">{cert.issuer}</p>
              <p className="text-xs text-muted font-body mb-4">{cert.date}</p>
              <p className="text-[13px] text-[#444] italic font-body">— to be added —</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
