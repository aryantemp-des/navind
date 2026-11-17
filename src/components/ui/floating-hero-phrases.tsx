import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Comprehensive pool of high-intent business, web, AI, customer, and budget phrases
const HERO_PHRASES = [
  // Website & Digital Presence
  "Need a website?",
  "Website that converts?",
  "Business website?",
  "Need an online presence?",
  "Website redesign?",
  "Ecommerce website?",
  "Landing page?",
  "Online store?",
  "Better website experience?",

  // Business Growth
  "More customers?",
  "Organic traffic?",
  "Better Google rankings?",
  "Local business visibility?",
  "Generate more leads?",
  "Grow your business?",
  "More enquiries?",
  "Digital growth?",
  "Better conversions?",

  // AI & Automation
  "AI automation?",
  "Automate your workflow?",
  "AI business assistant?",
  "Smart business automation?",
  "AI-powered operations?",
  "Automate repetitive tasks?",
  "Intelligent AI agents?",
  "24/7 AI support?",
  "AI receptionist?",

  // Customer Communication
  "Missed calls?",
  "Missed enquiries?",
  "WhatsApp automation?",
  "Instant customer replies?",
  "Someone to answer calls?",
  "Follow up with customers?",
  "Automated lead follow-ups?",
  "Never miss a customer?",

  // Budget & Business Planning
  "Pocket-friendly budget?",
  "Affordable business solutions?",
  "Need a business plan?",
  "Smarter business planning?",
  "Automation-supported business?",
  "Scale without complexity?",

  // Original Retained Phrases
  "websites?",
  "business profile?",
  "Organic growth?",
  "pocket friendly budget?",
  "someone to reply on whatsapp?",
  "someone to pick call?",
  "ai receptionists?",
  "sales calling?",
] as const;

