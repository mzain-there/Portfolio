const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const MailIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'];

export default function Footer() {
  const scrollTo = (index) => {
    const id = SECTION_IDS[index];
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#222222] bg-[#0a0a0a] py-16 px-6 md:px-12 lg:px-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        {/* Left Column */}
        <div>
          <span className="font-display text-3xl text-white tracking-wider block mb-2">MOHAMMAD ZAIN</span>
          <span className="text-sm text-muted font-body">Frontend Developer</span>
        </div>

        {/* Center Column */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link}
              onClick={() => scrollTo(idx)}
              className="text-xs text-muted hover:text-white transition-colors duration-300 font-body bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex gap-4">
          <a
            href="https://github.com/mzain-there"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/mzain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:mohammmadzain@gmail.com"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <MailIcon size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-6xl mx-auto text-center border-t border-[#151515] pt-8">
        <p className="text-xs text-[#444] font-body">
          © 2025 Mohammad Zain · Designed & built with passion from Rawalpindi
        </p>
      </div>
    </footer>
  );
}
