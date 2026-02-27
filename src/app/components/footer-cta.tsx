"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";

function BlockPeWordmark() {
  return (
    <div className="w-[1202px] h-[241px]">
      <img
        src="/assets/blockpe-wordmark.svg"
        alt=""
        className="w-full h-full"
      />
    </div>
  );
}

export function FooterCTA() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background: masked grassland image */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            maskImage: "url('/assets/footer-mask.svg')",
            maskSize: "cover",
            maskPosition: "center bottom",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('/assets/footer-mask.svg')",
            WebkitMaskSize: "cover",
            WebkitMaskPosition: "center bottom",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img
            src="/assets/footer-grassland.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient overlay: top — fades sky into dark */}
        <div
          className="absolute inset-x-0 top-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to bottom, #0a0b0d 0%, rgba(10,11,13,0.8) 40%, transparent 100%)",
          }}
        />

        {/* Gradient overlay: bottom — fades grass into dark */}
        <div
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background:
              "linear-gradient(to top, #0a0b0d 0%, rgba(10,11,13,0.7) 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative flex flex-col items-center gap-[240px] pt-[120px] pb-[24px]">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-[32px] w-[845px] max-w-full"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.1] text-center w-full">
            Build Financial Systems for Autonomous Intelligence
          </h2>
          <div className="flex gap-[16px]">
            <PrimaryButton>Get Started →</PrimaryButton>
            <SecondaryButton>DEVELOPER DOCS</SecondaryButton>
          </div>
        </motion.div>

        {/* Bottom: Wordmark + Footer bar */}
        <div className="flex flex-col gap-[24px] items-start w-full">
          <BlockPeWordmark />
          <div className="flex items-center justify-between w-full">
            <p className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] leading-[1.5]">
              &copy; 2026 0xGasless, All rights reserved.
            </p>
            <div className="flex gap-[24px] items-center">
              <a
                href="#"
                className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] hover:text-[#f6f3ea] transition-colors leading-[1.5]"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] hover:text-[#f6f3ea] transition-colors leading-[1.5]"
              >
                Terms of service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
