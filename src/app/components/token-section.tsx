"use client";

import { motion } from "motion/react";
import { PrimaryButton } from "./primary-button";

export function TokenSection() {
  return (
    <section id="0xgas" className="py-[120px]">
      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-[64px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[450px] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img src="/assets/token-bg.webp" alt="" className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 top-[23px] flex flex-col items-center z-10">
            <div className="flex flex-col gap-[16px] items-center text-center px-4">
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

            <div className="mt-[48px]">
              <PrimaryButton>Check $0xgas</PrimaryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
