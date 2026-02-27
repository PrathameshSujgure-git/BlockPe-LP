"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What is 0xGasless?",
    answer:
      "0xGasless provides AI infrastructure where you can create AI agents, track progress, and smoothly guide your finance from idea to successful launch. Our platform enables AI agents to interact with blockchain networks without worrying about gas fees through ERC-4337 account abstraction.",
  },
  {
    question: "Is 0xGasless open source?",
    answer:
      "Yes, 0xGasless is open source and community-driven. Developers can contribute by submitting pull requests to add new tools, protocol integrations, or improvements to the existing infrastructure.",
  },
  {
    question: "How does 0xGasless work?",
    answer:
      "0xGasless combines AI agent technology with blockchain account abstraction (ERC-4337) to enable gasless transactions. It provides a framework that allows AI agents to execute financial operations autonomously while maintaining security and control through smart account infrastructure.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "Currently, 0xGasless provides SDKs for: Python TypeScript/JavaScript. Additional language support is planned for future releases.",
  },
  {
    question: "Who can use 0xGasless?",
    answer:
      "0xGasless is designed for: Developers building AI-powered financial applications, Teams implementing autonomous trading systems, Businesses automating financial operations, Anyone looking to integrate AI agents with blockchain capabilities.",
  },
  {
    question: "How can I contribute to 0xGasless?",
    answer:
      "You can contribute by: Submitting pull requests for new features, Adding protocol integrations, Improving documentation, Reporting bugs and suggesting improvements. All contributions go through our review process to ensure security and compatibility.",
  },
  {
    question: "What chains does 0xGasless support?",
    answer:
      "0xGasless supports multiple EVM-compatible chains, including Ethereum, Base, Polygon, and other major networks. Our infrastructure is chain-agnostic and can be extended to support additional networks through our community contribution model.",
  },
  {
    question: "How does 0xGasless ensure transaction security?",
    answer:
      "0xGasless implements multiple security layers: Smart account contracts with configurable limits, Multi-signature capabilities, Transaction validation, Whitelist/blacklist controls, Emergency pause functionality.",
  },
  {
    question: "How does the gasless transaction system work?",
    answer:
      "0xGasless uses ERC-4337 account abstraction and a paymaster system to handle gas fees. When an AI agent initiates a transaction, our infrastructure bundles it with others, optimizes gas costs, and processes it through our paymaster service, removing the need for the agent to hold native tokens for gas.",
  },
  {
    question: "How do I provide feedback?",
    answer:
      "Users can submit feedback through our support portal, allowing us to continuously improve 0xGasless based on user experiences and suggestions.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[rgba(246,243,234,0.1)]">
      <button
        className="flex items-start gap-6 w-full py-5 text-left cursor-pointer group"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="w-[25px] h-[25px] flex-shrink-0 flex items-center justify-center mt-0.5">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <Minus size={20} className="text-[#00dd7f]" />
            ) : (
              <Plus size={20} className="text-[#f6f3ea]" />
            )}
          </motion.div>
        </div>
        <span
          className={`font-['DM_Sans',sans-serif] font-semibold text-[16px] leading-[1.5] transition-colors ${
            isOpen ? "text-[#00dd7f]" : "text-[#f6f3ea] group-hover:text-[#00dd7f]"
          }`}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-[49px] pb-5">
              <p className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] max-w-[551px]">
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

  return (
    <section className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 flex flex-col lg:flex-row gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-[400px] flex-shrink-0"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25]">
            FAQs
          </h2>
          <p className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] mt-4">
            Have anything else reach out on our community channels
          </p>
        </motion.div>

        {/* Right - Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          {faqData.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
