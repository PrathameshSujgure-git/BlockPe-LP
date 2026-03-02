"use client";

import { motion } from "motion/react";
import { DevOverlayEditor } from "./dev-overlay-editor";

const imgCard1 = "/assets/d51a3aec84994cf52a84b4575512d98e6fc943e1.png";
const imgCard2 = "/assets/6e7eb94f0ba2b8ab9039490ce29e5e4f0941e726.png";
const imgCard3 = "/assets/54632494ce24f7bc1a80e5f9d0233523be60dc31.png";
import { imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E0154521, imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E154523, imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E154525 } from "../../imports/svg-9n1mo";

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M9.55 18L3.85 12.3L5.275 10.875L9.55 15.15L18.725 5.975L20.15 7.4L9.55 18Z" fill="#00DD7F" />
    </svg>
  );
}

function DecorativeCardOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="absolute inset-0 bg-white/5 border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] border border-white mix-blend-soft-light" />
      <div className="absolute inset-0 border border-white mix-blend-soft-light" />
      <div className="absolute -left-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -left-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -right-[8px] -bottom-[8px] w-[16px] h-[16px] border border-white" />
      <div className="absolute -right-[8px] -top-[8px] w-[16px] h-[16px] border border-white" />
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  items: string[];
  ctaText: string;
  image: string;
  maskImage: string;
  reversed?: boolean;
  index: number;
  textGap?: string;
  overlayClassName?: string;
  overlayId: string;
}

function FeatureCard({ title, items, ctaText, image, maskImage, reversed = false, index, textGap = "gap-[64px]", overlayClassName = "left-[187px] top-[180px] w-[125px] h-[137px]", overlayId }: FeatureCardProps) {
  const imageSection = (
    <div className="w-full lg:w-[461px] h-[300px] lg:h-[476px] relative flex-shrink-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url('${maskImage}')`,
          maskSize: "cover",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url('${maskImage}')`,
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(10,11,13,0.3)]" />
      </div>
      <DevOverlayEditor id={overlayId}><DecorativeCardOverlay className={overlayClassName} /></DevOverlayEditor>
    </div>
  );

  const textSection = (
    <div className={`flex flex-col ${textGap} px-[12px] pb-[12px] w-full lg:w-[430px]`}>
      <div className="flex flex-col gap-6">
        <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[28px] lg:text-[32px] text-[#f6f3ea] tracking-[-0.64px] leading-[1.25]">
          {title}
        </h3>
        <div className="flex flex-col gap-[12px]">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <CheckIcon />
              <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-[#9b9994] leading-[1.5]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <a href="#" className="w-full border border-[#232325] block group hover:border-[#00dd7f]/40 transition-colors">
        <div className="flex items-center justify-between pl-[20px] pr-[21px] py-[12px] text-[#f6f3ea]">
          <span className="font-['DM_Sans',sans-serif] font-medium text-[16px]">{ctaText}</span>
          <span className="font-['PP_Mori',sans-serif] font-semibold text-[14px] tracking-[0.42px] group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </a>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-[40px] items-center`}
    >
      {imageSection}
      {textSection}
    </motion.div>
  );
}

const features = [
  {
    title: "0xGasless x402 payment standard",
    items: [
      "Enable native payments directly within code and agents",
      "Turn APIs templates and workflows into monetizable assets",
      "Support automated transactions without user friction",
    ],
    ctaText: "Read about x402 in docs",
    image: imgCard1,
    maskImage: imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E0154521,
    reversed: false,
    textGap: "gap-[64px]",
    overlayId: "feature-0",
  },
  {
    title: "AI agents autonomously perform onchain interaction",
    items: [
      "Execute transfers swaps and contract calls programmatically",
      "Build autonomous workflows using a lightweight developer toolkit",
      "Give AI agents direct access to wallets and onchain actions",
    ],
    ctaText: "Read about AgentKit in docs",
    image: imgCard2,
    maskImage: imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E154523,
    reversed: true,
    textGap: "gap-[64px]",
    overlayClassName: "left-[130px] top-[204px] w-[220px] h-[190px]",
    overlayId: "feature-1",
  },
  {
    title: "ERC-4337 account abstraction",
    items: [
      "Enable smart contract wallets that validate transactions programmatically",
      "Remove gas payment friction for end users",
      "Support relayer and paymaster systems for frictionless user experiences",
    ],
    ctaText: "Read about ERC-4337 in docs",
    image: imgCard3,
    maskImage: imgMemeticdesignteamAManInSuitOpeningASafeKeptInAGard06Cea6Ad1A4B481AB6B27Abfe4E154525,
    reversed: false,
    textGap: "gap-[56px]",
    overlayClassName: "left-[155px] top-[129px] w-[210px] h-[152px]",
    overlayId: "feature-2",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="bg-[#0a0b0d] pt-[120px] pb-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 flex flex-col items-center gap-[104px]">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}
