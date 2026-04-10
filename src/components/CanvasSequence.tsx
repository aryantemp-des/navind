"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { FRAME_INDEX_SCROLL_END, FRAME_SEQUENCE_TOTAL } from "@/lib/heroScroll";

const TOTAL_FRAMES = FRAME_SEQUENCE_TOTAL;

const getFramePath = (index: number) => {
  if (index <= 240) {
    return `/images/a/a (${index}).jpg`;
  } else if (index <= 480) {
    return `/images/b/b (${index - 240}).jpg`;
  } else if (index <= 720) {
    return `/images/c/c (${index - 480}).jpg`;
  } else if (index <= 960) {
    return `/images/d/d (${index - 720}).jpg`;
  } else {
    return `/images/e/e (${Math.min(240, index - 960)}).jpg`;
  }
};

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const imagesMapRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // Add slight easing and subtle delay for natural transition feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001
  });

  // Map 0% to 90% scroll so pacing covers the shortened page cleanly
  const frameIndex = useTransform(smoothProgress, [0, FRAME_INDEX_SCROLL_END], [1, TOTAL_FRAMES]);

  // Removed the aggressive 1200-frame auto-preload to save mobile bandwidth.
  // Instead relies purely on the sliding window lazy-loader triggered on scroll.

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesMapRef.current.get(index);

    if (!img) {
      img = new Image();
      img.src = getFramePath(index);
      
      img.onload = () => {
        imagesMapRef.current.set(index, img!);
        if (Math.round(frameIndex.get()) === index) {
          drawCenteredImage(ctx, canvas, img!);
        }
      };
      imagesMapRef.current.set(index, img);
    } else if (img.complete) {
      drawCenteredImage(ctx, canvas, img);
    } else {
      // Image is already loading but not complete yet
      const previousOnLoad = img.onload;
      img.onload = (e) => {
        if (previousOnLoad) {
          previousOnLoad.call(img!, e as Event);
        }
        if (Math.round(frameIndex.get()) === index) {
          drawCenteredImage(ctx, canvas, img!);
        }
      };
    }

    // Sliding Window Preload Array - Loads 45 frames ahead and 15 frames behind
    const preloadAhead = 45;
    const preloadBehind = 15;

    for (let i = Math.max(1, index - preloadBehind); i <= Math.min(TOTAL_FRAMES, index + preloadAhead); i++) {
      if (!imagesMapRef.current.has(i)) {
          const nextImg = new Image();
          nextImg.src = getFramePath(i);
          nextImg.onload = () => {
            if (Math.round(frameIndex.get()) === i) {
              drawCenteredImage(ctx, canvas, nextImg);
            }
          };
          imagesMapRef.current.set(i, nextImg);
      }
    }

    // Memory Management / Garbage Collection
    // Deletes frames extremely far out of the rendering window to prevent mobile crashing
    requestAnimationFrame(() => {
        for (const [key, cachedImg] of Array.from(imagesMapRef.current.entries())) {
            if (key < index - 150 || key > index + 250) {
               // Remove src reference fully so garbage collector releases image buffer fast
               cachedImg.src = "";
               imagesMapRef.current.delete(key);
            }
        }
    });
  };

  const drawCenteredImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    // Fill background
    ctx.fillStyle = "#0A0A0F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.round(latest);
    if (frame >= 1 && frame <= TOTAL_FRAMES) {
      drawFrame(frame);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // High DPI canvas
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        const currentFrame = Math.max(1, Math.round(frameIndex.get()));
        drawFrame(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="frame-sequence-root"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}
    >
      <canvas
        ref={canvasRef}
        className="frame-sequence-canvas"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          opacity: 1
        }}
      />
    </div>
  );
}
