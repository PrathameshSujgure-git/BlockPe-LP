"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";


export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0b0d]">
      {/* Background image — edge-to-edge on mobile, contained on desktop */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full max-w-[390px] lg:max-w-[1200px] pointer-events-none overflow-hidden"
      >
        {/*
          Cover wrapper — replaces object-cover with a shared coordinate system.
          Maintains image aspect ratio (1312/912) and always covers 120% of parent.
          Both image and overlay live inside, so they track together perfectly.
        */}
        <div
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/assets/hero-mobile.webp"
            alt=""
            className="absolute top-0 left-0 w-full h-auto lg:hidden"
          />
          <img
            src="/assets/hero.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover hidden lg:block"
          />

          {/* Decorative overlay — positioned in image coordinates, tracks the sweater logo */}
          {/* <DevOverlayEditor id="hero" mode="percent">
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
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
          </DevOverlayEditor> */}
        </div>
      </div>

      <div className="relative max-w-[390px] lg:max-w-[1200px] mx-auto h-full">
        {/* Content */}
        <div className="absolute bottom-[64px] left-4 lg:left-[24px] max-w-[779px] flex flex-col gap-[16px] lg:gap-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['DM_Sans',sans-serif] font-medium text-[18px] lg:text-[20px] text-white leading-[1.5]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.16), 0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Micropayments.<br />
            Per-request.<br />
            No intermediaries.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-[32px] lg:gap-6"
          >
            <div className="shadow-[0px_4px_8px_0px_rgba(0,0,0,0.16)]">
              <h1
                className="font-['PP_Mori',sans-serif] font-semibold text-[52px] lg:text-[72px] text-[#f6f3ea] tracking-[-1.04px] lg:tracking-[-2.88px] leading-[1.1] max-w-[736px]"
                style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.4)" }}
              >
                Payment Infrastructure for AI Agents.
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <PrimaryButton>Get Started →</PrimaryButton>
              <SecondaryButton>DEVELOPER DOCS</SecondaryButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
