"use client";

import { motion } from "motion/react";
import { Smile, Cpu, Lock, GitPullRequest } from "lucide-react";

import { SecondaryButton } from "./primary-button";

/* ------------------------------------------------------------------ */
/*  Layer data                                                         */
/* ------------------------------------------------------------------ */

interface LayerDef {
  label: string;
  color: string;
  headerBg: string;
  rows: string[][];
  rowGap?: string; // override default gap-[8px] between rows
  mobileLayout?: "stack" | "grid-2" | "row";
}

const layers: LayerDef[] = [
  {
    label: "AI Agents",
    color: "#F6F3EA",
    headerBg: "rgba(255,255,255,0.1)",
    rows: [["Developer Agents", "Enterprise Agents", "Consumer Agents"]],
    mobileLayout: "stack",
  },
  {
    label: "BlockPe SDK & APIs",
    color: "#CCFFE9",
    headerBg: "rgba(204,255,233,0.1)",
    rows: [["SDK", "REST APIs", "Webhooks"]],
    mobileLayout: "row",
  },
  {
    label: "Agent Smart Wallets",
    color: "#99FFD4",
    headerBg: "rgba(153,255,212,0.1)",
    rows: [
      ["Gasless Wallets", "Spending Limits", "Permissions"],
      ["Rate Limits", "Domain Allowlists"],
    ],
    mobileLayout: "stack",
  },
  {
    label: "On-chain Payments & Routing",
    color: "#66FFBE",
    headerBg: "rgba(102,255,190,0.1)",
    rows: [
      ["Payment Execution", "Cross-border Routing", "Stablecoin Swaps", "Liquidity Mgmt", "x402 Standard"],
    ],
    rowGap: "gap-[6px]",
    mobileLayout: "grid-2",
  },
  {
    label: "INR Stablecoin Layer",
    color: "#33FFA9",
    headerBg: "rgba(51,255,169,0.1)",
    rows: [["INR Stablecoin", "Avalanche L1"]],
    mobileLayout: "stack",
  },
  {
    label: "Indian Banking & Settlement",
    color: "#00FF93",
    headerBg: "rgba(0,255,147,0.1)",
    rows: [
      [
        "Bank Off-ramp",
        "Merchant Settlement",
        "Compliance",
        "Reconciliation",
      ],
    ],
    mobileLayout: "stack",
  },
];

/* ------------------------------------------------------------------ */
/*  ArchLayer                                                          */
/* ------------------------------------------------------------------ */

