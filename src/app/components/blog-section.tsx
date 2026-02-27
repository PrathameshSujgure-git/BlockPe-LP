"use client";

import { motion } from "motion/react";

const imgBlog1 = "/assets/1b42a0cdc604a3e38d7c9729ff8e5ee53b7fef0d.png";
const imgBlog2 = "/assets/ed4132455e7a5a43c002203e5aaa8d4a733789fb.png";
const imgBlog3 = "/assets/40fa6459246ae481d57ffe494cb585ac8f0f209d.png";

function PlayIcon({ size = 52 }: { size?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="mix-blend-overlay">
        <line x1="2" y1="2.5" x2={size} y2="2.5" stroke="white" strokeWidth="5" />
        <line x1={size} y1="2.5" x2={size} y2={size} stroke="white" strokeWidth="5" />
        <line x1={size} y1="2.5" x2="2" y2={size} stroke="white" strokeWidth="5" />
      </svg>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <div className="border border-[#232325] px-2 py-1">
      <span className="font-['DM_Mono',monospace] font-medium text-[#9b9994] text-[12px] tracking-[0.6px] uppercase leading-[1.5]">
        {label}
      </span>
    </div>
  );
}

function DateInfo({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-['DM_Sans',sans-serif] font-medium text-[#9b9994] text-[14px] leading-[1.5]">
        {date}
      </span>
      <div className="w-1 h-1 bg-[#9b9994] rounded-full" />
      <span className="font-['DM_Sans',sans-serif] font-medium text-[#9b9994] text-[14px] leading-[1.5]">
        {readTime}
      </span>
    </div>
  );
}

function DecorativeOverlay({ width, height }: { width: number; height: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 border border-white" />
      <div className="absolute -left-[4px] -top-[4px] w-[7px] h-[7px] border border-white" />
      <div className="absolute -left-[4px] -bottom-[4px] w-[7px] h-[7px] border border-white" />
      <div className="absolute -right-[4px] -bottom-[4px] w-[7px] h-[7px] border border-white" />
      <div className="absolute -right-[4px] -top-[4px] w-[7px] h-[7px] border border-white" />
    </div>
  );
}

export function BlogSection() {
  return (
    <section className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] mb-10"
        >
          Latest from Gasless' Blog
        </motion.h2>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row"
        >
          {/* Large post */}
          <div className="flex-1 bg-[#131314] border border-[#232325] p-2 flex flex-col group cursor-pointer">
            <div className="relative w-full h-[285px] overflow-hidden">
              <img
                src={imgBlog1}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <DecorativeOverlay width={109} height={90} />
              <PlayIcon size={52} />
            </div>
            <div className="flex flex-col gap-4 p-2 pt-4 flex-1">
              <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25]">
                AI Agents Go Cross-Chain: 0xGasless x VIA Labs Partnership
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 pb-2">
              <DateInfo date="24th Jan 2026" readTime="3 min read" />
              <div className="flex gap-3">
                <Tag label="Announcement" />
                <Tag label="Product" />
              </div>
            </div>
          </div>

          {/* Small posts column */}
          <div className="flex-1 flex flex-col">
            {/* Small post 1 */}
            <div className="bg-[#131314] border border-[#232325] lg:border-l-0 p-2 group cursor-pointer flex-1">
              <div className="flex gap-4 h-full">
                <div className="flex flex-col flex-1 px-2 justify-center">
                  <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25] max-w-[236px]">
                    The $300M Web3 Crisis: How Wallet Drains Threaten Crypto
                  </h4>
                </div>
                <div className="relative w-[160px] md:w-[280px] h-[159px] overflow-hidden flex-shrink-0">
                  <img
                    src={imgBlog2}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <DecorativeOverlay width={109} height={90} />
                  <PlayIcon size={40} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 mt-2">
                <DateInfo date="21st Dec 2025" readTime="5 min read" />
                <div className="flex gap-3">
                  <Tag label="security" />
                  <Tag label="insight" />
                </div>
              </div>
            </div>

            {/* Small post 2 */}
            <div className="bg-[#131314] border border-[#232325] lg:border-l-0 lg:border-t-0 p-2 group cursor-pointer flex-1">
              <div className="flex gap-4 h-full">
                <div className="flex flex-col flex-1 px-2 justify-center">
                  <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25] max-w-[236px]">
                    Build Gasless Swaps in Minutes with 0xGasless on Fantom
                  </h4>
                </div>
                <div className="relative w-[160px] md:w-[280px] h-[159px] overflow-hidden flex-shrink-0">
                  <img
                    src={imgBlog3}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <DecorativeOverlay width={63} height={52} />
                  <PlayIcon size={40} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 mt-2">
                <DateInfo date="1st Feb 2026" readTime="3 min read" />
                <div className="flex gap-3">
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
          className="mt-8 flex justify-center"
        >
          <a
            href="#"
            className="font-['DM_Sans',sans-serif] font-semibold text-[14px] text-[#f6f3ea] tracking-[0.42px] uppercase border border-[#f6f3ea] px-5 py-2 hover:bg-white/5 transition-colors"
          >
            CHECK all BLOGs →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
