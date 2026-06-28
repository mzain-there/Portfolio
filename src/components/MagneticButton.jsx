import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className = '', onClick, href, as = 'button', ...props }) {
  const btnRef = useRef(null);

  const handleMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
  }, []);

  const Tag = href ? 'a' : as;

  return (
    <Tag
      ref={btnRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      href={href}
      data-magnetic
      {...props}
    >
      {children}
    </Tag>
  );
}
