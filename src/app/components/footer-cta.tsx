"use client";

import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";
import { imgMemeticdesignteamHttpssMjRunHgaw9HqGnWcFillItWithConsistF8Ff68916Db04D4BB007A28B1F862Dbe1 } from "../../imports/svg-9n1mo";

const imgFooterBg = "/assets/84469e5bf07ab0bf330d81373f7ec0d9daa93b0c.png";
import svgPaths from "../../imports/svg-o51ewolwat";

function GaslessWordmark() {
  return (
    <div className="w-full max-w-[1200px] h-[100px] md:h-[161px] opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1208 177" fill="none" preserveAspectRatio="xMidYMid meet">
        <path d={svgPaths.p37aa180} fill="#F5F5F5" />
        <path d={svgPaths.p21473c30} fill="#F5F5F5" />
        <path d={svgPaths.p38b84300} fill="#F5F5F5" />
        <path d={svgPaths.p1fdcdc00} fill="#F5F5F5" />
        <path d={svgPaths.p61f7680} fill="#F5F5F5" />
        <path d={svgPaths.p229b6700} fill="#F5F5F5" />
        <path d={svgPaths.p2a167380} fill="#F5F5F5" />
        <path d={svgPaths.p50fc500} fill="#F5F5F5" />
      </svg>
    </div>
  );
}

export function FooterCTA() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            maskImage: `url('${imgMemeticdesignteamHttpssMjRunHgaw9HqGnWcFillItWithConsistF8Ff68916Db04D4BB007A28B1F862Dbe1}')`,
            maskSize: "cover",
            maskPosition: "center bottom",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgMemeticdesignteamHttpssMjRunHgaw9HqGnWcFillItWithConsistF8Ff68916Db04D4BB007A28B1F862Dbe1}')`,
            WebkitMaskSize: "cover",
            WebkitMaskPosition: "center bottom",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img src={imgFooterBg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10 pt-[120px] pb-8">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 text-center mb-[120px]"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] max-w-[845px]">
            Build Financial Systems for Autonomous Intelligence
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <PrimaryButton>Get Started →</PrimaryButton>
            <SecondaryButton>DEVELOPER DOCS</SecondaryButton>
          </div>
        </motion.div>

        {/* Wordmark */}
        <div className="flex justify-center mb-12">
          <GaslessWordmark />
        </div>

        {/* Copyright & links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(246,243,234,0.1)]">
          <p className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#9b9994] leading-[1.5]">
            &copy; 2026 0xGasless, All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#9b9994] hover:text-[#f6f3ea] transition-colors leading-[1.5]"
            >
              Privacy policy
            </a>
            <a
              href="#"
              className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-[#9b9994] hover:text-[#f6f3ea] transition-colors leading-[1.5]"
            >
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
