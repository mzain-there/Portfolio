import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

const MailIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const LinkedinIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.contact-heading', { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.contact-heading',
          start: 'top 85%',
          once: true,
        }
      });

      // Left Column Animation (fields entering from left)
      gsap.fromTo('.contact-field',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );

      // Right Column Animation (cards entering from right)
      gsap.fromTo('.contact-method-card',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // TODO: Wire up EmailJS properly when installed.
    // Example:
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
    //   .then(() => { ... })
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] text-muted mb-4 font-body contact-heading">GET IN TOUCH</p>
        <h2 className="font-display text-5xl text-white mb-12 contact-heading">Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column — Contact Form */}
          <div ref={leftColRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="contact-field">
                <label className="block text-xs text-secondary font-body mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#111111] text-white text-sm font-body px-4 py-3 rounded border border-border focus:border-[#555] focus:outline-none transition-colors duration-300 placeholder-[#666]"
                />
              </div>

              <div className="contact-field">
                <label className="block text-xs text-secondary font-body mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#111111] text-white text-sm font-body px-4 py-3 rounded border border-border focus:border-[#555] focus:outline-none transition-colors duration-300 placeholder-[#666]"
                />
              </div>

              <div className="contact-field">
                <label className="block text-xs text-secondary font-body mb-2">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Project Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#111111] text-white text-sm font-body px-4 py-3 rounded border border-border focus:border-[#555] focus:outline-none transition-colors duration-300 placeholder-[#666]"
                />
              </div>

              <div className="contact-field">
                <label className="block text-xs text-secondary font-body mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Your message details..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#111111] text-white text-sm font-body px-4 py-3 rounded border border-border focus:border-[#555] focus:outline-none transition-colors duration-300 placeholder-[#666] resize-none"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="contact-field text-green-400 text-sm font-body">
                  Message sent. I'll get back to you soon.
                </div>
              )}

              <div className="contact-field pt-2">
                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-white text-black text-sm font-medium font-body hover:bg-black hover:text-white border border-white transition-all duration-300 text-center"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Right Column — Social Contact Cards */}
          <div ref={rightColRef} className="flex flex-col justify-center space-y-6">
            {/* Gmail Card */}
            {/* TODO: Replace placeholders with real user credentials later */}
            <a 
              href="mailto:mohammmadzain@gmail.com"
              className="contact-method-card flex items-center p-6 bg-surface border border-border rounded-xl hover:border-[#555] transition-all duration-300 group"
            >
              <div className="p-3 bg-[#1a1a1a] rounded-lg border border-border group-hover:border-[#444] transition-colors duration-300 mr-4">
                <MailIcon size={20} className="text-muted group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-xs text-muted font-body mb-0.5">Email</span>
                <span className="text-sm text-secondary group-hover:text-white transition-colors duration-300 font-body">
                  mohammmadzain@gmail.com
                </span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a 
              href="https://linkedin.com/in/mzain"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method-card flex items-center p-6 bg-surface border border-border rounded-xl hover:border-[#555] transition-all duration-300 group"
            >
              <div className="p-3 bg-[#1a1a1a] rounded-lg border border-border group-hover:border-[#444] transition-colors duration-300 mr-4">
                <LinkedinIcon size={20} className="text-muted group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-xs text-muted font-body mb-0.5">LinkedIn</span>
                <span className="text-sm text-secondary group-hover:text-white transition-colors duration-300 font-body">
                  linkedin.com/in/mzain
                </span>
              </div>
            </a>

            {/* GitHub Card */}
            <a 
              href="https://github.com/mzain-there"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method-card flex items-center p-6 bg-surface border border-border rounded-xl hover:border-[#555] transition-all duration-300 group"
            >
              <div className="p-3 bg-[#1a1a1a] rounded-lg border border-border group-hover:border-[#444] transition-colors duration-300 mr-4">
                <GithubIcon size={20} className="text-muted group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="block text-xs text-muted font-body mb-0.5">GitHub</span>
                <span className="text-sm text-secondary group-hover:text-white transition-colors duration-300 font-body">
                  github.com/mzain-there
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
