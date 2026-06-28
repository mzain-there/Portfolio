import { useEffect, useRef } from 'react';

export default function BatCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    // Create 18 bats
    const bats = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: 8 + Math.random() * 10,
      flapSpeed: 0.03 + Math.random() * 0.04,
      flapOffset: Math.random() * Math.PI * 2,
      time: 0,
    }));

    const drawBat = (bat) => {
      const { x, y, size, time, flapSpeed, flapOffset } = bat;
      const flap = Math.sin(time * flapSpeed * 60 + flapOffset) * 0.6;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();

      // Body ellipse
      ctx.ellipse(0, 0, size * 0.15, size * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left wing
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.1);
      ctx.bezierCurveTo(
        -size * 0.5, -size * (0.6 + flap * 0.3),
        -size * 1.0, -size * (0.3 + flap * 0.5),
        -size * 1.1, size * (0.1 - flap * 0.2)
      );
      ctx.bezierCurveTo(
        -size * 0.7, size * 0.05,
        -size * 0.3, size * 0.15,
        0, size * 0.1
      );
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.1);
      ctx.bezierCurveTo(
        size * 0.5, -size * (0.6 + flap * 0.3),
        size * 1.0, -size * (0.3 + flap * 0.5),
        size * 1.1, size * (0.1 - flap * 0.2)
      );
      ctx.bezierCurveTo(
        size * 0.7, size * 0.05,
        size * 0.3, size * 0.15,
        0, size * 0.1
      );
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      bats.forEach((bat) => {
        bat.time += 1 / 60;

        // Cursor repulsion
        const dx = bat.x - mouse.x;
        const dy = bat.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          bat.vx += (dx / dist) * force * 0.8;
          bat.vy += (dy / dist) * force * 0.8;
        }

        // Damping
        bat.vx *= 0.99;
        bat.vy *= 0.99;

        // Keep minimum speed
        const speed = Math.sqrt(bat.vx * bat.vx + bat.vy * bat.vy);
        if (speed < 0.3) {
          bat.vx += (Math.random() - 0.5) * 0.2;
          bat.vy += (Math.random() - 0.5) * 0.2;
        }

        bat.x += bat.vx;
        bat.y += bat.vy;

        // Wrap edges
        if (bat.x < -30) bat.x = canvas.width + 30;
        if (bat.x > canvas.width + 30) bat.x = -30;
        if (bat.y < -30) bat.y = canvas.height + 30;
        if (bat.y > canvas.height + 30) bat.y = -30;

        drawBat(bat);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
