/**
 * Hero scroll / frame sequence — must stay in sync with CanvasSequence frameIndex mapping.
 */
export const FRAME_SEQUENCE_TOTAL = 1200;

/** Upper bound of scrollYProgress used for frame index (matches CanvasSequence). */
export const FRAME_INDEX_SCROLL_END = 0.9;

/**
 * Scroll progress where Math.round(frameIndex) first becomes 2
 * (frameIndex maps [0, FRAME_INDEX_SCROLL_END] → [1, FRAME_SEQUENCE_TOTAL]).
 */
export const SCROLL_AT_FIRST_FRAME_TRANSITION =
  FRAME_INDEX_SCROLL_END / (2 * (FRAME_SEQUENCE_TOTAL - 1));

/** Short smooth fade right after the first frame transition (robot + aurora + Scroll below). */
export const HERO_FADE_AFTER_FIRST_FRAME = 0.028;

/** Shared opacity for Spline robot, FloatingLines aurora layer, and Scroll below (hero exit together). */
export function heroSplineLayerOpacity(v: number): number {
  if (v < SCROLL_AT_FIRST_FRAME_TRANSITION) return 1;
  if (v >= SCROLL_AT_FIRST_FRAME_TRANSITION + HERO_FADE_AFTER_FIRST_FRAME) return 0;
  const t = (v - SCROLL_AT_FIRST_FRAME_TRANSITION) / HERO_FADE_AFTER_FIRST_FRAME;
  const u = t * t * (3 - 2 * t);
  return 1 - u;
}
