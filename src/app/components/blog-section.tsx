"use client";

import { motion } from "motion/react";
import { SecondaryButton } from "./primary-button";

const imgBlog1 = "/assets/blog-card-1.webp";
const imgBlog2 = "/assets/blog-card-2.webp";
const imgBlog3 = "/assets/blog-card-3.webp";

function Tag({ label }: { label: string }) {
  return (
    <div className="border border-[#232325] px-[8px] py-[4px]">
      <span className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[12px] tracking-[0.6px] uppercase leading-[1.5]">
        {label}
      </span>
    </div>
  );
}

function DateInfo({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex gap-[8px] items-center">
      <span className="font-['DM_Sans',sans-serif] font-medium text-[#9b9994] text-[14px] leading-[1.5]">
        {date}
      </span>
      <div className="w-[4px] h-[4px] bg-[#9b9994] rounded-full" />
      <span className="font-['DM_Sans',sans-serif] font-medium text-[#9b9994] text-[14px] leading-[1.5]">
        {readTime}
      </span>
    </div>
  );
}

export function BlogSection() {
  return (
    <section className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
        <div className="flex flex-col items-center gap-[48px]">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] text-center"
          >
            Latest from Gasless&apos; Blog
          </motion.h2>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row w-full"
          >
            {/* Large post — left column */}
            <div className="flex-1 bg-[#131314] border-y border-[#232325] p-[8px] flex flex-col group cursor-pointer overflow-clip">
              <div className="relative w-full h-[285px] overflow-hidden">
                <img
                  src={imgBlog1}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-[24px] pt-[8px] px-[8px] flex-1">
                <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25]">
                  AI Agents Go Cross-Chain: 0xGasless x VIA Labs Partnership
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <DateInfo date="24th Jan 2026" readTime="3 min read" />
                  <div className="flex gap-[12px]">
                    <Tag label="Announcement" />
                    <Tag label="Product" />
                  </div>
                </div>
              </div>
            </div>

            {/* Small posts — right column */}
            <div className="flex-1 flex flex-col self-stretch">
              {/* Small post 1 */}
              <div className="bg-[#131314] border-t border-l border-[#232325] p-[8px] flex flex-col gap-[8px] overflow-clip flex-1 group/card cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="w-[252px] px-[8px] flex flex-col justify-center shrink-0">
                    <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25] max-w-[236px]">
                      The $300M Web3 Crisis: How Wallet Drains Threaten Crypto
                    </h4>
                  </div>
                  <div className="relative h-[159px] flex-1 overflow-hidden flex-shrink-0">
                    <img
                      src={imgBlog2}
                      alt=""
                      className="w-full h-full object-cover group-hover/card:scale-[1.015] transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-[8px]">
                  <DateInfo date="21st Dec 2025" readTime="5 min read" />
                  <div className="flex gap-[12px]">
                    <Tag label="security" />
                    <Tag label="insight" />
                  </div>
                </div>
              </div>

              {/* Small post 2 */}
              <div className="bg-[#131314] border-t border-b border-l border-[#232325] p-[8px] pb-[8px] pt-[9px] flex flex-col gap-[8px] overflow-clip flex-1 group/card2 cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="w-[252px] px-[8px] flex flex-col justify-center shrink-0">
                    <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25] max-w-[236px]">
                      Build Gasless Swaps in Minutes with 0xGasless on Fantom
                    </h4>
                  </div>
                  <div className="relative h-[159px] flex-1 overflow-hidden flex-shrink-0">
                    <img
                      src={imgBlog3}
                      alt=""
                      className="w-full h-full object-cover group-hover/card2:scale-[1.015] transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-[8px]">
                  <DateInfo date="1st Feb 2026" readTime="3 min read" />
                  <div className="flex gap-[12px]">
                    <Tag label="tutorial" />
                    <Tag label="Product" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SecondaryButton>CHECK all BLOGs →</SecondaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
