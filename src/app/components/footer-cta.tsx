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
      {/* Spacer pushes main content so footer reveals underneath */}
      <div style={{ height: footerH }} />
      <footer ref={footerRef} className="fixed bottom-0 left-0 right-0 h-screen overflow-hidden">
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

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative flex flex-col items-center pt-[120px] pb-[24px] h-full">
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

        {/* Bottom: Wordmark + Footer bar — pushed to bottom */}
        <div className="mt-auto flex flex-col gap-[24px] items-start w-full">
          <div className="relative">
            {[
              { blur: 0, mask: "linear-gradient(to bottom, black, transparent 35%)" },
              { blur: 9, mask: "linear-gradient(to bottom, transparent 15%, black 35%, transparent 60%)" },
              { blur: 18, mask: "linear-gradient(to bottom, transparent 40%, black 60%, transparent 85%)" },
              { blur: 36, mask: "linear-gradient(to bottom, transparent 65%, black 85%)" },
            ].map(({ blur, mask }, i) => (
              <img
                key={i}
                src="/assets/blockpe-wordmark-blur.svg"
                alt=""
                className={`w-full h-auto ${i > 0 ? "absolute inset-0" : ""}`}
                style={{
                  opacity: 0.6,
                  mixBlendMode: "overlay",
                  filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  maskImage: mask,
                  WebkitMaskImage: mask,
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between w-full">
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
