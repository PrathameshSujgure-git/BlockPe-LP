"use client";

import { motion } from "motion/react";

function BarChart() {
  const bars = [
    { h: 24, left: 16 }, { h: 25, left: 36 }, { h: 45, left: 56 }, { h: 51, left: 76 },
    { h: 31, left: 96 }, { h: 57, left: 116 }, { h: 44, left: 136 }, { h: 51, left: 156 },
    { h: 60, left: 175 }, { h: 83, left: 195 }, { h: 44, left: 215 }, { h: 40, left: 236 },
    { h: 34, left: 255 },
  ];

  return (
    <div className="h-[160px] relative w-full">
      {/* Vertical grid lines */}
      {[16, 116, 248].map((x, i) => (
        <div key={i} className="absolute top-[12px] h-[124px] w-px bg-[#232325]" style={{ left: `${x}px` }} />
      ))}
      {/* Bars */}
      {bars.map((bar, i) => (
        <div
          key={i}
          className="absolute w-[8.5px]"
          style={{
            height: `${bar.h}px`,
            left: `${bar.left}px`,
            bottom: "52px",
            backgroundImage: "linear-gradient(156deg, rgb(0, 221, 127) 30%, rgb(0, 119, 68) 82%)",
          }}
        />
      ))}
      {/* Date labels */}
      <div className="absolute bottom-[8px] left-[20px] font-['DM_Mono',monospace] text-[#00dd7f] text-[11px] tracking-[-0.33px]">
        Nov 10
      </div>
      <div className="absolute bottom-[8px] left-[120px] font-['DM_Mono',monospace] text-[#00dd7f] text-[11px] tracking-[-0.33px]">
        Nov 11
      </div>
      <div className="absolute bottom-[8px] right-[20px] font-['DM_Mono',monospace] text-[#00dd7f] text-[11px] tracking-[-0.33px]">
        Today
      </div>
    </div>
  );
}

function NotificationPanel() {
  return (
    <div className="h-[160px] relative w-full overflow-hidden">
      <div className="flex flex-col gap-[13px] items-center w-full">
        {/* Badge */}
        <div className="bg-[rgba(255,255,255,0.05)] border-[0.5px] border-[#353538] px-[6px] py-[2px] flex gap-2 items-center self-start">
          <div className="w-[5px] h-[5px] bg-[#00dd7f] rounded-full" />
          <span className="font-['DM_Mono',monospace] font-medium text-[#f6f3ea] text-[9px] leading-[1.5] uppercase">
            NEW NOTIFICATION
          </span>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-3 items-center w-full max-w-[234px]">
          <div className="bg-[rgba(255,255,255,0.1)] w-full flex gap-2 items-center p-1">
            <div className="bg-[rgba(255,255,255,0.05)] p-2">
              <svg width="18" height="18" viewBox="0 0 22.3 17.6" fill="none">
                <circle cx="13.5" cy="4.15" r="4" stroke="#00DD7F" strokeWidth="1.3" fill="none" />
                <circle cx="9" cy="9" r="4" stroke="#00DD7F" strokeWidth="1.3" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[12px] leading-[1.5]">
                Payment received
              </span>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[rgba(246,243,234,0.6)] text-[10px] leading-[1.5]">
                Today, 16:20
              </span>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] w-full flex gap-2 items-center p-1 opacity-70">
            <div className="bg-[rgba(255,255,255,0.05)] p-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3H19C19.5 3 20 3.5 20 4V20C20 20.5 19.5 21 19 21H5C4.5 21 4 20.5 4 20V4C4 3.5 4.5 3 5 3Z"
                  fill="#00DD7F"
                  opacity="0.3"
                />
                <path d="M9 12L11 14L15 10" stroke="#00DD7F" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[12px] leading-[1.5]">
                Invoice reviewed
              </span>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[rgba(246,243,234,0.6)] text-[10px] leading-[1.5]">
                Today, 11:11
              </span>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] w-full flex gap-2 items-center p-1 opacity-70">
            <div className="bg-[rgba(255,255,255,0.1)] p-2">
              <svg width="18" height="18" viewBox="0 0 22.3 17.6" fill="none">
                <circle cx="13.5" cy="4.15" r="4" stroke="black" strokeWidth="1.3" fill="none" />
                <circle cx="9" cy="9" r="4" stroke="black" strokeWidth="1.3" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#f6f3ea] text-[12px] leading-[1.5]">
                Payment received
              </span>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[rgba(246,243,234,0.6)] text-[10px] leading-[1.5]">
                Today, 16:20
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[113px] bg-gradient-to-b from-transparent to-[#131314] pointer-events-none" />
    </div>
  );
}

