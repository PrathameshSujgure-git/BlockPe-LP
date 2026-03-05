"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

function useCountUp(target: number, isInView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return count;
}

function parseStatValue(value: string) {
  const numericPart = value.replace(/[^0-9.]/g, "");
  const numericTarget = parseFloat(numericPart);
  const prefix = value.startsWith(">") ? ">" : "";
  const suffix = value.replace(/^>?\d+\.?\d*/, "");
  return { numericTarget, prefix, suffix };
}

function formatCount(count: number, numericTarget: number) {
  return numericTarget % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();
}

function AnimatedCountStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { numericTarget, prefix, suffix } = parseStatValue(value);
  const count = useCountUp(numericTarget, isInView);
  const displayVal = formatCount(count, numericTarget);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-4 items-center text-center"
    >
      <div
        className="font-['PP_Mori',sans-serif] font-semibold text-[48px] md:text-[72px] text-[#f6f3ea] tracking-[-2.88px] leading-[1.1]"
        style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.4)" }}
      >
        {prefix}{displayVal}{suffix}
      </div>
      <div className="font-['DM_Mono',monospace] font-medium text-[14px] text-[#9b9994] tracking-[0.28px] uppercase leading-[1.5]">
        {label}
      </div>
    </motion.div>
  );
}

function MobileCountStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { numericTarget, prefix, suffix } = parseStatValue(value);
  const count = useCountUp(numericTarget, isInView);
  const displayVal = formatCount(count, numericTarget);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex-1 flex flex-col gap-[16px] items-start px-[16px] py-[12px]"
    >
      <div
        className="font-['PP_Mori',sans-serif] font-semibold text-[48px] text-[#f6f3ea] tracking-[-0.96px] leading-[1.25]"
        style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.4)" }}
      >
        {prefix}{displayVal}{suffix}
      </div>
      <div className="font-['DM_Mono',monospace] font-medium text-[14px] text-[#9b9994] tracking-[0.28px] uppercase leading-[1.5]">
        {label}
      </div>
    </motion.div>
  );
}


export function CommunityStats() {
  return (
    <section id="infrastructure" className="py-[120px]">
      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-[12px] lg:px-0 flex flex-col items-center gap-[84px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-[16px] items-center text-center"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] lg:text-[56px] text-[#f6f3ea] tracking-[-0.8px] lg:tracking-[-2.24px] leading-[1.25] max-w-[366px] lg:max-w-[661px]">
            Proven Infrastructure Foundation
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] max-w-[372px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Built and battle-tested under 0xGasless. Processing real transactions at global scale for over 12 months
          </p>
        </motion.div>

        {/* Desktop: Stats + Illustration */}
        <div className="relative w-full max-w-[1120px] h-[384px] hidden lg:block">
          {/* Center illustration */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[499px] h-[384px] z-0">
            <img src="/assets/community.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>

          {/* Stats at exact Figma positions */}
          <div className="absolute left-[212px] top-[16px] z-10">
            <AnimatedCountStat value="100+" label="Agents Deployed" delay={0} />
          </div>
          <div className="absolute left-[724px] top-[0px] z-10">
            <AnimatedCountStat value=">25k" label="Agent Interactions" delay={0.1} />
          </div>
          <div className="absolute left-[84px] top-[208px] z-10">
            <AnimatedCountStat value="3.5m+" label="Value Processed" delay={0.2} />
          </div>
          <div className="absolute left-[862px] top-[208px] z-10">
            <AnimatedCountStat value=">10k" label="Transactions Settled" delay={0.3} />
          </div>
        </div>

        {/* Mobile: Image + Stats */}
        <div className="lg:hidden flex flex-col gap-[80px] items-center w-full">
          {/* Mobile community image */}
          <div className="relative w-full h-[300px]">
            <img src="/assets/community.webp" alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>

          {/* Mobile stats - 2 rows, left-aligned per Figma */}
          <div className="flex flex-col w-full">
            {/* Row 1 */}
            <div className="flex w-full">
              <MobileCountStat value="100+" label="Agents Deployed" delay={0} />
              <MobileCountStat value=">25k" label="Agent Interactions" delay={0.1} />
            </div>
            {/* Row 2 */}
            <div className="flex w-full">
              <MobileCountStat value="3.5m+" label="Value Processed" delay={0.2} />
              <MobileCountStat value=">10k" label="Transactions Settled" delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
