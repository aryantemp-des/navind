import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const positionRef = useRef({ x: 0, y: 0 });
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || window.innerWidth < 768;
    if (isTouch) return;

    const updateRect = () => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        rectRef.current = {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
        };
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });

    const updatePosition = (clientX: number, clientY: number) => {
      if (containerRef && containerRef.current && rectRef.current) {
        const pageX = clientX + window.scrollX;
        const pageY = clientY + window.scrollY;
        const relativeX = pageX - rectRef.current.left;
        const relativeY = pageY - rectRef.current.top;
        positionRef.current = { x: relativeX, y: relativeY };
      } else {
        positionRef.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef]);

  return positionRef;
};

