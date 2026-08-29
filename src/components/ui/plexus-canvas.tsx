import React, { useEffect, useRef } from "react";

/**
 * PlexusCanvas
 * High-performance animated orange/red network of glowing nodes connected by geometric lines.
 * Scroll-reactive with cached layout metrics, batched draw calls, and mobile-aware density.
 */
const PlexusCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    sectionRef.current = canvas.closest("section");

    let width = 0;
    let height = 0;
    let sectionTop = 0;
    let sectionHeight = 1;

    const updateMetrics = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        sectionTop = rect.top + window.scrollY;
        sectionHeight = sectionRef.current.offsetHeight || height || 1;
      }
    };

    updateMetrics();
    const ro = new ResizeObserver(updateMetrics);
    ro.observe(canvas);

    // ── Scroll listener (passive) ───────────────────────────────────────────
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    scrollRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Intersection Observer to pause when off-screen ─────────────────────
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animRef.current) {
          animRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 }
    );
    if (sectionRef.current) {
      io.observe(sectionRef.current);
    } else {
      io.observe(canvas);
    }

    // ── Node definition ──────────────────────────────────────────────────────
    interface Node {
      x: number; y: number;        // base position (0-1 normalised)
      vx: number; vy: number;      // drift velocity
      r: number;                   // radius
      pulse: number;               // current glow size
      pulseSpeed: number;
      pulsePhase: number;
      brightness: number;          // 0-1 base brightness
      layer: number;               // 0=back, 1=mid, 2=front (parallax depth)
    }

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 28 : 50;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      r: 1.4 + Math.random() * 2.4,
      pulse: 0,
      pulseSpeed: 0.008 + Math.random() * 0.018,
      pulsePhase: Math.random() * Math.PI * 2,
      brightness: 0.4 + Math.random() * 0.6,
      layer: Math.floor(Math.random() * 3),
    }));

    const CONNECT_DIST = isMobile ? 0.24 : 0.20;
    const LAYER_PARALLAX = [0.06, 0.12, 0.20];

    // ── Draw ─────────────────────────────────────────────────────────────────
    const draw = (t: number) => {
      if (!isVisibleRef.current || document.hidden) {
        animRef.current = 0;
        return;
      }

      const W = width || canvas.width;
      const H = height || canvas.height;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const T = t * 0.001;
      const scrollProgress = (scrollRef.current - sectionTop) / sectionHeight;

      ctx.clearRect(0, 0, W, H);

      // ── Move nodes ────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = 1;
        if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1;
        if (n.y > 1) n.y = 0;
        n.pulse = Math.sin(T * n.pulseSpeed * 60 + n.pulsePhase) * 0.5 + 0.5;
      }

      // ── Helper: world position with scroll parallax ───────────────────────
      const worldPos = (n: Node) => {
        const px = n.x * W;
        const py = n.y * H - scrollProgress * H * LAYER_PARALLAX[n.layer];
        return { px, py };
      };

      // ── Batched Connections ───────────────────────────────────────────────
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 100, 0, 0.25)";
      ctx.lineWidth = 0.6;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const { px: ax, py: ay } = worldPos(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const { px: bx, py: by } = worldPos(b);
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
      }
      ctx.stroke();

      // ── Draw nodes ────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const { px, py } = worldPos(n);
        const glowR = n.r + 3.5 * n.pulse;
        const alpha = n.brightness;

        // Outer glow
        ctx.beginPath();
        ctx.arc(px, py, glowR * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,90,0,${alpha * 0.16 * n.pulse})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, glowR * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,120,${alpha * 0.9})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
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
        zIndex: 5,
        willChange: "transform",
      }}
    />
  );
};

export default PlexusCanvas;