function AutonomyGraph() {
  return (
    <div className="h-[160px] relative w-full flex items-end justify-center">
      <svg width="228" height="140" viewBox="0 0 228 140" fill="none" className="opacity-30">
        {[0, 38, 76, 114, 152, 190, 228].map((x, i) => (
          <line
            key={i}
            x1={x + 0.5}
            x2={x + 0.5}
            y1="0"
            y2="140"
            stroke="url(#grad_line)"
            strokeDasharray="10 10"
          />
        ))}
        <defs>
          <linearGradient id="grad_line" x1="0" y1="0" x2="0" y2="140">
            <stop stopColor="#232325" />
            <stop offset="1" stopColor="#83838B" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      {/* Curve line */}
      <svg
        width="228"
        height="120"
        viewBox="0 0 228 120"
        fill="none"
        className="absolute bottom-[20px]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 C60 90, 100 70, 140 40 S200 5, 228 0"
          stroke="#00dd7f"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M0 100 C60 90, 100 70, 140 40 S200 5, 228 0 L228 120 L0 120Z"
          fill="url(#fill_grad)"
          opacity="0.1"
        />
        <defs>
          <linearGradient id="fill_grad" x1="114" y1="0" x2="114" y2="120">
            <stop stopColor="#00dd7f" />
            <stop offset="1" stopColor="#00dd7f" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-[4px] left-[8px] font-['DM_Mono',monospace] text-[#9b9994] text-[10px] uppercase">
        Human Involvement
      </div>
      <div className="absolute top-[4px] right-[8px] font-['DM_Mono',monospace] text-[#9b9994] text-[10px] uppercase">
        Full Autonomy
      </div>
    </div>
  );
}

interface UseCaseCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}

function UseCaseCard({ title, description, children, index }: UseCaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex-1 min-w-[280px] bg-[#131314] border border-[#232325] relative group hover:border-[#232325]/80 transition-colors"
    >
      <div className="flex flex-col gap-10 p-6 md:p-8 pt-6">
        {children}
        <div className="flex flex-col gap-4">
          <h3 className="font-['PP_Mori',sans-serif] font-semibold text-[28px] md:text-[32px] text-[#f6f3ea] tracking-[-0.64px] leading-[1.25]">
            {title}
          </h3>
          <p className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-[#9b9994] leading-[1.5]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function UseCases() {
  return (
    <section id="use-cases" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 flex flex-col items-center gap-[84px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <h2 className="font-['PP_Mori',sans-serif] font-semibold text-[40px] md:text-[56px] text-[#f6f3ea] tracking-[-2.24px] leading-[1.25] max-w-[483px]">
            Proven Use Cases in Production
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] font-normal text-[16px] text-[#9b9994] leading-[1.5] max-w-[398px]"
            style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.6)" }}
          >
            Powering real applications at scale through gasless production ready financial infrastructure
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <UseCaseCard
            title="AI Driven Trading Systems"
            description="Automated market analysis and autonomous trade execution"
            index={0}
          >
            <BarChart />
          </UseCaseCard>
          <UseCaseCard
            title="Financial Concierge AI"
            description="Smart payment management and personal finance automation"
            index={1}
          >
            <NotificationPanel />
          </UseCaseCard>
          <UseCaseCard
            title="Autonomous Onchain Agents"
            description="Self managed onchain entities handling assets and payments"
            index={2}
          >
            <AutonomyGraph />
          </UseCaseCard>
        </div>
      </div>
    </section>
  );
}
