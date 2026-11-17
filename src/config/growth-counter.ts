/**
 * DYNAMIC DAY COUNTER CONFIGURATION & ENGINE
 * Authority Timezone: Asia/Kolkata (India Standard Time = UTC + 5:30)
 *
 * Requirements:
 * - Base duration: 43 days
 * - Timezone: Asia/Kolkata
 * - Fixed anchor timestamp
 * - Increments by +1 after every completed 24-hour interval
 * - Independent of visitor device timezone
 * - Never exposes anchor date/time/clock in UI
 */

export interface DynamicGrowthConfig {
  baseDays: number;
  anchorTimestampIso: string; // ISO 8601 with Asia/Kolkata offset
  timezone: string;
  metricLabel: string;
  subheading: string;
}

export const DYNAMIC_GROWTH_CONFIG: DynamicGrowthConfig = {
  baseDays: 43,
  // Fixed campaign benchmark anchor in Asia/Kolkata (IST)
  anchorTimestampIso: "2026-11-14T00:00:00+05:30",
  timezone: "Asia/Kolkata",
  metricLabel: "Businesses Supported with Organic Growth in",
  subheading: "Organic Growth & Digital Presence Development",
};

/**
 * Calculates elapsed completed 24-hour periods from the fixed IST anchor.
 * Returns the base days (43) plus completed 24-hour intervals.
 */
export function calculateDynamicGrowthDays(nowMs: number = Date.now()): number {
  const anchorMs = Date.parse(DYNAMIC_GROWTH_CONFIG.anchorTimestampIso);
  if (isNaN(anchorMs)) {
    return DYNAMIC_GROWTH_CONFIG.baseDays;
  }

  // Elapsed time in milliseconds
  const elapsedMs = Math.max(0, nowMs - anchorMs);
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // Completed 24-hour intervals in IST
  const completed24hPeriods = Math.floor(elapsedMs / MS_PER_DAY);

  return DYNAMIC_GROWTH_CONFIG.baseDays + completed24hPeriods;
}

/**
 * Helper to compute when the next 24-hour interval in Asia/Kolkata will complete.
 * Used for setting a single lightweight timer rather than high-frequency polling.
 */
export function getMsUntilNextGrowthDay(nowMs: number = Date.now()): number {
  const anchorMs = Date.parse(DYNAMIC_GROWTH_CONFIG.anchorTimestampIso);
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const elapsedMs = Math.max(0, nowMs - anchorMs);
  const remainder = elapsedMs % MS_PER_DAY;
  return MS_PER_DAY - remainder;
}

