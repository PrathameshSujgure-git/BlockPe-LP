"use client";

import { motion } from "motion/react";
import { PrimaryButton } from "./primary-button";

const imgGrasslands = "/assets/139d0d84268f4df0b72fd6da1d543c2beeb44ad3.png";

export function TokenSection() {
  return (
    <section id="0xgas" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[64px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[450px] overflow-hidden border border-[rgba(255,255,255,0.2)]"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img src={imgGrasslands} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[rgba(10,11,13,0.3)]" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
            <div className="flex flex-col gap-4 items-center text-center px-6">
              <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25]">
                0xGasless Token
              </h2>
              <p
                className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-white leading-[1.5]"
                style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
              >
                $0xGAS Token: Fueling Autonomous Onchain Infrastructure
              </p>
            </div>

            <PrimaryButton>Check $0xgas</PrimaryButton>
          </div>

          {/* Decorative card overlay */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[251px] h-[208px] mt-[10px] pointer-events-none">
            <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
            <div className="absolute inset-0 border border-white" />
            <div className="absolute -left-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
            <div className="absolute -left-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
            <div className="absolute -right-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
            <div className="absolute -right-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
