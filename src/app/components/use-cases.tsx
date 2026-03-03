"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Use Case Card Graphics
 *
 * Read top-to-bottom. Each value is ms after scroll into view.
 *
 *     0ms   [BAR] bars reveal bottom → top (clipPath)
 *   100ms   [NOTIF] badge slides in from left (spring)
 *   200ms   [GRAPH] dot 1 fades in, line begins continuous draw
 *   400ms   [NOTIF] rows drop down from top (250ms stagger, spring)
 *   750ms   [GRAPH] line reaches dot 2 → dot 2 fades in
 *  1300ms   [GRAPH] line reaches dot 3 → dot 3 fades in
 *  2200ms   [GRAPH] line reaches dot 4 → dot 4 fades in
 *           [GRAPH] fill gradually fades in during draw
 *     0ms   [GRAPH] "HUMAN INVOLVEMENT" label appears with dot 1
 *  1100ms   [GRAPH] "FULL AUTONOMY" label appears with dot 3
 *
 * AMBIENT (infinite, after 2800ms):
 *  2800ms   [BAR] bars breathe heights ±8% (staggered wave)
 *  2800ms   [NOTIF] green dot pulses scale 1 → 1.5 → 1
 *  2800ms   [NOTIF] new notifications drop from top every 3s
 *  2800ms   [GRAPH] last data point pulses opacity
 *  2800ms   [GRAPH] shimmer sweeps along line (3s)
 * ───────────────────────────────────────────────────────── */

// ── View margin for scroll trigger ──────────────────────
const VIEW_MARGIN = "-50px";

// ── Timing constants (ms from scroll into view) ─────────
const TIMING = {
  barReveal: 0,        // bar chart clip-path starts
  badgeSlide: 100,     // notification badge slides in
  graphStart: 200,     // graph line begins drawing
  notifRows: 400,      // notification rows drop in
  // graphLabels removed — labels now synced to individual dot appearances
  ambientStart: 2800,  // all ambient loops begin
} as const;

// ── Bar Chart element config ────────────────────────────
const BAR_CHART = {
  viewBox: "0 0 280 160",
  barWidth: 8.52091,

  bars: [
    { x: 15.8935, y: 64.1099, h: 23.6692 },
    { x: 35.7757, y: 69.7905, h: 24.616 },
    { x: 55.6578, y: 48.9614, h: 45.4449 },
    { x: 75.5399, y: 41.3872, h: 51.1255 },
    { x: 95.422, y: 46.1211, h: 31.2433 },
    { x: 116.251, y: 30.9727, h: 56.8061 },
    { x: 135.186, y: 50.855, h: 43.5513 },
    { x: 155.068, y: 62.2163, h: 51.1255 },
    { x: 174.951, y: 46.1211, h: 59.6464 },
    { x: 194.833, y: 4.46338, h: 83.3156 },
    { x: 214.715, y: 17.7183, h: 44.4981 },
    { x: 235.544, y: 24.3457, h: 39.7643 },
    { x: 254.479, y: 46.1211, h: 34.0836 },
  ] as const,

  gridLines: [
    { x: 19.939 },
    { x: 119.585 },
    { x: 239.172 },
  ] as const,
  gridY1: 11.5679,
  gridY2: 135.982,
  gridStroke: "#232325",
  gridStrokeWidth: 1.89354,

  dateLabels: [
    { text: "Nov 10", x: 20, y: 150 },
    { text: "Nov 11", x: 120, y: 150 },
    { text: "Today", x: 240, y: 150 },
  ] as const,

  /** Entrance reveal transition (clipPath — uses duration, not spring) */
  entranceReveal: { duration: 0.8, ease: "easeOut" as const },

  /** Entrance: clip-path reveal */
  entranceSpring: { type: "spring" as const, stiffness: 120, damping: 30 },

  /** Ambient breathing config */
  breathing: {
    low: 0.92,
    high: 1.08,
    baseDuration: 1.8,
    staggerOffset: 0.1,
    ease: "easeInOut" as const,
  },
} as const;

