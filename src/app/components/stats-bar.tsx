"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import svgPaths from "../../imports/svg-o51ewolwat";

function CountUp({ target, suffix = "", prefix = "" }: { target: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));

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
    <div ref={ref} className="font-['PP_Mori',sans-serif] text-[#f6f3ea] tracking-[-0.96px] leading-[1.5] uppercase">
      <span className="text-[48px] md:text-[72px]">{prefix}{displayVal}</span>
      <span className="font-semibold text-[20px] md:text-[24px]">{suffix}</span>
    </div>
  );
}

function SonicLogo() {
  return (
    <div className="h-[86px] w-[220px] flex-shrink-0 relative flex items-center justify-center">
      <div className="absolute inset-[-0.5px] border border-[#313234] pointer-events-none" />
      <svg width="75" height="10" viewBox="0 0 45.298 9.93" fill="none">
        <path d={svgPaths.p277f0600} fill="#F5F5F5" />
        <path d={svgPaths.p22654d00} fill="#F5F5F5" />
        <path d={svgPaths.p122ac600} fill="#F5F5F5" />
        <path d={svgPaths.p3d1f500} fill="#F5F5F5" />
        <path d={svgPaths.p36e65000} fill="#F5F5F5" />
      </svg>
    </div>
  );
}

function AvalancheLogo() {
  return (
    <div className="h-[86px] w-[220px] flex-shrink-0 relative flex items-center justify-center">
      <div className="absolute inset-[-0.5px] border border-[#313234] pointer-events-none" />
      <svg width="133" height="24" viewBox="0 0 133 24" fill="none">
        <g clipPath="url(#clip_aval)">
          <path d={svgPaths.p13455a00} fill="#F5F5F5" />
          <path d={svgPaths.p1a99f900} fill="#F5F5F5" />
          <path d={svgPaths.p3425d300} fill="#F5F5F5" />
          <path d={svgPaths.pacdc700} fill="#F5F5F5" />
          <path d={svgPaths.p2822b470} fill="#F5F5F5" />
          <path d={svgPaths.p30482d00} fill="#F5F5F5" />
          <path d={svgPaths.p17b3e800} fill="#F5F5F5" />
          <path d={svgPaths.p1cd6ed00} fill="#F5F5F5" />
          <path d={svgPaths.p30686a80} fill="#F5F5F5" />
          <path d={svgPaths.p7c53c80} fill="#F5F5F5" />
          <path d={svgPaths.p3bc21000} fill="#F5F5F5" />
        </g>
        <defs>
          <clipPath id="clip_aval"><rect fill="white" height="24" width="133" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoSvgBrand() {
  return (
    <div className="h-[86px] w-[220px] flex-shrink-0 relative flex items-center justify-center">
      <div className="absolute inset-[-0.5px] border border-[#313234] pointer-events-none" />
      <svg width="157" height="24" viewBox="0 0 157 24" fill="none">
        <g clipPath="url(#clip_logo)">
          <path d={svgPaths.p19d50780} fill="#F5F5F5" />
        </g>
        <defs>
          <clipPath id="clip_logo"><rect fill="white" height="24" width="157" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BnbChainLogo() {
  return (
    <div className="h-[86px] w-[220px] flex-shrink-0 relative flex items-center justify-center">
      <div className="absolute inset-[-0.5px] border border-[#313234] pointer-events-none" />
      <svg width="137" height="24" viewBox="0 0 137 24" fill="none">
        <g clipPath="url(#clip_bnb)">
          <path d={svgPaths.p16c89100} fill="#F5F5F5" />
          <path d={svgPaths.p3ba85200} fill="#F5F5F5" />
          <path d={svgPaths.p2b931180} fill="#F5F5F5" />
          <path d={svgPaths.p2cab5880} fill="#F5F5F5" />
          <path d={svgPaths.p3b855900} fill="#F5F5F5" />
          <path d={svgPaths.p237dc800} fill="#F5F5F5" />
          <path d={svgPaths.p1b0d4680} fill="#F5F5F5" />
          <path d={svgPaths.p3fc03d00} fill="#F5F5F5" />
          <path d={svgPaths.p1be0b900} fill="#F5F5F5" />
        </g>
        <defs>
          <clipPath id="clip_bnb"><rect fill="white" height="24" width="137" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

const logos = [SonicLogo, AvalancheLogo, LogoSvgBrand, BnbChainLogo];

export function StatsBar() {
  return (
    <section className="w-full py-[112px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 flex flex-col lg:flex-row items-stretch">
        {/* Stats */}
        <div className="flex flex-col md:flex-row flex-1 w-full">
          <div className="flex-1 relative flex flex-col justify-center px-6 py-6 md:py-0">
            <div className="absolute inset-0 border-r border-[rgba(246,243,234,0.1)] pointer-events-none hidden md:block" />
            <CountUp target="99" suffix="%" />
            <div className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[14px] leading-[1.5] mt-4 uppercase">
              Agents Uptime
            </div>
          </div>
          <div className="flex-1 relative flex flex-col justify-center px-6 py-6 md:py-0">
            <div className="absolute inset-0 border-r border-[rgba(246,243,234,0.1)] pointer-events-none hidden md:block" />
            <CountUp target="3.5" suffix="m+" />
            <div className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[14px] leading-[1.5] mt-4 uppercase">
              Total value
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 py-6 md:py-0">
            <CountUp target="9" suffix="+" />
            <div className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[14px] leading-[1.5] tracking-[0.28px] mt-4 uppercase">
              Protocols integrated
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="flex-1 relative overflow-hidden mt-8 lg:mt-0">
          <div className="flex items-end justify-end mb-2">
            <div className="bg-[#3b3c3d] px-[6px] py-[2px] flex items-center">
              <span
                className="font-['DM_Mono',monospace] font-medium text-[#00dd7f] text-[12px] uppercase opacity-60 leading-[1.5]"
                style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
              >
                supported chains
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-[86px]">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...logos, ...logos].map((Logo, i) => (
                <Logo key={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