function ArchLayer({ label, color, headerBg, rows, rowGap = "gap-[8px]", mobileLayout = "row" }: LayerDef) {
  return (
    <div className="flex flex-col items-start shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)] w-full">
      {/* Header row: triangle column + label bar */}
      <div className="flex items-stretch w-full">
        {/* Triangle + vertical bar column */}
        <div className="flex flex-col items-start flex-shrink-0 w-[12px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="block shrink-0">
            {/* White fold triangle (visible) */}
            <path d="M0 12H12V0L0 12Z" fill="#f6f3ea" />
            {/* Layer color triangle (0% opacity - cutout feeling) */}
            <path d="M0 0L12 0L0 12Z" fill={color} fillOpacity={0} />
          </svg>
          <div
            className="flex-1 w-full border-l border-[rgba(255,255,255,0.1)] backdrop-blur-[22px]"
            style={{ backgroundColor: headerBg }}
          />
        </div>
        {/* Label bar */}
        <div
          className="flex-1 border-t border-r border-[rgba(255,255,255,0.1)] backdrop-blur-[22px] px-[12px] py-[4px]"
          style={{ backgroundColor: headerBg }}
        >
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[12px] uppercase leading-[1.5]">
            {label}
          </span>
        </div>
      </div>
      {/* Content rows */}
      <div className="border-b border-l border-r border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] backdrop-blur-[22px] w-full pb-[8px] px-[12px]">
        {/* Desktop layout */}
        <div className={`hidden lg:flex flex-col ${rowGap} pt-[8px]`}>
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-[8px] w-full">
              {row.map((item, ci) => (
                <div
                  key={ci}
                  className="flex-1 h-[56px] bg-[#f6f3ea] border border-[rgba(0,116,67,0.6)] flex flex-col items-center justify-center px-[16px] py-[8px]"
                >
                  {item.split("\n").map((line, li) => (
                    <span
                      key={li}
                      className="font-['DM_Mono',monospace] font-normal text-[#0a0b0d] text-[12px] leading-[1.5] whitespace-nowrap text-center"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          {mobileLayout === "stack" && (
            <div className="flex flex-col gap-[8px] pt-[8px]">
              {rows.flat().map((item, i) => (
                <div
                  key={i}
                  className="w-full bg-[#f6f3ea] border border-[rgba(0,116,67,0.6)] flex items-center px-[16px] py-[10px] gap-[8px]"
                >
                  {item.split("\n").map((part, pi) => (
                    <span
                      key={pi}
                      className="font-['DM_Mono',monospace] font-normal text-[#0a0b0d] text-[12px] leading-[1.5] whitespace-nowrap"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
          {mobileLayout === "grid-2" && (
            <div className="grid grid-cols-2 gap-[6px] pt-[8px]">
              {rows.flat().map((item, i) => (
                <div
                  key={i}
                  className="bg-[#f6f3ea] border border-[rgba(0,116,67,0.6)] flex flex-col items-center justify-center px-[16px] py-[8px]"
                >
                  <span className="font-['DM_Mono',monospace] font-normal text-[#0a0b0d] text-[12px] leading-[1.5]">
                    {item.split("\n")[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
          {mobileLayout === "row" && (
            <div className={`flex flex-col ${rowGap} pt-[8px]`}>
              {rows.map((row, ri) => (
                <div key={ri} className="flex gap-[8px] w-full">
                  {row.map((item, ci) => (
                    <div
                      key={ci}
                      className="flex-1 bg-[#f6f3ea] border border-[rgba(0,116,67,0.6)] flex flex-col items-center justify-center px-[16px] py-[8px]"
                    >
                      {item.split("\n").map((line, li) => (
                        <span
                          key={li}
                          className="font-['DM_Mono',monospace] font-normal text-[#0a0b0d] text-[12px] leading-[1.5] whitespace-nowrap text-center"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FeatureBox                                                         */
/* ------------------------------------------------------------------ */

function FeatureBox({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-[24px] lg:gap-[32px] w-full lg:w-[264px]"
    >
      {/* Icon container — wrapped with 4px top+left padding on mobile for alignment */}
      <div className="pt-[4px] pl-[5px] lg:pt-0 lg:pl-0">
      <div className="relative border-[0.5px] border-white p-[8px] inline-flex self-start">
        <div className="absolute -left-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -left-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <Icon size={24} className="text-[#00FF93]" strokeWidth={2} />
      </div>
      </div>
      {/* Text block */}
      <div className="flex flex-col gap-[16px]">
        <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[20px] lg:text-[24px] text-[#f6f3ea] tracking-[-0.4px] lg:tracking-[-0.48px] leading-[1.25]">
          {title}
        </h4>
        <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-[#9b9994] leading-[1.5]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const featureBoxes = [
  {
    icon: Smile,
    title: "1/10th the Cost of UPI",
    description:
      "Blockchain rails reduce transaction costs dramatically compared to traditional payment infrastructure",
  },
  {
    icon: Cpu,
    title: "Built for Micropayments",
    description:
      "Agents make transactions as small as fractions of a rupee — impossible on traditional rails",
  },
  {
    icon: Lock,
    title: "Regulated & Compliant",
    description:
      "Built for the Indian ecosystem with regulatory compliance and INR stablecoin settlement",
  },
  {
    icon: GitPullRequest,
    title: "Why Blockchain, Not UPI",
    description:
      "UPI cannot handle high-frequency agent transactions at scale — blockchain solves micropayments natively",
  },
];

/* ------------------------------------------------------------------ */
/*  Architecture Section                                               */
/* ------------------------------------------------------------------ */

export function Architecture() {
  return (
    <section className="relative w-full py-0 lg:py-[120px]">
      {/* Desktop background image */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[-40px] h-[807px] w-full max-w-[1200px] pointer-events-none overflow-hidden">
        <img src="/assets/architecture.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Mobile background image */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-0 w-[390px] pointer-events-none overflow-hidden">
        <img src="/assets/architecture-mobile.webp" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-0 relative z-10">
        {/* Inner container offset 62px from left within the 1200px */}
        <div className="w-full lg:w-[1076px] lg:ml-[62px]">
          {/* ---- Title area ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 items-start max-w-[661px]"
          >
            <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] lg:text-[56px] text-[#f6f3ea] tracking-[-0.8px] lg:tracking-[-2.24px] leading-[1.25]">
              Architecture Behind BlockPe
            </h2>
            <SecondaryButton>READ DEVELOPER DOCS</SecondaryButton>
          </motion.div>

          {/* ---- Content area ---- */}
          {/* Desktop layout */}
          <div className="hidden lg:flex flex-col gap-[94px] mt-[80px]">
            {/* Row 1: first feature box (left) + architecture table (right) */}
            <div className="flex flex-row gap-[111px] items-end">
              {/* First feature box */}
              <FeatureBox {...featureBoxes[0]} />

              {/* Architecture table */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-[701px] flex-shrink-0 flex flex-col gap-[24px] overflow-x-auto"
              >
                {layers.map((layer, i) => (
                  <ArchLayer key={i} {...layer} />
                ))}
              </motion.div>
            </div>

            {/* Row 2: remaining 3 feature boxes */}
            <div className="flex flex-row gap-[128px] items-center">
              {featureBoxes.slice(1).map((box, i) => (
                <FeatureBox key={i} {...box} />
              ))}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-[80px] mt-[60px]">
            {/* Architecture table */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex flex-col gap-[24px] overflow-x-auto pt-[88px]"
            >
              {layers.map((layer, i) => (
                <ArchLayer key={i} {...layer} />
              ))}
            </motion.div>

            {/* All 4 feature boxes */}
            <div className="flex flex-col gap-[64px]">
              {featureBoxes.map((box, i) => (
                <FeatureBox key={i} {...box} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
