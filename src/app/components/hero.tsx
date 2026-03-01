"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";

const imgHeroBg = "/assets/hero.webp";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={imgHeroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

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
