"use client";
import { useEffect, useRef } from "react";

const TILE_W = 84;
const FRAME = 7;
const FINGER_OFFSETS = Array.from({ length: 19 }, (_, i) => 7 + i * 4);

interface Particle {
  x: number;
  y: number;
  speed: number;
  dir: 1 | -1;
  alpha: number;
  trail: Array<{ x: number; y: number }>;
}

export default function SolarAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles: Particle[] = [];

    const getFingerXs = (): number[] => {
      const W = canvas.width;
      const xs: number[] = [];
      const cols = Math.ceil((W - FRAME * 2) / TILE_W) + 1;
      for (let c = 0; c < cols; c++) {
        for (const fo of FINGER_OFFSETS) {
          const x = FRAME + c * TILE_W + fo;
          if (x > FRAME && x < W - FRAME) xs.push(x);
        }
      }
      return xs;
    };

    const spawn = () => {
      const H = canvas.height;
      const centerY = H / 2;
      const xs = getFingerXs();
      if (!xs.length) return;

      const isTop = Math.random() > 0.5;
      const x = xs[Math.floor(Math.random() * xs.length)];
      const pad = 24;
      const y = isTop
        ? FRAME + pad + Math.random() * (centerY - FRAME - pad * 2)
        : centerY + pad + Math.random() * (H - centerY - FRAME - pad);

      particles.push({
        x, y,
        speed: 0.7 + Math.random() * 1.6,
        dir: isTop ? 1 : -1,
        alpha: 0,
        trail: [],
      });
    };

    let raf: number;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerY = canvas.height / 2;

      if (tick % 4 === 0 && particles.length < 55) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha = Math.min(1, p.alpha + 0.07);
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.pop();
        p.y += p.speed * p.dir;

        const done = p.dir === 1 ? p.y >= centerY : p.y <= centerY;
        if (done) {
          // Burst flash at junction bar
          const burst = ctx.createRadialGradient(p.x, centerY, 0, p.x, centerY, 16);
          burst.addColorStop(0, `rgba(210,240,255,${p.alpha * 0.75})`);
          burst.addColorStop(0.4, `rgba(100,190,255,${p.alpha * 0.35})`);
          burst.addColorStop(1, "rgba(40,110,240,0)");
          ctx.beginPath();
          ctx.arc(p.x, centerY, 16, 0, Math.PI * 2);
          ctx.fillStyle = burst;
          ctx.fill();
          particles.splice(i, 1);
          continue;
        }

        // Trail
        p.trail.forEach(({ x, y }, ti) => {
          const ta = p.alpha * (1 - ti / p.trail.length) * 0.5;
          const r = Math.max(0.1, 2 - ti * 0.15);
          const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
          g.addColorStop(0, `rgba(140,210,255,${ta})`);
          g.addColorStop(1, "rgba(50,120,255,0)");
          ctx.beginPath();
          ctx.arc(x, y, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });

        // Core dot
        const dot = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4);
        dot.addColorStop(0, `rgba(235,248,255,${p.alpha})`);
        dot.addColorStop(0.45, `rgba(110,195,255,${p.alpha * 0.8})`);
        dot.addColorStop(1, "rgba(40,110,240,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dot;
        ctx.fill();
      }

      tick++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", zIndex: 2,
        width: "100%", height: "100%",
      }}
    />
  );
}
