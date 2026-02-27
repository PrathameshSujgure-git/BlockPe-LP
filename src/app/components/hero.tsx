"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";

const imgHeroBg = "/assets/ddb9e99f85e2cf78148c350ed18dcb8d0acbdca5.png";
import { imgMemeticdesignteamFillItWithConsistentStyleAr8257V8Fd0Ed2A0Fcb4Eed9E4F25A2986662E132 } from "../../imports/svg-9n1mo";

function DecorativeCard() {
  return (
    <div className="absolute right-[40px] top-[140px] w-[245px] h-[315px] hidden lg:block">
      <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 border border-white" />
      <div className="absolute -left-[11px] -top-[11px] w-[22px] h-[22px] border border-white" />
      <div className="absolute -left-[11px] -bottom-[11px] w-[22px] h-[22px] border border-white" />
      <div className="absolute -right-[11px] -bottom-[11px] w-[22px] h-[22px] border border-white" />
      <div className="absolute -right-[11px] -top-[11px] w-[22px] h-[22px] border border-white" />

      <div
        className="absolute left-[280px] top-1/2 -translate-y-1/2 w-[274px] text-white leading-[1.5]"
        style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
      >
        <p className="font-['DM_Sans',sans-serif] font-semibold text-[16px] mb-0">We're building x402 —</p>
        <p className="font-['DM_Sans',sans-serif] font-normal text-[16px]">an open protocol that lets machines pay machines.</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden max-w-[1200px] mx-auto">
      {/* Background illustration with mask */}
      <div
        className="absolute w-[1295px] h-[863px]"
        style={{
          top: "-88px",
          left: "-15px",
          maskImage: `url('${imgMemeticdesignteamFillItWithConsistentStyleAr8257V8Fd0Ed2A0Fcb4Eed9E4F25A2986662E132}')`,
          maskSize: "1233px 839px",
          maskPosition: "7px 44px",
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url('${imgMemeticdesignteamFillItWithConsistentStyleAr8257V8Fd0Ed2A0Fcb4Eed9E4F25A2986662E132}')`,
          WebkitMaskSize: "1233px 839px",
          WebkitMaskPosition: "7px 44px",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img
          src={imgHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(10,11,13,0.3)]" />
      </div>

      {/* Decorative card */}
      <DecorativeCard />

      {/* Content */}
      <div className="absolute bottom-[64px] left-6 lg:left-[24px] max-w-[779px] flex flex-col gap-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-['DM_Sans',sans-serif] font-medium text-[16px] md:text-[20px] text-white leading-[1.5]"
          style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.16), 0px 4px 8px rgba(0,0,0,0.6)" }}
        >
          Micropayments. Per-request. No intermediaries.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="shadow-[0px_4px_8px_0px_rgba(0,0,0,0.16)]"
        >
          <h1
            className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] lg:text-[72px] text-[#f6f3ea] tracking-[-2.88px] leading-[1.1] max-w-[736px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.4)" }}
          >
            Payment Infrastructure for AI Agents.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <PrimaryButton>Get Started →</PrimaryButton>
          <SecondaryButton>DEVELOPER DOCS</SecondaryButton>
        </motion.div>
      </div>
    </section>
  );
}
