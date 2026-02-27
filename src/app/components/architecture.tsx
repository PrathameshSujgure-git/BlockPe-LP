"use client";

import { motion } from "motion/react";
import { Smile, Cpu, Lock, GitPullRequest } from "lucide-react";

const imgArchBg = "/assets/84469e5bf07ab0bf330d81373f7ec0d9daa93b0c.png";
import { SecondaryButton } from "./primary-button";

function ArchLayer({ label, color, rows }: { label: string; color: string; rows: string[][] }) {
  return (
    <div className="flex flex-col items-start shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)] w-full">
      {/* Header row with triangle + label */}
      <div className="flex items-stretch w-full">
        <div className="flex items-start flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M0 12H12V0L0 12Z" fill={color} />
          </svg>
        </div>
        <div
          className="flex-1 border-t border-r border-[rgba(255,255,255,0.1)] px-3 py-1"
          style={{ backgroundColor: `${color}15` }}
        >
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[12px] uppercase leading-[1.5]">
            {label}
          </span>
        </div>
      </div>
      {/* Content rows */}
      <div className="border-b border-l border-r border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] w-full">
        <div className="flex flex-col gap-2 p-3 pt-2">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2 w-full">
              {row.map((item, ci) => (
                <div
                  key={ci}
                  className="flex-1 min-h-[56px] bg-[#f6f3ea] border border-[rgba(0,116,67,0.6)] flex flex-col items-center justify-center px-2 md:px-4 py-2"
                >
                  {item.split("\n").map((line, li) => (
                    <span
                      key={li}
                      className="font-['DM_Mono',monospace] text-[#0a0b0d] text-[10px] md:text-[12px] leading-[1.5] whitespace-nowrap text-center"
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
      className="flex flex-col gap-8"
    >
      <div className="relative p-2 border-[0.5px] border-white inline-flex gap-2 items-center self-start">
        <div className="absolute -left-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -left-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -top-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <div className="absolute -right-[5px] -bottom-[5px] w-[9px] h-[9px] border-[0.5px] border-white" />
        <Icon size={24} className="text-[#00FF93]" strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-4">
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

const featureBoxes = [
  {
    icon: Smile,
    title: "Zero Configuration Interactions",
    description: "Preconfigured smart accounts, relayers, and paymasters handle execution automatically",
  },
  {
    icon: Cpu,
    title: "AI Native Framework Compatibility",
    description: "Agents and models execute onchain actions without custom blockchain logic",
  },
  {
    icon: Lock,
    title: "Performant & Secure by Default",
    description: "Low overhead execution with strong security guarantees for all applications",
  },
  {
    icon: GitPullRequest,
    title: "Extensible and Cross Chain Ready",
    description: "Modular components support extensions and multi chain deployment",
  },
];

export function Architecture() {
  return (
    <section className="relative w-full py-[120px]">
      {/* Background image */}
      <div className="absolute top-[-100px] left-0 right-0 h-[807px] overflow-hidden pointer-events-none opacity-30">
        <img src={imgArchBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-[313px] bg-gradient-to-b from-transparent to-[#0a0b0d]" />
        <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b from-[#0a0b0d] to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 items-start mb-10"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] max-w-[661px]">
            Architecture Behind Gasless Onchain Execution
          </h2>
          <SecondaryButton>READ DEVELOPER DOCS</SecondaryButton>
        </motion.div>

        {/* Architecture Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:max-w-[701px] lg:ml-auto flex flex-col gap-4 backdrop-blur-[22px] overflow-x-auto mb-[94px]"
        >
          <ArchLayer label="User interface" color="#F6F3EA" rows={[["0xGasless API", "Custom Applications"]]} />
          <ArchLayer label="AI intelligence" color="#CCFFE9" rows={[["Function", "Chaining", "Execution"]]} />
          <ArchLayer
            label="Deployment"
            color="#99FFD4"
            rows={[
              ["Agent Host\n(Cloud Service)", "DevKit\n(CLI Tools)", "Mailbox\n(Message Queue)"],
              ["PayMaster\n(Gasless) Tx Service", "NameRegistry\n(AgentDs)"],
            ]}
          />
          <ArchLayer
            label="Agent sdk"
            color="#66FFBE"
            rows={[
              ["Library Fn.", "Capabilities", "Protocols", "Asynchronous", "Blockchain Tx"],
              ["Storage", "Dialogs", "Security", "Logic", "Signatures"],
            ]}
          />
          <ArchLayer
            label="agent network"
            color="#33FFA9"
            rows={[["Agent Index\n(Endpoint Discovery)", "Name Service\n(Human-readable Addressing)"]]}
          />
          <ArchLayer
            label="Core Foundation"
            color="#00FF93"
            rows={[
              [
                "Account Abstraction\n(ERC-4337)",
                "Smart Account\nInfrastructure",
                "Transaction\nBundling",
                "Mainchain\nSupport",
              ],
            ]}
          />
        </motion.div>

        {/* Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[80px]">
          {featureBoxes.map((box, i) => (
            <FeatureBox key={i} {...box} />
          ))}
        </div>
      </div>
    </section>
  );
}
