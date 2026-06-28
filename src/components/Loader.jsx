import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const headingRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Bat SVG fade in
      tl.fromTo('.loader-bat', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });

      // Split heading text
      const split = new SplitType(headingRef.current, { types: 'chars' });
      tl.fromTo(
        split.chars,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.04, duration: 0.5, ease: 'power4.out' },
        '-=0.2'
      );

      // Subheading
      tl.fromTo('.loader-sub', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');

      // Progress bar + counter
      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => setPercent(Math.round(obj.val)),
      }, '-=0.5');

      tl.to('.loader-bar-fill', { width: '100%', duration: 2.8, ease: 'power2.inOut' }, '<');

      // Fade out loader
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.pointerEvents = 'none';
          onComplete?.();
        },
      }, '+=0.2');

      return () => split.revert();
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-bg flex flex-col items-center justify-center"
      style={{ zIndex: 10000 }}
    >
      {/* Bat SVG */}
      <svg className="loader-bat mb-8" width="60" height="40" viewBox="0 0 24 16" fill="#f5f5f5">
        <path d="M12 0C10 4 6 6 1 6c2 4 4 7 5 9-1.5 0-3.5 0.5-5 1.5 3 0 6-0.5 9-3.5 3 3 6 3.5 9 3.5-1.5-1-3.5-1.5-5-1.5 1-2 3-5 5-9C14 6 14 4 12 0z"/>
      </svg>

      {/* Heading */}
      <h1
        ref={headingRef}
        className="font-display text-5xl md:text-7xl text-white tracking-wider mb-4 overflow-hidden"
      >
        WELCOME TO GOTHAM
      </h1>

      {/* Subheading */}
      <p className="loader-sub font-mono text-sm text-muted opacity-0 mb-16">
        Initializing the cave...
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[280px]">
        <div className="w-full h-[2px] bg-border rounded overflow-hidden">
          <div className="loader-bar-fill h-full bg-white w-0" />
        </div>
        <p className="text-center text-xs text-muted mt-3 font-mono">{percent}%</p>
      </div>
    </div>
  );
}
