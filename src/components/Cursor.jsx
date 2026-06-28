import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    // Lerp ring
    let raf;
    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(lerp);
    };
    lerp();

    // Hover detection
    const onOver = () => {
      if (ringRef.current) ringRef.current.style.width = ringRef.current.style.height = '64px';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onOut = () => {
      if (ringRef.current) ringRef.current.style.width = ringRef.current.style.height = '32px';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-magnetic]').forEach((el) => {
        el.addEventListener('mouseenter', onOver);
        el.addEventListener('mouseleave', onOut);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Bat-shaped dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 9999, mixBlendMode: 'difference' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C10 6 6 8 2 8c2 4 4 8 6 10-2 0-4 1-5 2 3 0 6-1 9-4 3 3 6 4 9 4-1-1-3-2-5-2 2-2 4-6 6-10-4 0-8-2-10-6z"/>
        </svg>
      </div>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-white/50"
        style={{
          width: 32,
          height: 32,
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </>
  );
}
