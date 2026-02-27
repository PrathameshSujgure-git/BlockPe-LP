"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const imgCommunity = "/assets/9206acdd69b7297ac5c787bfbff6a2e443577cda.png";
import { imgGeminiGeneratedImageG51V4Gg51V4Gg51V1 } from "../../imports/svg-9n1mo";

function AnimatedCountStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const numericTarget = parseFloat(numericPart);
  const prefix = value.startsWith(">") ? ">" : "";
  const suffix = value.replace(/^>?\d+\.?\d*/, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  const displayVal = numericTarget % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();

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

function DecorativeCardOverlay() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[197px] h-[208px]">
      <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 border border-white mix-blend-soft-light" />
      <div className="absolute -left-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -left-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -right-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -right-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
    </div>
  );
}

export function CommunityStats() {
  return (
    <section id="community" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 flex flex-col items-center gap-[84px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] max-w-[661px]">
            Community's Most Trusted Onchain Network
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] max-w-[372px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Degen scoreboard tracking best in class gasless systems and global agent activity
          </p>
        </motion.div>

        {/* Stats + Illustration */}
        <div className="relative w-full max-w-[1120px] h-[384px] hidden lg:block">
          {/* Center illustration */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[499px] h-[384px] z-0">
            <div
              className="absolute inset-0"
              style={{
                maskImage: `url('${imgGeminiGeneratedImageG51V4Gg51V4Gg51V1}')`,
                maskSize: "cover",
                maskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskImage: `url('${imgGeminiGeneratedImageG51V4Gg51V4Gg51V1}')`,
                WebkitMaskSize: "cover",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <img src={imgCommunity} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <DecorativeCardOverlay />
          </div>

          {/* Stats at exact Figma positions */}
          <div className="absolute left-[212px] top-[16px] z-10">
            <AnimatedCountStat value="100+" label="Agents deployed" delay={0} />
          </div>
          <div className="absolute left-[724px] top-[0px] z-10">
            <AnimatedCountStat value=">25k" label="Agent Interaction" delay={0.1} />
          </div>
          <div className="absolute left-[84px] top-[208px] z-10">
            <AnimatedCountStat value="3.5m+" label="Total value" delay={0.2} />
          </div>
          <div className="absolute left-[862px] top-[208px] z-10">
            <AnimatedCountStat value=">10k" label="transactions processed" delay={0.3} />
          </div>
        </div>

        {/* Mobile fallback: grid layout */}
        <div className="lg:hidden grid grid-cols-2 gap-8">
          <AnimatedCountStat value="100+" label="Agents deployed" delay={0} />
          <AnimatedCountStat value=">25k" label="Agent Interaction" delay={0.1} />
          <AnimatedCountStat value="3.5m+" label="Total value" delay={0.2} />
          <AnimatedCountStat value=">10k" label="transactions processed" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
