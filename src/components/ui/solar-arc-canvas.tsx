import React, { useEffect, useRef } from "react";

/**
 * SolarArcCanvas
 * High-performance solar-limb / eclipse canvas animation.
 * Optimized with viewport-awareness and zero per-frame heap allocations.
 */
const SolarArcCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Viewport intersection observer to avoid running RAF when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animRef.current) {
          animRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    interface Streak {
      angle: number;
      len: number;
      width: number;
      alpha: number;
      speed: number;
      phase: number;
    }

    const isMobile = window.innerWidth < 768;
    const STREAK_COUNT = isMobile ? 38 : 95;

    const streaks: Streak[] = Array.from({ length: STREAK_COUNT }, () => ({
      angle: Math.random() * Math.PI * 0.55 + Math.PI * 0.05,
      len: 40 + Math.random() * (isMobile ? 140 : 220),
      width: 0.5 + Math.random() * 1.5,
      alpha: 0.18 + Math.random() * 0.52,
      speed: 0.00012 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    let lastDrawTime = 0;

    const draw = (t: number) => {
      if (!isVisibleRef.current || document.hidden) {
        animRef.current = 0;
        return;
      }

      if (isMobile && t - lastDrawTime < 24) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = t;

      const T = t * 0.001;
      const W = width || canvas.width;
      const H = height || canvas.height;

      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Deep space background
      const bg = ctx.createRadialGradient(W * 0.78, H * 0.82, 0, W * 0.78, H * 0.82, W * 1.1);
      bg.addColorStop(0, "rgba(60,10,0,0.98)");
      bg.addColorStop(0.18, "rgba(30,5,0,0.99)");
      bg.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 2. Planet body
      const arcCx = W * 0.82;
      const arcCy = H * 1.35;
      const arcR = Math.min(W, H) * 1.05;

      const planetGrad = ctx.createRadialGradient(arcCx, arcCy, arcR * 0.7, arcCx, arcCy, arcR);
      planetGrad.addColorStop(0, "rgba(8,2,0,1)");
      planetGrad.addColorStop(1, "rgba(0,0,0,1)");
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // 3. Glowing limb
      const limbPulse = 1 + 0.04 * Math.sin(T * 0.6);
      const limbR = arcR * limbPulse;

      const outerGlow = ctx.createRadialGradient(arcCx, arcCy, limbR * 0.96, arcCx, arcCy, limbR * 1.14);
      outerGlow.addColorStop(0, "rgba(255,90,0,0)");
      outerGlow.addColorStop(0.3, `rgba(255,120,10,${0.20 + 0.07 * Math.sin(T * 0.4)})`);
      outerGlow.addColorStop(0.7, `rgba(255,60,0,${0.10 + 0.04 * Math.sin(T * 0.5)})`);
      outerGlow.addColorStop(1, "rgba(255,30,0,0)");
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, limbR * 1.14, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      const limbInner = ctx.createRadialGradient(arcCx, arcCy, limbR * 0.982, arcCx, arcCy, limbR * 1.006);
      limbInner.addColorStop(0, "rgba(255,200,80,0)");
      limbInner.addColorStop(0.3, `rgba(255,225,110,${0.75 + 0.18 * Math.sin(T * 0.7)})`);
      limbInner.addColorStop(0.65, "rgba(255,140,30,0.55)");
      limbInner.addColorStop(1, "rgba(255,60,0,0)");
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, limbR * 1.006, 0, Math.PI * 2);
      ctx.fillStyle = limbInner;
      ctx.fill();

      // 4. Corona streaks (zero per-frame gradient allocations)
      ctx.save();
      ctx.lineCap = "round";
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        const ang = s.angle + T * s.speed;
        const px = arcCx + Math.cos(Math.PI + ang) * limbR;
        const py = arcCy + Math.sin(Math.PI + ang) * limbR;
        if (px > W + 60 || py > H + 60 || px < -60 || py < -60) continue;

        const nx = Math.cos(Math.PI + ang);
        const ny = Math.sin(Math.PI + ang);
        const pulse = 0.5 + 0.5 * Math.sin(T * 1.8 + s.phase);
        const alpha = s.alpha * pulse;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + nx * s.len, py + ny * s.len);
        ctx.strokeStyle = `rgba(255,160,50,${alpha * 0.8})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Atmospheric scatter
      const atmos = ctx.createLinearGradient(0, H * 0.3, W * 0.52, H);
      atmos.addColorStop(0, "rgba(0,0,0,0)");
      atmos.addColorStop(0.4, `rgba(200,50,0,${0.06 + 0.02 * Math.sin(T * 0.3)})`);
      atmos.addColorStop(0.75, `rgba(255,80,0,${0.11 + 0.03 * Math.sin(T * 0.5)})`);
      atmos.addColorStop(1, "rgba(255,120,10,0)");
      ctx.fillStyle = atmos;
      ctx.fillRect(0, 0, W, H);

      // 6. Top-left vignette
      const vig = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0.88)");
      vig.addColorStop(0.5, "rgba(0,0,0,0.42)");
      vig.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
};

export default SolarArcCanvas;
