"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Web Audio API: soft pop sound (matches Ally project) ──
let sharedAudioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (sharedAudioCtx.state === "suspended") {
      void sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function useAccordionSound() {
  const playToggle = useCallback(() => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Soft pop: 400Hz → 200Hz sweep, very short
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Silently fail if audio doesn't work
    }
  }, []);

  return { playToggle };
}

const faqData = [
  {
    question: "What is BlockPe?",
    answer:
      "BlockPe is an agent-first payment infrastructure that enables autonomous AI agents to make and receive payments in INR using on-chain rails. Think of it as Razorpay for AI agents.",
  },
  {
    question: "How is BlockPe different from UPI?",
    answer:
      "UPI was designed for human-initiated transactions and cannot support the volume and frequency of agent-to-agent payments. BlockPe uses blockchain rails that enable micropayments as small as fractions of a rupee, high-frequency autonomous transactions, and costs that are a fraction of traditional payment infrastructure.",
  },
  {
    question: "What is INR stablecoin?",
    answer:
      "An INR stablecoin is a digital currency pegged 1:1 to the Indian Rupee, running on blockchain. It enables instant, low-cost, programmable payments — ideal for autonomous agents that need to transact without human intervention.",
  },
  {
    question: "Who is BlockPe built for?",
    answer:
      "BlockPe is built for developers building AI agents, platforms offering usage-based services, Indian businesses selling digital services globally, and enterprises deploying autonomous workflows.",
  },
  {
    question: "How does cross-border payment work?",
    answer:
      "BlockPe handles incoming payments in USDT or other stablecoins, performs on-chain swaps, and routes them to INR stablecoin automatically. Agents only receive a success or failure response — they never deal with FX, bridges, chains, or gas.",
  },
  {
    question: "Is BlockPe a new product or built on existing infrastructure?",
    answer:
      "BlockPe is built on the battle-tested infrastructure of 0xGasless, which has been live in production for over 12 months processing real transactions globally. BlockPe is the India-first, regulated productization of that proven technology.",
  },
  {
    question: "What blockchain does BlockPe run on?",
    answer:
      "BlockPe runs on Avalanche L1 — a custom blockchain with its own consensus model that enables high throughput and low-cost transactions while settling on the Avalanche mainchain.",
  },
  {
    question: "Does BlockPe have a token?",
    answer:
      "No. BlockPe does not have its own token. The infrastructure is focused purely on wallets, payments, settlement, and compliance.",
  },
];

function MorphIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="border-[0.833px] border-[rgba(246,243,234,0.35)] backdrop-blur-[1.667px] shadow-[0px_3.333px_6.667px_0px_rgba(0,0,0,0.16)] p-[2.5px] flex items-center justify-center shrink-0">
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Horizontal line (always visible) */}
        <line
          x1="4" y1="10" x2="16" y2="10"
          stroke="#f6f3ea"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Vertical line (fades out to become minus) */}
        <motion.line
          x1="10" y1="4" x2="10" y2="16"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          stroke="#f6f3ea"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}

// Deceleration curve matching Ally's accordion (ease-out-quart feel)
const ACCORDION_EASE = [0.165, 0.84, 0.44, 1] as const;

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  isFirst,
  playToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isFirst: boolean;
  playToggle: () => void;
}) {

  return (
    <div className={`border-b border-[#232325] ${isFirst ? "border-t" : ""}`}>
      <button
        className="flex gap-[24px] items-start w-full py-[24px] text-left cursor-pointer"
        onClick={() => {
          playToggle();
          onClick();
        }}
        aria-expanded={isOpen}
      >
        <div className="mt-[3px]">
          <MorphIcon isOpen={isOpen} />
        </div>
        <span
          className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#f6f3ea] leading-[1.5] pt-[3px]"
          style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
        >
          {question}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: ACCORDION_EASE },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="pl-[49px] pb-[24px]">
              <p
                className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] leading-[1.5]"
                style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { playToggle } = useAccordionSound();

  return (
    <section className="py-[80px] lg:py-[120px]">
      <div className="max-w-[390px] lg:max-w-[1200px] mx-auto px-4 lg:px-[52px]">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-[16px] shrink-0 mb-10 lg:mb-0 lg:sticky lg:top-[120px]"
          >
            <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25]">
              FAQs
            </h2>
            <p
              className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[rgba(246,243,234,0.6)] leading-[1.5] w-[312px]"
              style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
            >
              Have more questions? Get in touch with our team
            </p>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[600px] overflow-clip"
          >
            {faqData.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                isFirst={i === 0}
                playToggle={playToggle}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