interface Zone {
  id: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

// 10 Desktop safe zones (percentages)
// Central heading on desktop is located at X: 25%-75%, Y: 40%-78%
// Safe zones have generous horizontal margins (18% - 82%) to prevent edge clipping
const DESKTOP_ZONES: Zone[] = [
  { id: 0, minX: 18, maxX: 26, minY: 13, maxY: 19 }, // Top Left High Sky
  { id: 1, minX: 18, maxX: 26, minY: 24, maxY: 31 }, // Top Left Mid Sky
  { id: 2, minX: 74, maxX: 82, minY: 13, maxY: 19 }, // Top Right High Sky
  { id: 3, minX: 74, maxX: 82, minY: 24, maxY: 31 }, // Top Right Mid Sky
  { id: 4, minX: 42, maxX: 58, minY: 10, maxY: 16 }, // Upper Center Sky (above NAVYA)
  { id: 5, minX: 18, maxX: 24, minY: 46, maxY: 54 }, // Flank Left (left of climber)
  { id: 6, minX: 76, maxX: 82, minY: 46, maxY: 54 }, // Flank Right (right of climber)
  { id: 7, minX: 20, maxX: 28, minY: 82, maxY: 87 }, // Bottom Left Valley
  { id: 8, minX: 72, maxX: 80, minY: 82, maxY: 87 }, // Bottom Right Valley
  { id: 9, minX: 42, maxX: 58, minY: 84, maxY: 89 }, // Bottom Center Valley
];

// 8 Tablet safe zones (600px - 1023px)
// Heading on tablet is located at X: 19%-81%, Y: 50%-70%
// Safe zones maintain ample horizontal buffers to ensure phrases stay 100% inside viewport
const TABLET_ZONES: Zone[] = [
  { id: 0, minX: 25, maxX: 32, minY: 12, maxY: 18 }, // Top Left Sky
  { id: 1, minX: 68, maxX: 75, minY: 12, maxY: 18 }, // Top Right Sky
  { id: 2, minX: 42, maxX: 58, minY: 10, maxY: 15 }, // Upper Center Sky
  { id: 3, minX: 25, maxX: 32, minY: 24, maxY: 30 }, // Mid Top Left Sky
  { id: 4, minX: 68, maxX: 75, minY: 24, maxY: 30 }, // Mid Top Right Sky
  { id: 5, minX: 42, maxX: 58, minY: 32, maxY: 37 }, // Pre-Heading Center Sky
  { id: 6, minX: 30, maxX: 40, minY: 80, maxY: 85 }, // Bottom Left-Center Valley
  { id: 7, minX: 60, maxX: 70, minY: 80, maxY: 85 }, // Bottom Right-Center Valley
];

// 6 Mobile safe zones (below 600px)
// Heading on mobile is located at X: 15%-85%, Y: 49%-71%
// On mobile, phrases are centered horizontally (46% - 54%) across distinct vertical tiers
// so that wide text never clips off-screen on smartphones
const MOBILE_ZONES: Zone[] = [
  { id: 0, minX: 46, maxX: 54, minY: 11, maxY: 16 }, // High Sky Center
  { id: 1, minX: 46, maxX: 54, minY: 20, maxY: 25 }, // Mid Sky Center
  { id: 2, minX: 46, maxX: 54, minY: 29, maxY: 34 }, // Pre-Heading Sky Center
  { id: 3, minX: 46, maxX: 54, minY: 79, maxY: 83 }, // Valley Top Center
  { id: 4, minX: 46, maxX: 54, minY: 84, maxY: 88 }, // Valley Mid Center
  { id: 5, minX: 46, maxX: 54, minY: 89, maxY: 93 }, // Valley Lower Center
];

interface ActivePhrase {
  slotId: number;
  instanceId: string;
  key: string;
  text: string;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  enterDuration: number;      // 0.48s - 0.68s entrance timing (450-700ms)
  visibilityDuration: number; // 2.0s - 8.0s per-phrase randomized duration
  exitDuration: number;       // 0.42s - 0.62s disappearance timing (400-650ms)
  totalDuration: number;
  appearedAt: number;         // Spawn timestamp
  expiresAt: number;          // Expiration timestamp
  zoneId: number;
  sizeScale: number;          // Subtle scale variation (0.97 - 1.03)
}

type DeviceTier = "mobile" | "tablet" | "desktop";

const getDeviceTier = (width: number): DeviceTier => {
  if (width < 600) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

// Target simultaneous active limits:
// Desktop (1024px+): 5 simultaneous phrases (within 4–6)
// Tablet (600px–1023px): 4 simultaneous phrases (within 3–4)
// Mobile (<600px): 3 simultaneous phrases (within 2–3)
const getSlotCount = (tier: DeviceTier): number => {
  switch (tier) {
    case "desktop":
      return 5;
    case "tablet":
      return 4;
    case "mobile":
      return 3;
  }
};

const getZonesForTier = (tier: DeviceTier): Zone[] => {
  switch (tier) {
    case "desktop":
      return DESKTOP_ZONES;
    case "tablet":
      return TABLET_ZONES;
    case "mobile":
      return MOBILE_ZONES;
  }
};

interface FloatingPhraseItemProps {
  phrase: ActivePhrase;
  onComplete: (slotId: number) => void;
  prefersReduced: boolean;
}

/**
 * Individual phrase component with independent lifecycle:
 * Stage 1: Pop-Up Entrance (opacity: 0 -> 1, scale: 0.72 -> sizeScale, gentle 16px upward lift over 480-680ms)
 * Stage 2: Gentle Floating (organic drift across unique 2.0s - 8.0s visibility duration)
 * Stage 3: Pop-Out Disappearance (opacity: 1 -> 0, scale: sizeScale -> 0.88 * sizeScale over 420-620ms)
 */
const FloatingPhraseItem = React.memo<FloatingPhraseItemProps>(
  ({ phrase, onComplete, prefersReduced }) => {
    const { enterDuration, visibilityDuration, exitDuration, totalDuration } = phrase;

    // Time checkpoints for keyframe transitions
    const tEnter = enterDuration / totalDuration;
    const tFloatEnd = (enterDuration + visibilityDuration) / totalDuration;

    const completedRef = useRef(false);
    const handleDone = useCallback(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete(phrase.slotId);
      }
    }, [phrase.slotId, onComplete]);

    // Independent safety timeout ensuring slot replenishes even if tab is inactive
    useEffect(() => {
      const timer = setTimeout(handleDone, (totalDuration + 0.3) * 1000);
      return () => clearTimeout(timer);
    }, [totalDuration, handleDone]);

    return (
      <motion.div
        key={phrase.key}
        initial={{
          opacity: 0,
          scale: prefersReduced ? 1 : 0.72,
          x: "-50%",
          y: prefersReduced ? "-50%" : "calc(-50% + 16px)",
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: prefersReduced
            ? [1, 1, 1, 1]
            : [0.72, phrase.sizeScale, phrase.sizeScale, phrase.sizeScale * 0.88],
          x: prefersReduced
            ? ["-50%", "-50%", "-50%", "-50%"]
            : [
                "-50%",
                "-50%",
                `calc(-50% + ${phrase.driftX}px)`,
                `calc(-50% + ${phrase.driftX}px)`,
              ],
          y: prefersReduced
            ? ["-50%", "-50%", "-50%", "-50%"]
            : [
                "calc(-50% + 16px)",
                "-50%",
                `calc(-50% + ${phrase.driftY}px)`,
                `calc(-50% + ${phrase.driftY - 8}px)`,
              ],
        }}
        transition={{
          duration: totalDuration,
          times: [0, tEnter, tFloatEnd, 1],
          ease: ["easeOut", "easeInOut", "easeIn"],
        }}
        onAnimationComplete={handleDone}
        className="absolute pointer-events-none select-none z-[2]"
        style={{
          left: `${phrase.x}%`,
          top: `${phrase.y}%`,
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}
      >
        <span
          className="inline-block font-heading font-bold text-white tracking-wide"
          style={{
            // High-visibility responsive typography:
            // Desktop (1440px): ~34px (~1cm visual height, 30-38px target)
            // Tablet (768px): ~25.4px (25-32px target)
            // Mobile (375px): ~21px (20-26px target)
            fontSize: "clamp(21px, 1.35vw + 15px, 34px)",
            lineHeight: 1.15,
            textShadow:
              "0 2px 14px rgba(0,0,0,0.95), 0 0 25px rgba(0,0,0,0.85), 0 0 45px rgba(239,68,68,0.30)",
            WebkitTextStroke: "0.3px rgba(255,255,255,0.45)",
            letterSpacing: "0.02em",
          }}
        >
          {phrase.text}
        </span>
      </motion.div>
    );
  }
);

FloatingPhraseItem.displayName = "FloatingPhraseItem";

export const FloatingHeroPhrases: React.FC = () => {
  const [deviceTier, setDeviceTier] = useState<DeviceTier>(() =>
    typeof window !== "undefined" ? getDeviceTier(window.innerWidth) : "desktop"
  );
  const [activePhrases, setActivePhrases] = useState<Record<number, ActivePhrase | null>>({});
  const activePhrasesRef = useRef<Record<number, ActivePhrase | null>>({});
  const deviceTierRef = useRef<DeviceTier>(deviceTier);
  const recentPhrasesRef = useRef<string[]>([]);
  const slotTimersRef = useRef<Record<number, NodeJS.Timeout>>({});
  const nextUniqueIdRef = useRef(0);
  const prefersReduced = useReducedMotion();

  // Keep refs synchronized with state for asynchronous slot handlers
  useEffect(() => {
    activePhrasesRef.current = activePhrases;
  }, [activePhrases]);

  useEffect(() => {
    deviceTierRef.current = deviceTier;
  }, [deviceTier]);

  // Responsive device tier detection
  useEffect(() => {
    const handleResize = () => {
      const tier = getDeviceTier(window.innerWidth);
      setDeviceTier((prev) => (prev !== tier ? tier : prev));
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slotCount = getSlotCount(deviceTier);

  const spawnPhraseForSlot = useCallback(
    (slotId: number) => {
      const currentTier = deviceTierRef.current;
      const zones = getZonesForTier(currentTier);
      const current = activePhrasesRef.current;

      // Identify currently occupied zones and phrases to prevent duplicates & collisions
      const occupiedZoneIds = new Set<number>();
      const currentTexts = new Set<string>();

      Object.entries(current).forEach(([sid, item]) => {
        if (Number(sid) !== slotId && item) {
          occupiedZoneIds.add(item.zoneId);
          currentTexts.add(item.text);
        }
      });

      // Filter available non-overlapping zones
      const availableZones = zones.filter((z) => !occupiedZoneIds.has(z.id));
      const chosenZone = availableZones.length > 0
        ? availableZones[Math.floor(Math.random() * availableZones.length)]
        : zones[slotId % zones.length];

      // Avoid repeating currently active phrases and the last 3 displayed phrases
      const recents = new Set(recentPhrasesRef.current);
      let candidates = HERO_PHRASES.filter(
        (p) => !currentTexts.has(p) && !recents.has(p)
      );

      // If pool exhausted after filtering recents, fallback to any phrase not currently displayed
      if (candidates.length === 0) {
        candidates = HERO_PHRASES.filter((p) => !currentTexts.has(p));
      }
      if (candidates.length === 0) {
        candidates = [...HERO_PHRASES];
      }

      const chosenText = candidates[Math.floor(Math.random() * candidates.length)];

      // Track recent history (keep last 3 phrases)
      recentPhrasesRef.current = [...recentPhrasesRef.current, chosenText].slice(-3);

      // Coordinate calculation within safe zone bounds
      const x = chosenZone.minX + Math.random() * (chosenZone.maxX - chosenZone.minX);
      const y = chosenZone.minY + Math.random() * (chosenZone.maxY - chosenZone.minY);

      // 1. Entrance animation timing: randomized between 0.48s and 0.68s (480ms - 680ms)
      const enterDuration = 0.48 + Math.random() * 0.20;

      // 2. Visibility duration: randomized between 2.0s and 8.0s per phrase
      const visibilityDuration = 2.0 + Math.random() * 6.0;

      // 3. Disappearance animation timing: randomized between 0.42s and 0.62s (420ms - 620ms)
      const exitDuration = 0.42 + Math.random() * 0.20;

      const totalDuration = enterDuration + visibilityDuration + exitDuration;
      const now = Date.now();
      const appearedAt = now;
      const expiresAt = now + Math.round((enterDuration + visibilityDuration) * 1000);

      // Random float drift direction (-12px to 12px)
      const driftX = (Math.random() * 24 - 12) * (prefersReduced ? 0.2 : 1);
      const driftY = (Math.random() * 20 - 10) * (prefersReduced ? 0.2 : 1);

      // Subtle scale variation (0.97 to 1.03)
      const sizeScale = 0.97 + Math.random() * 0.06;

      const instanceId = `phrase-${slotId}-${nextUniqueIdRef.current++}`;
      const newPhrase: ActivePhrase = {
        slotId,
        instanceId,
        key: instanceId,
        text: chosenText,
        x,
        y,
        driftX,
        driftY,
        enterDuration,
        visibilityDuration,
        exitDuration,
        totalDuration,
        appearedAt,
        expiresAt,
        zoneId: chosenZone.id,
        sizeScale,
      };

      // Update only the individual slot; other slots continue running uninterrupted
      setActivePhrases((prev) => ({
        ...prev,
        [slotId]: newPhrase,
      }));
    },
    [prefersReduced]
  );

  // Initialize slots with independent staggered delays
  useEffect(() => {
    // Prune excess slots if resizing down (e.g. desktop -> tablet -> mobile)
    setActivePhrases((prev) => {
      const updated: Record<number, ActivePhrase | null> = {};
      for (let i = 0; i < slotCount; i++) {
        if (prev[i]) updated[i] = prev[i];
      }
      return updated;
    });

    // Clear existing slot timers
    Object.values(slotTimersRef.current).forEach(clearTimeout);
    slotTimersRef.current = {};

    // Stagger initial entrances with random spawn intervals between 200ms and 1500ms
    for (let slot = 0; slot < slotCount; slot++) {
      const initialDelay = 150 + slot * (250 + Math.random() * 350);
      slotTimersRef.current[slot] = setTimeout(() => {
        spawnPhraseForSlot(slot);
      }, initialDelay);
    }

    return () => {
      Object.values(slotTimersRef.current).forEach(clearTimeout);
      slotTimersRef.current = {};
    };
  }, [slotCount, spawnPhraseForSlot]);

  // Handle individual slot completion and trigger independent replenishment
  const handlePhraseComplete = useCallback(
    (slotId: number) => {
      // Clear completed phrase from slot without affecting other slots
      setActivePhrases((prev) => ({
        ...prev,
        [slotId]: null,
      }));

      if (slotTimersRef.current[slotId]) {
        clearTimeout(slotTimersRef.current[slotId]);
      }

      // Independent appearance delay: randomized between 300ms and 1500ms
      const delay = 300 + Math.random() * 1200;
      slotTimersRef.current[slotId] = setTimeout(() => {
        spawnPhraseForSlot(slotId);
      }, delay);
    },
    [spawnPhraseForSlot]
  );

  return (
    <div
      className="floating-text-layer absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {Object.values(activePhrases).map((phrase) => {
          if (!phrase) return null;
          return (
            <FloatingPhraseItem
              key={phrase.key}
              phrase={phrase}
              onComplete={handlePhraseComplete}
              prefersReduced={Boolean(prefersReduced)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHeroPhrases;
