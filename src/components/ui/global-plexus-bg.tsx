import React, { useEffect, useRef } from "react";

/**
 * GlobalPlexusBg
 * A fixed full-viewport Canvas that renders an orange/black animated plexus
 * network. Sits behind the entire site (z-index: 0).
 * Nodes use 3 parallax depth layers that shift as the user scrolls,
 * creating a genuine sense of depth throughout ALL sections.
 */
const GlobalPlexusBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize ─────────────────────────────────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Scroll ─────────────────────────────────────────────────────────── */
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Node type ──────────────────────────────────────────────────────── */
    interface Node {
      x: number; y: number;        // 0-1 normalised
      vx: number; vy: number;      // drift
      r: number;                   // base radius
      pulsePhase: number;
      pulseSpeed: number;
      brightness: number;
      layer: number;               // 0=back 1=mid 2=front
    }

    /* ── Spawn nodes ────────────────────────────────────────────────────── */
    const COUNT = 80;
    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00010,
      vy: (Math.random() - 0.5) * 0.00010,
      r: 1.8 + Math.random() * 3.2,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.6 + Math.random() * 1.2,
      brightness: 0.35 + Math.random() * 0.65,
      layer: Math.floor(Math.random() * 3),
    }));

    /* parallax multiplier per layer (how many px the layer shifts per px scrolled) */
    const PARALLAX = [0.04, 0.10, 0.18];
    const CONNECT  = 0.20; // normalised distance threshold

    let smoothY = window.scrollY;
    let lastVelocity = 0;

    /* ── Draw loop ──────────────────────────────────────────────────────── */
    const draw = (ts: number) => {
      const T  = ts * 0.001;
      const W  = canvas.width;
      const H  = canvas.height;
      const targetY = scrollRef.current;

      // Smooth liquid scroll interpolation (lerp)
      smoothY += (targetY - smoothY) * 0.12;
      const currentVelocity = window.__liquidVelocity || 0;
      lastVelocity += (currentVelocity - lastVelocity) * 0.1;

      /* Clear canvas */
      ctx.clearRect(0, 0, W, H);

      /* Move nodes with subtle liquid velocity drift */
      const velocityDrift = lastVelocity * 0.00015;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy + velocityDrift * (1 + n.layer * 0.5);
        if (n.x < 0) n.x = 1; if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1; if (n.y > 1) n.y = 0;
      }

      /* Helper: screen position with smooth liquid parallax offset */
      const pos = (n: Node) => ({
        px: n.x * W,
        py: (n.y * H - (smoothY * PARALLAX[n.layer])) % H + (smoothY * PARALLAX[n.layer] < 0 ? H : 0),
      });

      /* ── Connections ─────────────────────────────────────────────────── */
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const { px: ax, py: ay } = pos(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT) continue;

          const prox = 1 - dist / CONNECT;
          const alpha = prox * prox * ((a.brightness + b.brightness) * 0.5) * 0.7;
          const green = Math.round(30 + prox * 90);

          const { px: bx, py: by } = pos(b);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(255,${green},0,${alpha})`;
          ctx.lineWidth = 0.4 + prox * 0.9;
          ctx.stroke();
        }
      }

      /* ── Nodes ───────────────────────────────────────────────────────── */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const { px, py } = pos(n);
        const pulse = 0.5 + 0.5 * Math.sin(T * n.pulseSpeed + n.pulsePhase);
        const glowR = n.r + 5 * pulse;
        const al = n.brightness;

        /* Outer halo */
        ctx.beginPath();
        ctx.arc(px, py, glowR * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,90,0,${al * 0.18 * pulse})`;
        ctx.fill();

        /* Core */
        ctx.beginPath();
        ctx.arc(px, py, glowR * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,130,${al * 0.9})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
};

export default GlobalPlexusBg;