// ── Notification element config ─────────────────────────
const NOTIFICATION = {
  rows: [
    {
      title: "Payment received",
      time: "Today, 16:20",
      icon: "/assets/usecase-coins-icon.svg",
      iconBg: "rgba(255,255,255,0.05)",
    },
    {
      title: "Invoice reviewed",
      time: "Today, 11:11",
      icon: "/assets/usecase-invoice-icon.svg",
      iconBg: "rgba(255,255,255,0.05)",
    },
    {
      title: "Payment received",
      time: "Today, 16:20",
      icon: "/assets/usecase-coins-icon.svg",
      iconBg: "rgba(255,255,255,0.05)",
    },
  ] as const,

  /** Position-based opacity: first row full, rest faded */
  rowOpacity: [1, 0.7, 0.7] as const,

  /** Badge slide-in offset */
  badgeOffsetX: -10,

  /** Notification row entrance offset (negative = drops from above) */
  entranceOffsetY: -30,

  /** Fresh notification cycle offset (drops from above) */
  cycleOffsetY: -25,

  /** Start slightly smaller for push-notification feel */
  initialScale: 0.92,

  /** Land at full size */
  finalScale: 1,

  /** Stagger between rows during entrance (ms) */
  rowStagger: 250,

  /** Cycle interval for notification rotation (ms) */
  cycleInterval: 3000,

  /** Badge slide-in */
  badgeSpring: { type: "spring" as const, stiffness: 500, damping: 25 },

  /** Row entrance (spring bounce on landing) */
  rowSpring: { type: "spring" as const, stiffness: 400, damping: 22 },

  /** Fresh notification arrival (spring bounce) */
  cycleSpring: { type: "spring" as const, stiffness: 450, damping: 22 },

  /** Green dot pulse (ambient — duration-based) */
  greenDotPulse: {
    scaleKeyframes: [1, 1.5, 1] as number[],
    duration: 2,
    ease: "easeInOut" as const,
  },
} as const;

// ── Autonomy Graph element config ───────────────────────
const GRAPH = {
  dataPoints: [
    { outerLeft: 20, outerTop: 119.23, innerLeft: 23, innerTop: 122.23, outerBg: "#025e36", innerBg: "#025e36" },
    { outerLeft: 96, outerTop: 110.23, innerLeft: 99, innerTop: 113.23, outerBg: "#025e36", innerBg: "#025e36" },
    { outerLeft: 172, outerTop: 90.23, innerLeft: 175, innerTop: 93.23, outerBg: "#009154", innerBg: "#009154" },
    { outerLeft: 248, outerTop: 10.23, innerLeft: 251, innerTop: 13.23, outerBg: "#009154", innerBg: "#01d279" },
  ] as const,

  /** SVG line path (4 data points connected) */
  linePath: "M0.058 108.346 L76.058 99.345 L152.058 79.845 L228.058 0.345",
  lineViewBox: "0 0 228.42 108.842",

  /** Line gradient (from original SVG) */
  lineGradient: {
    x1: "221.592", y1: "0.345", x2: "83.058", y2: "96.181",
    stops: [
      { offset: "0%", color: "#00DD7F" },
      { offset: "100%", color: "#002B19" },
    ],
  },

  /** Fill gradient (from original SVG) */
  fillGradient: {
    x1: "225.034", y1: "0", x2: "86.5", y2: "95.836",
    stops: [
      { offset: "0%", color: "#00DD7F" },
      { offset: "100%", color: "#002B19" },
    ],
  },

  /** Fill SVG path (area under the line) */
  fillPath: "M79.5 99L3.5 108H0V145.336L235 146.274V0H231.5L155.5 79.5L79.5 99Z",
  fillViewBox: "0 0 235 146.274",

  /** Total duration for the continuous line draw (seconds) */
  drawDuration: 2.0,

  /** Easing for the line draw — easeInOut for organic feel */
  drawEase: [0.42, 0, 0.58, 1] as [number, number, number, number],

  /**
   * Dot appearance delays (ms after draw starts).
   * Calculated from segment lengths as proportion of total draw:
   *   Dot 1: 0% of 2s = 0ms (appears at start)
   *   Dot 2: 28.9% of 2s = 578ms → ~550ms
   *   Dot 3: 58.5% of 2s = 1170ms → ~1100ms
   *   Dot 4: 100% of 2s = 2000ms
   */
  dotDelays: [0, 550, 1100, 2000] as number[],

  /** Fill fades in gradually over the draw, reaching full at end */
  fillFadeDuration: 1.5,

  /** Shimmer sweep duration (s, ambient) */
  shimmerDuration: 3,

  /** Dot fade-in (simple opacity, no scale/spring to avoid jitter) */
  dotTransition: { duration: 0.25, ease: "easeOut" as const },

  /** Last dot pulse (ambient — duration-based) */
  lastDotPulse: {
    opacityKeyframes: [1, 0.4, 1] as number[],
    duration: 1.5,
    ease: "easeInOut" as const,
  },
} as const;

// ── Shared hook: stage progression ──────────────────────
/**
 * Returns a numeric stage that increments over time once the
 * element scrolls into view. Useful for sequencing entrance
 * animations before kicking off ambient loops.
 *
 * stage 0 = not yet in view
 * stage 1 = bar chart reveal, badge slide-in, graph line starts drawing
 * stage 2 = notification rows stagger in
 * stage 3 = all ambient loops begin
 */
