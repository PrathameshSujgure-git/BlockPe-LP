"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Use Case Card Graphics
 *
 * Card 1: Content Feed — content items with micropayment amounts
 * Card 2: API Log — terminal-style request log with costs
 * Card 3: Agent Cart — shopping flow with payment execution
 * ───────────────────────────────────────────────────────── */

// ── View margin for scroll trigger ──────────────────────
const VIEW_MARGIN = "-50px";

// ── Shared hook: stage progression ──────────────────────
function useAnimationStage(
  ref: React.RefObject<HTMLElement | null>,
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

    timers.push(setTimeout(() => setStage(1), 0));
    timers.push(setTimeout(() => setStage(2), 400));
    timers.push(setTimeout(() => setStage(3), 2800));

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return stage;
}

// ── Content feed data ───────────────────────────────────
const CONTENT_ITEMS = [
  { type: "Article", label: "Economic Times - Startup Funding Q3", amount: "₹0.50" },
  { type: "Video", label: "Product Demo - BlockPe SDK", amount: "₹2.00" },
  { type: "API", label: "News API - /v2/top-headlines", amount: "₹0.10" },
  { type: "Article", label: "Mint - RBI Digital Currency Update", amount: "₹0.50" },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 1: ContentFeed — content items with micro-payments
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ContentFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef);
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    if (stage < 3) return;
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % CONTENT_ITEMS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-[6px] w-[260px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={stage >= 1 ? { opacity: 1, x: 0 } : undefined}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="flex items-center gap-[6px] mb-[2px]"
        >
          <div className="w-[5px] h-[5px] bg-[#00dd7f] rounded-full" />
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[9px] uppercase">
            AGENT CONSUMING CONTENT
          </span>
        </motion.div>

        {/* Content rows */}
        {CONTENT_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={
              stage >= 2
                ? { opacity: i <= 2 ? 1 - i * 0.2 : 0.4, y: 0, scale: 1 }
                : undefined
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
              delay: (i * 200) / 1000,
            }}
            className="flex items-center gap-[8px] p-[6px] w-full"
            style={{
              backgroundColor:
                stage >= 3 && highlightIndex === i
                  ? "rgba(0,221,127,0.08)"
                  : "rgba(255,255,255,0.05)",
              borderLeft:
                stage >= 3 && highlightIndex === i
                  ? "2px solid #00dd7f"
                  : "2px solid transparent",
              transition: "background-color 0.4s, border-color 0.4s",
            }}
          >
            {/* Type badge */}
            <div className="bg-[rgba(255,255,255,0.08)] px-[5px] py-[1px] shrink-0">
              <span className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[8px] uppercase">
                {item.type}
              </span>
            </div>
            {/* Label */}
            <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[10px] leading-[1.4] truncate flex-1">
              {item.label}
            </span>
            {/* Amount */}
            <span className="font-['DM_Mono',monospace] font-medium text-[#00dd7f] text-[10px] shrink-0">
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Fade overlay */}
      <div className="absolute -bottom-[50px] inset-x-0 h-[113px] bg-gradient-to-b from-[rgba(19,19,20,0)] via-[rgba(19,19,20,0.6)] via-[30%] to-[#131314] to-[50%] pointer-events-none" />
    </div>
  );
}

