"use client";

import { motion } from "motion/react";

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M9.55 18L3.85 12.3L5.275 10.875L9.55 15.15L18.725 5.975L20.15 7.4L9.55 18Z" fill="#00DD7F" />
    </svg>
  );
}

interface FeatureCardProps {
  title: string;
  items: string[];
  ctaText: string;
  image: string;
  reversed?: boolean;
  index: number;
  textGap?: string;
}

function FeatureCard({ title, items, ctaText, image, reversed = false, index, textGap = "gap-[64px]" }: FeatureCardProps) {
  const imageSection = (
    <div className="w-[calc(100%+32px)] -mx-4 lg:mx-0 lg:w-[461px] h-[300px] lg:h-[476px] relative flex-shrink-0">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-contain" />
    </div>
  );

  const textSection = (
    <div className={`flex flex-col ${textGap} lg:px-[12px] pb-[12px] w-full lg:w-[430px]`}>
      <div className="flex flex-col gap-6">
        <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[28px] lg:text-[32px] text-[#f6f3ea] tracking-[-0.56px] lg:tracking-[-0.64px] leading-[1.35] lg:leading-[1.25]">
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
    image: "/assets/feature-1.webp",
    reversed: false,
    textGap: "gap-[64px]",
  },
  {
    title: "AI agents autonomously perform onchain interaction",
    items: [
      "Execute transfers swaps and contract calls programmatically",
      "Build autonomous workflows using a lightweight developer toolkit",
      "Give AI agents direct access to wallets and onchain actions",
    ],
    ctaText: "Read about AgentKit in docs",
    image: "/assets/feature-2.webp",
    reversed: true,
    textGap: "gap-[64px]",
  },
  {
    title: "ERC-4337 account abstraction",
    items: [
      "Enable smart contract wallets that validate transactions programmatically",
      "Remove gas payment friction for end users",
      "Support relayer and paymaster systems for frictionless user experiences",
    ],
    ctaText: "Read about ERC-4337 in docs",
    image: "/assets/feature-3.webp",
    reversed: false,
    textGap: "gap-[56px]",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="bg-[#0a0b0d] py-[60px] lg:pt-[120px] lg:pb-[160px]">
      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-0 flex flex-col items-start lg:items-center gap-[52px] lg:gap-[104px]">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}
