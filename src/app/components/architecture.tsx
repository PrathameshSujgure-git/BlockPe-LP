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
}

const layers: LayerDef[] = [
  {
    label: "User interface",
    color: "#F6F3EA",
    headerBg: "rgba(255,255,255,0.1)",
    rows: [["0xGasless API", "Custom Applications"]],
  },
  {
    label: "AI intelligence",
    color: "#CCFFE9",
    headerBg: "rgba(204,255,233,0.1)",
    rows: [["Function", "Chaining", "Execution"]],
  },
  {
    label: "Deployment",
    color: "#99FFD4",
    headerBg: "rgba(153,255,212,0.1)",
    rows: [
      ["Agent Host\n(Cloud Service)", "DevKit\n(CLI Tools)", "Mailbox\n(Message Queue)"],
      ["PayMaster\n(Gasless) Tx Servie", "NameRegistry\n(AgentDs)"],
    ],
  },
  {
    label: "Agent sdk",
    color: "#66FFBE",
    headerBg: "rgba(102,255,190,0.1)",
    rows: [
      ["Library Fn.", "Capabilities", "Protocols", "Asynchronous", "Blockchain Tx"],
      ["Storage", "Dialogs", "Security", "Logic", "Signatures"],
    ],
    rowGap: "gap-[6px]",
  },
  {
    label: "Agent network",
    color: "#33FFA9",
    headerBg: "rgba(51,255,169,0.1)",
    rows: [["Agent Index\n(Endpoint Discovery)", "Name Service\n(Human-readable Addressing)"]],
  },
  {
    label: "Core Foundation",
    color: "#00FF93",
    headerBg: "rgba(0,255,147,0.1)",
    rows: [
      [
        "Account Abstraction\n(ERC-4337)",
        "Smart Account\nInfrastructure",
        "Transaction\nBundling",
        "Mainchain\nSupport",
      ],
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ArchLayer                                                          */
/* ------------------------------------------------------------------ */

function ArchLayer({ label, color, headerBg, rows, rowGap = "gap-[8px]" }: LayerDef) {
  return (
    <div className="flex flex-col items-start shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)] w-full">
      {/* Header row: triangle column + label bar */}
      <div className="flex items-stretch w-full">
        {/* Triangle + vertical bar column */}
        <div className="flex flex-col items-start flex-shrink-0 w-[12px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="block shrink-0">
            {/* White fold triangle (visible) */}
            <path d="M0 12H12V0L0 12Z" fill="#f6f3ea" />
            {/* Layer color triangle (0% opacity – cutout feeling) */}
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
        <div className={`flex flex-col ${rowGap} pt-[8px]`}>
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
      className="flex flex-col gap-[32px] w-full lg:w-[264px]"
    >
      {/* Icon container */}
      <div className="relative border-[0.5px] border-white p-[8px] inline-flex self-start">
        <div className="absolute -left-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -left-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <Icon size={24} className="text-[#00FF93]" strokeWidth={2} />
      </div>
      {/* Text block */}
      <div className="flex flex-col gap-[16px]">
        <h4 className="font-['PP_Mori',sans-serif] font-semibold text-[24px] text-[#f6f3ea] tracking-[-0.48px] leading-[1.25]">
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
    title: "Zero Configuration Interactions",
    description:
      "Preconfigured smart accounts, relayers, and paymasters handle execution automatically",
  },
  {
    icon: Cpu,
    title: "AI Native Framework Compatibility",
    description:
      "Agents and models execute onchain actions without custom blockchain logic",
  },
  {
    icon: Lock,
    title: "Performant & Secure by Default",
    description:
      "Low overhead execution with strong security guarantees for all applications",
  },
  {
    icon: GitPullRequest,
    title: "Extensible and Cross Chain Ready",
    description:
      "Modular components support extensions and multi chain deployment",
  },
];

/* ------------------------------------------------------------------ */
/*  Architecture Section                                               */
/* ------------------------------------------------------------------ */

export function Architecture() {
  return (
    <section className="relative w-full py-[120px]">
      {/* Background image */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[-40px] h-[807px] w-full max-w-[1200px] pointer-events-none overflow-hidden">
        <img src="/assets/architecture.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
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
            <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25]">
              Architecture Behind Gasless Onchain Execution
            </h2>
            <SecondaryButton>READ DEVELOPER DOCS</SecondaryButton>
          </motion.div>

          {/* ---- Content area ---- */}
          <div className="flex flex-col gap-[94px] mt-[80px]">
            {/* Row 1: first feature box (left) + architecture table (right) */}
            <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[111px] lg:items-end">
              {/* First feature box */}
              <FeatureBox {...featureBoxes[0]} />

              {/* Architecture table */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-[701px] flex-shrink-0 flex flex-col gap-[24px] overflow-x-auto"
              >
                {layers.map((layer, i) => (
                  <ArchLayer key={i} {...layer} />
                ))}
              </motion.div>
            </div>

            {/* Row 2: remaining 3 feature boxes */}
            <div className="flex flex-col md:flex-row gap-[40px] lg:gap-[128px] lg:items-center">
              {featureBoxes.slice(1).map((box, i) => (
                <FeatureBox key={i} {...box} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
