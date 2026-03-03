"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./primary-button";

export function FooterCTA() {
  const footerRef = useRef<HTMLElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setFooterH(entry.contentRect.height);
    });
    ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Spacer pushes main content so footer reveals underneath (desktop only) */}
      <div className="hidden lg:block" style={{ height: footerH }} />
      <footer ref={footerRef} className="relative max-w-[390px] lg:max-w-none mx-auto lg:mx-0 lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:h-screen overflow-hidden">
      {/* Construction lines */}
      <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
        <div className="absolute left-0 top-0 w-px h-full bg-[rgba(246,243,234,0.1)]" />
        <div className="absolute right-0 top-0 w-px h-full bg-[rgba(246,243,234,0.1)]" />
      </div>
      {/* Background landscape image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/mobile-footer-bg.webp"
          alt=""
          className="w-full absolute bottom-0 left-0 lg:hidden"
        />
        <img
          src="/assets/footer-bg.webp"
          alt=""
          className="w-full h-full object-cover hidden lg:block"
        />
      </div>

      <div className="relative flex flex-col h-full">
        {/* CTA Section */}
        <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-0 flex flex-col items-start lg:items-center pt-[24px] lg:pt-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start lg:items-center gap-[32px] w-[845px] max-w-full"
          >
            <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[48px] lg:text-[56px] text-[#f6f3ea] tracking-[-1.92px] lg:tracking-[-2.24px] leading-[1.1] text-left lg:text-center w-full">
              Build Financial Systems for Autonomous Intelligence
            </h2>
            <div className="flex gap-[16px]">
              <PrimaryButton>Get Started →</PrimaryButton>
              <SecondaryButton>DEVELOPER DOCS</SecondaryButton>
            </div>
          </motion.div>
        </div>

        {/* Mobile footer bottom */}
        <div className="flex lg:hidden items-end gap-[24px] px-[16px] pb-[24px] mt-[222px]">
          <div className="flex-1 flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
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
            <p className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] leading-[1.5]">
              &copy; 2026 BlockPe, All rights reserved.
            </p>
          </div>
        </div>

        {/* Logo wordmark + footer bar — both inside the same container for alignment (desktop only) */}
        <div className="hidden lg:flex mt-auto max-w-[1200px] w-full mx-auto pb-[24px] flex-col gap-[24px]">
          {/* BlockPe wordmark logo */}
          <img
            src="/assets/blockpe-wordmark.webp"
            alt=""
            className="w-full h-auto opacity-80 mix-blend-overlay translate-y-[32px]"
          />
          {/* Footer bar — same width as logo above */}
          <div className="flex items-center justify-between w-full px-[32px]">
            <p className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] leading-[1.5]">
              &copy; 2026 BlockPe, All rights reserved.
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
    </>
  );
}
