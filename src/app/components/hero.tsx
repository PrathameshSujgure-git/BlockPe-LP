"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";
import { DevOverlayEditor } from "./dev-overlay-editor";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0b0d]">
      {/* Background image — contained like architecture section, with organic mask */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full max-w-[1200px] pointer-events-none overflow-hidden"
        style={{
          maskImage: "url('/assets/hero-mask.svg')",
          maskSize: "100% 100%",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url('/assets/hero-mask.svg')",
          WebkitMaskSize: "100% 100%",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {/*
          Cover wrapper — replaces object-cover with a shared coordinate system.
          Maintains image aspect ratio (1312/912) and always covers 120% of parent.
          Both image and overlay live inside, so they track together perfectly.
        */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[120%] min-h-[120%]"
          style={{ aspectRatio: "1312 / 912" }}
        >
          <img
            src="/assets/hero.png"
            alt=""
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-[rgba(10,11,13,0.3)]" />

          {/* Decorative overlay — positioned in image coordinates, tracks the sweater logo */}
          <DevOverlayEditor id="hero" mode="percent">
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 hidden lg:block"
              style={{ left: "57.4%", top: "calc(46% - 32px)", width: "15.8%", aspectRatio: "245 / 315" }}
            >
              <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
              <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
              <div className="absolute inset-0 border border-white" />
              <div className="absolute -left-[11px] -top-[11px] w-[22px] h-[22px] border border-white" />
              <div className="absolute -left-[11px] -bottom-[11px] w-[22px] h-[22px] border border-white" />
              <div className="absolute -right-[11px] -bottom-[11px] w-[22px] h-[22px] border border-white" />
              <div className="absolute -right-[11px] -top-[11px] w-[22px] h-[22px] border border-white" />
            </div>
          </DevOverlayEditor>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto h-full">
        {/* Floating text — right side */}
        <div
          className="absolute right-[8px] top-[200px] w-[274px] text-white leading-[1.5] hidden lg:block select-none"
          style={{ textShadow: "0px 2px 16px rgba(0,0,0,0.3)" }}
        >
          <p className="font-['DM_Sans',sans-serif] font-semibold text-[16px] mb-0">We&apos;re building x402 —</p>
          <p className="font-['DM_Sans',sans-serif] font-normal text-[16px]">an open protocol that lets machines pay machines.</p>
        </div>

        {/* Content */}
        <div className="absolute bottom-[64px] left-6 lg:left-[24px] max-w-[779px] flex flex-col gap-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['DM_Sans',sans-serif] font-medium text-[16px] md:text-[20px] text-white leading-[1.5]"
            style={{ textShadow: "0px 2px 16px rgba(0,0,0,0.3)" }}
          >
            Micropayments.<br />
            Per-request.<br />
            No intermediaries.
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
      </div>
    </section>
  );
}