function useAnimationStage(
  ref: React.RefObject<HTMLElement | null>,
  replayTrigger = 0,
) {
  const isInView = useInView(ref, { once: true, margin: VIEW_MARGIN });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStage(0);
      return;
    }

    setStage(0);
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStage(1), TIMING.barReveal));
    timers.push(setTimeout(() => setStage(2), TIMING.notifRows));
    timers.push(setTimeout(() => setStage(3), TIMING.ambientStart));

    return () => timers.forEach(clearTimeout);
  }, [isInView, replayTrigger]);

  return stage;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 1: BarChart (inline SVG with breathing bars)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function BarChart({ replayTrigger = 0 }: { replayTrigger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef, replayTrigger);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full flex items-center justify-center">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={stage >= 1 ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{
          duration: BAR_CHART.entranceReveal.duration,
          ease: BAR_CHART.entranceReveal.ease,
        }}
      >
        <svg
          viewBox={BAR_CHART.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[160px] w-auto"
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00DD7F" />
              <stop offset="100%" stopColor="#007744" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {BAR_CHART.gridLines.map((line) => (
            <line
              key={line.x}
              x1={line.x}
              y1={BAR_CHART.gridY1}
              x2={line.x}
              y2={BAR_CHART.gridY2}
              stroke={BAR_CHART.gridStroke}
              strokeWidth={BAR_CHART.gridStrokeWidth}
            />
          ))}

          {/* Bars with breathing animation */}
          {BAR_CHART.bars.map((bar, i) => {
            const breathingLow = bar.h * BAR_CHART.breathing.low;
            const breathingHigh = bar.h * BAR_CHART.breathing.high;
            // When bar grows, its y must decrease (bars grow upward from bottom)
            const yLow = bar.y - (breathingHigh - bar.h);
            const yHigh = bar.y + (bar.h - breathingLow);

            return (
              <motion.rect
                key={i}
                x={bar.x}
                width={BAR_CHART.barWidth}
                fill="url(#barGrad)"
                initial={{ y: bar.y, height: bar.h }}
                animate={
                  stage >= 3
                    ? {
                        height: [bar.h, breathingHigh, breathingLow, bar.h],
                        y: [bar.y, yLow, yHigh, bar.y],
                      }
                    : { y: bar.y, height: bar.h }
                }
                transition={
                  stage >= 3
                    ? {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: BAR_CHART.breathing.baseDuration + i * BAR_CHART.breathing.staggerOffset,
                        ease: BAR_CHART.breathing.ease,
                      }
                    : undefined
                }
              />
            );
          })}

          {/* Date labels */}
          {BAR_CHART.dateLabels.map((label) => (
            <text
              key={label.text}
              x={label.x}
              y={label.y}
              fill="#00DD7F"
              fontFamily="'DM Mono', monospace"
              fontSize="10"
              textAnchor="start"
            >
              {label.text}
            </text>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 2: NotificationPanel (pulsing green dot)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function NotificationPanel({ replayTrigger = 0 }: { replayTrigger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef, replayTrigger);

  // Cycle through notification sets to create "new notification arriving" effect
  const [cycleIndex, setCycleIndex] = useState(0);
  useEffect(() => {
    if (stage < 3) return;
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % NOTIFICATION.rows.length);
    }, NOTIFICATION.cycleInterval);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-[13px] items-start w-[234px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: NOTIFICATION.badgeOffsetX }}
          animate={stage >= 1 ? { opacity: 1, x: 0 } : undefined}
          transition={NOTIFICATION.badgeSpring}
          className="bg-[rgba(255,255,255,0.05)] border-[0.5px] border-[#353538] px-[6px] py-[2px] flex gap-2 items-center self-start"
        >
          <motion.div
            className="w-[5px] h-[5px] bg-[#00dd7f] rounded-full"
            animate={
              stage >= 3
                ? { scale: NOTIFICATION.greenDotPulse.scaleKeyframes }
                : undefined
            }
            transition={
              stage >= 3
                ? {
                    repeat: Infinity,
                    duration: NOTIFICATION.greenDotPulse.duration,
                    ease: NOTIFICATION.greenDotPulse.ease,
                  }
                : undefined
            }
          />
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[9px] leading-[1.5] uppercase">
            NEW NOTIFICATION
          </span>
        </motion.div>

        {/* Notifications — subtle slide when cycling */}
        <div className="flex flex-col gap-[12px] items-center w-full">
          {NOTIFICATION.rows.map((_, i) => {
            // Reorder: the cycled notification appears at the top with a fresh entrance
            const displayIndex = (i + cycleIndex) % NOTIFICATION.rows.length;
            const displayNotif = NOTIFICATION.rows[displayIndex];
            const isFresh = stage >= 3 && i === 0;

            return (
              <motion.div
                key={`${cycleIndex}-${i}`}
                initial={{
                  opacity: 0,
                  y: i === 0 && stage >= 3
                    ? NOTIFICATION.cycleOffsetY
                    : NOTIFICATION.entranceOffsetY,
                  scale: NOTIFICATION.initialScale,
                }}
                animate={
                  stage >= 2
                    ? { opacity: NOTIFICATION.rowOpacity[i], y: 0, scale: NOTIFICATION.finalScale }
                    : undefined
                }
                transition={
                  isFresh
                    ? NOTIFICATION.cycleSpring
                    : stage < 3
                      ? {
                          ...NOTIFICATION.rowSpring,
                          delay: (NOTIFICATION.rowStagger * i) / 1000,
                        }
                      : NOTIFICATION.rowSpring
                }
                className="bg-[rgba(255,255,255,0.1)] w-full flex gap-[8px] items-center p-[4px]"
              >
                <div
                  className="w-[24px] h-[24px] flex items-center justify-center p-[8px] box-content"
                  style={{ backgroundColor: displayNotif.iconBg }}
                >
                  <img src={displayNotif.icon} alt="" className="w-[24px] h-[24px]" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[12px] leading-[1.5]">
                    {displayNotif.title}
                  </span>
                  <span className="font-['DM_Sans',sans-serif] font-medium text-[rgba(246,243,234,0.6)] text-[10px] leading-[1.5]">
                    {displayNotif.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Fade overlay */}
      <div className="absolute -bottom-[50px] inset-x-0 h-[113px] bg-gradient-to-b from-[rgba(19,19,20,0)] to-[#131314] to-[58%] pointer-events-none" />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 3: AutonomyGraph (pulsing last data point)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AutonomyGraph({ replayTrigger = 0 }: { replayTrigger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef, replayTrigger);

  const lastIndex = GRAPH.dataPoints.length - 1;

  // Drawing state: line starts, then dots appear timed to the continuous draw
  const [drawing, setDrawing] = useState(false);
  const [visibleDots, setVisibleDots] = useState<boolean[]>(
    new Array(GRAPH.dataPoints.length).fill(false),
  );
  useEffect(() => {
    if (stage < 1) {
      setDrawing(false);
      setVisibleDots(new Array(GRAPH.dataPoints.length).fill(false));
      return;
    }

    // Start line drawing
    setDrawing(true);

    // Schedule each dot to appear when the line reaches it
    const timers: NodeJS.Timeout[] = [];
    GRAPH.dotDelays.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleDots((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, delay),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full flex items-center justify-center">
      <div className="relative w-[260px] h-[160px]">
      {/* Grid background */}
      <img
        src="/assets/usecase-grid-bg.svg"
        alt=""
        className="absolute left-[26px] top-1/2 -translate-y-1/2 w-[228px] h-[160px]"
      />

      {/* Graph fill — fades in gradually during the draw */}
      <svg
        viewBox={GRAPH.fillViewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[23px] top-[17.4px] w-[235px] h-[146.274px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="graphFillGrad"
            x1={GRAPH.fillGradient.x1}
            y1={GRAPH.fillGradient.y1}
            x2={GRAPH.fillGradient.x2}
            y2={GRAPH.fillGradient.y2}
            gradientUnits="userSpaceOnUse"
          >
            {GRAPH.fillGradient.stops.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <motion.path
          d={GRAPH.fillPath}
          fill="url(#graphFillGrad)"
          initial={{ opacity: 0 }}
          animate={drawing ? { opacity: 0.1 } : undefined}
          transition={{
            duration: GRAPH.fillFadeDuration,
            ease: "easeIn",
            delay: GRAPH.drawDuration * 0.3,
          }}
        />
      </svg>

      {/* Graph line — single continuous draw with strokeDashoffset */}
      <svg
        viewBox={GRAPH.lineViewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[26.5px] top-[17.4px] w-[228px] h-[108px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="graphLineGrad"
            x1={GRAPH.lineGradient.x1}
            y1={GRAPH.lineGradient.y1}
            x2={GRAPH.lineGradient.x2}
            y2={GRAPH.lineGradient.y2}
            gradientUnits="userSpaceOnUse"
          >
            {GRAPH.lineGradient.stops.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <motion.path
          d={GRAPH.linePath}
          stroke="url(#graphLineGrad)"
          strokeWidth={1}
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          animate={drawing ? { strokeDashoffset: 0 } : undefined}
          transition={{
            duration: GRAPH.drawDuration,
            ease: GRAPH.drawEase,
          }}
        />
      </svg>

      {/* Line shimmer overlay */}
      {stage >= 3 && (
        <motion.div
          className="absolute left-[23px] top-[17.4px] w-[235px] h-[146.274px] pointer-events-none"
          style={{
            maskImage: "url('/assets/usecase-graph-line.svg')",
            maskSize: "100% 100%",
            WebkitMaskImage: "url('/assets/usecase-graph-line.svg')",
            WebkitMaskSize: "100% 100%",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,255,147,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{
            repeat: Infinity,
            duration: GRAPH.shimmerDuration,
            ease: "linear",
          }}
        />
      )}

      {/* Data point markers — fade in at position as line flows through */}
      {GRAPH.dataPoints.map((point, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={visibleDots[i] ? { opacity: 1 } : undefined}
          transition={GRAPH.dotTransition}
        >
          {/* Outer square (20% opacity) */}
          <div
            className="absolute w-[13px] h-[13px] opacity-20"
            style={{
              left: `${point.outerLeft}px`,
              top: `${point.outerTop}px`,
              backgroundColor: point.outerBg,
            }}
          />
          {/* Inner square — last point gets ambient pulse */}
          {i === lastIndex ? (
            <motion.div
              className="absolute w-[7px] h-[7px]"
              style={{
                left: `${point.innerLeft}px`,
                top: `${point.innerTop}px`,
                backgroundColor: point.innerBg,
              }}
              animate={
                stage >= 3
                  ? { opacity: GRAPH.lastDotPulse.opacityKeyframes }
                  : undefined
              }
              transition={
                stage >= 3
                  ? {
                      repeat: Infinity,
                      duration: GRAPH.lastDotPulse.duration,
                      ease: GRAPH.lastDotPulse.ease,
                    }
                  : undefined
              }
            />
          ) : (
            <div
              className="absolute w-[7px] h-[7px]"
              style={{
                left: `${point.innerLeft}px`,
                top: `${point.innerTop}px`,
                backgroundColor: point.innerBg,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Labels — synced to dot appearances */}
      <motion.span
        className="absolute left-[14px] top-[136.9px] font-['DM_Mono',monospace] font-medium text-[#545459] text-[10px] uppercase"
        initial={{ opacity: 0 }}
        animate={visibleDots[0] ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        HUMAN INVOLVEMENT
      </motion.span>
      <motion.span
        className="absolute left-[140px] top-[110.23px] font-['DM_Mono',monospace] font-medium text-[#00dd7f] text-[10px] uppercase"
        initial={{ opacity: 0 }}
        animate={visibleDots[2] ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        FULL AUTONOMY
      </motion.span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Layout components (unchanged)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface UseCaseCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}

function UseCaseCard({ title, description, children, index }: UseCaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex-1 min-w-[280px] bg-[#131314] border border-[#232325] overflow-clip relative"
    >
      <div className="flex flex-col gap-[40px] pt-[24px] pb-[24px] px-[16px] lg:pb-[32px] lg:px-[32px]">
        {children}
        <div className="flex flex-col gap-[16px]">
          <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[28px] md:text-[32px] text-[#f6f3ea] tracking-[-0.56px] leading-[1.25]">
            {title}
          </h3>
          <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-[#9b9994] leading-[1.5]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function UseCases() {
  return (
    <section id="use-cases" className="py-[80px] lg:py-[120px]">
      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-[52px] flex flex-col items-center gap-[48px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-[16px] items-start text-left lg:items-center lg:text-center"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-0.8px] md:tracking-[-2.24px] leading-[1.25] lg:max-w-[483px]">
            Proven Use Cases in Production
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] lg:max-w-[398px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Powering real applications at scale through gasless production ready financial infrastructure
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[32px] w-full">
          <UseCaseCard
            title="AI Driven Trading Systems"
            description="Automated market analysis and autonomous trade execution"
            index={0}
          >
            <BarChart />
          </UseCaseCard>
          <UseCaseCard
            title="Financial Concierge AI"
            description="Smart payment management and personal finance automation"
            index={1}
          >
            <NotificationPanel />
          </UseCaseCard>
          <UseCaseCard
            title="Autonomous Onchain Agents"
            description="Self managed onchain entities handling assets and payments"
            index={2}
          >
            <AutonomyGraph />
          </UseCaseCard>
        </div>
      </div>
    </section>
  );
}