// ── API log data ────────────────────────────────────────
const API_LOGS = [
  { method: "GET", endpoint: "/v1/inference", status: "200", cost: "₹0.01", time: "23ms" },
  { method: "POST", endpoint: "/v1/compute", status: "200", cost: "₹0.05", time: "142ms" },
  { method: "GET", endpoint: "/v1/search", status: "200", cost: "₹0.02", time: "67ms" },
  { method: "POST", endpoint: "/v1/generate", status: "200", cost: "₹0.08", time: "310ms" },
  { method: "GET", endpoint: "/v1/data", status: "200", cost: "₹0.01", time: "18ms" },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 2: APILog — terminal-style request log with costs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function APILog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef);
  const [logCount, setLogCount] = useState(0);

  // Continuously add new log lines in ambient mode
  useEffect(() => {
    if (stage < 3) return;
    const interval = setInterval(() => {
      setLogCount((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-[4px] w-[270px]">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={stage >= 1 ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-[6px] px-[8px] py-[4px] bg-[rgba(255,255,255,0.05)] border-b border-[#232325]"
        >
          <div className="flex gap-[4px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
            <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
            <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
          </div>
          <span className="font-['DM_Mono',monospace] font-medium text-[#545459] text-[8px] uppercase ml-[4px]">
            agent-payments.log
          </span>
        </motion.div>

        {/* Log entries */}
        <div className="flex flex-col gap-[2px] px-[4px]">
          {API_LOGS.map((log, i) => {
            const isNewAmbient = stage >= 3 && i === (logCount % API_LOGS.length);
            return (
              <motion.div
                key={`${logCount}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={
                  stage >= 2
                    ? { opacity: i <= 3 ? 1 - i * 0.15 : 0.4, x: 0 }
                    : undefined
                }
                transition={{
                  duration: 0.3,
                  delay: stage < 3 ? (i * 150) / 1000 : 0,
                }}
                className="flex items-center gap-[6px] py-[3px] px-[4px]"
                style={{
                  backgroundColor: isNewAmbient ? "rgba(0,221,127,0.06)" : "transparent",
                  transition: "background-color 0.3s",
                }}
              >
                {/* Method */}
                <span
                  className="font-['DM_Mono',monospace] font-medium text-[9px] w-[28px] shrink-0"
                  style={{ color: log.method === "POST" ? "#febc2e" : "#00dd7f" }}
                >
                  {log.method}
                </span>
                {/* Endpoint */}
                <span className="font-['DM_Mono',monospace] font-normal text-[#9b9994] text-[9px] flex-1 truncate">
                  {log.endpoint}
                </span>
                {/* Status */}
                <span className="font-['DM_Mono',monospace] font-normal text-[#545459] text-[8px] shrink-0">
                  {log.time}
                </span>
                {/* Cost */}
                <span className="font-['DM_Mono',monospace] font-medium text-[#00dd7f] text-[9px] shrink-0 w-[32px] text-right">
                  {log.cost}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Blinking cursor */}
        {stage >= 2 && (
          <motion.div
            className="flex items-center gap-[4px] px-[8px]"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 0.5, 1] }}
          >
            <span className="font-['DM_Mono',monospace] text-[#00dd7f] text-[10px]">▌</span>
          </motion.div>
        )}
      </div>
      {/* Fade overlay */}
      <div className="absolute -bottom-[50px] inset-x-0 h-[113px] bg-gradient-to-b from-[rgba(19,19,20,0)] via-[rgba(19,19,20,0.6)] via-[30%] to-[#131314] to-[50%] pointer-events-none" />
    </div>
  );
}

// ── Agent cart data ─────────────────────────────────────
const CART_ITEMS = [
  { name: "Cloud Compute - 2hr", price: "₹12.00", status: "paid" },
  { name: "API Access - Premium", price: "₹5.50", status: "paid" },
  { name: "Data Export - 500MB", price: "₹3.00", status: "pending" },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 3: AgentCart — shopping flow with payment execution
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AgentCart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useAnimationStage(containerRef);
  const [paidItems, setPaidItems] = useState(0);

  useEffect(() => {
    if (stage < 2) { setPaidItems(0); return; }
    const timers: NodeJS.Timeout[] = [];
    CART_ITEMS.forEach((_, i) => {
      timers.push(setTimeout(() => setPaidItems(i + 1), 600 + i * 800));
    });
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Loop payment animation in ambient mode
  useEffect(() => {
    if (stage < 3) return;
    const interval = setInterval(() => {
      setPaidItems(0);
      let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;
      t1 = setTimeout(() => setPaidItems(1), 400);
      t2 = setTimeout(() => setPaidItems(2), 1200);
      t3 = setTimeout(() => setPaidItems(3), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, 4000);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div ref={containerRef} className="h-[160px] relative w-full overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-[8px] w-[250px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={stage >= 1 ? { opacity: 1, x: 0 } : undefined}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-[6px]">
            <div className="w-[5px] h-[5px] bg-[#00dd7f] rounded-full" />
            <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[9px] uppercase">
              AGENT CHECKOUT
            </span>
          </div>
          <span className="font-['DM_Mono',monospace] font-medium text-[#545459] text-[8px]">
            {paidItems}/{CART_ITEMS.length} PAID
          </span>
        </motion.div>

        {/* Cart items */}
        {CART_ITEMS.map((item, i) => {
          const isPaid = i < paidItems;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={
                stage >= 2
                  ? { opacity: 1, y: 0, scale: 1 }
                  : undefined
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
                delay: (i * 200) / 1000,
              }}
              className="flex items-center gap-[8px] p-[8px] border"
              style={{
                backgroundColor: isPaid ? "rgba(0,221,127,0.06)" : "rgba(255,255,255,0.05)",
                borderColor: isPaid ? "rgba(0,221,127,0.2)" : "#232325",
                transition: "background-color 0.4s, border-color 0.4s",
              }}
            >
              {/* Status indicator */}
              <motion.div
                className="w-[14px] h-[14px] shrink-0 flex items-center justify-center"
                animate={isPaid ? { scale: [0.8, 1.1, 1] } : undefined}
                transition={{ duration: 0.3 }}
              >
                {isPaid ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="#00dd7f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div className="w-[8px] h-[8px] border border-[#545459] rounded-full" />
                )}
              </motion.div>
              {/* Item info */}
              <div className="flex-1 min-w-0">
                <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[11px] leading-[1.4] truncate block">
                  {item.name}
                </span>
              </div>
              {/* Price */}
              <span
                className="font-['DM_Mono',monospace] font-medium text-[10px] shrink-0"
                style={{ color: isPaid ? "#00dd7f" : "#9b9994" }}
              >
                {item.price}
              </span>
            </motion.div>
          );
        })}

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={stage >= 2 ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="flex items-center justify-between pt-[4px] border-t border-[#232325]"
        >
          <span className="font-['DM_Mono',monospace] font-medium text-[#545459] text-[9px] uppercase">
            Total
          </span>
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[11px]">
            ₹20.50
          </span>
        </motion.div>
      </div>
      {/* Fade overlay */}
      <div className="absolute -bottom-[50px] inset-x-0 h-[113px] bg-gradient-to-b from-[rgba(19,19,20,0)] via-[rgba(19,19,20,0.6)] via-[30%] to-[#131314] to-[50%] pointer-events-none" />
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
            Who BlockPe Is Built For
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] lg:max-w-[398px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Enabling autonomous payments across industries where AI agents interact with services, APIs, and platforms
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[32px] w-full">
          <UseCaseCard
            title="Content & Media Platforms"
            description="Agents pay per article, per video, per API call. Replacing subscriptions with instant micropayments"
            index={0}
          >
            <ContentFeed />
          </UseCaseCard>
          <UseCaseCard
            title="SaaS & API Businesses"
            description="Usage-based billing where agents pay per request, per inference, per compute cycle autonomously"
            index={1}
          >
            <APILog />
          </UseCaseCard>
          <UseCaseCard
            title="Ecommerce & Marketplaces"
            description="AI agents browse, compare, and purchase across platforms with autonomous payment execution"
            index={2}
          >
            <AgentCart />
          </UseCaseCard>
        </div>
      </div>
    </section>
  );
}
