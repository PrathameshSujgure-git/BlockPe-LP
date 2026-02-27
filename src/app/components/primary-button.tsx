"use client";

export function PrimaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-end shadow-[0px_4px_8px_0px_rgba(0,0,0,0.16)] cursor-pointer group ${className}`}
    >
      <div className="bg-[#00dd7f] flex items-center pl-[20px] pr-[8px] py-[8px] transition-all group-hover:bg-[#00c471] group-active:bg-[#00b065]">
        <span className="font-['PP_Mori',sans-serif] font-semibold text-[#0a0b0d] text-[14px] tracking-[0.42px] uppercase leading-[1.5] whitespace-nowrap">
          {children}
        </span>
      </div>
      <div className="flex flex-col h-full items-start w-[12px]">
        <div className="bg-[#00dd7f] flex-1 w-full group-hover:bg-[#00c471] group-active:bg-[#00b065] transition-all" />
        <div className="w-[12px] h-[12px] relative">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute inset-0">
            <path d="M0 0H12L0 12V0Z" fill="#00dd7f" className="group-hover:fill-[#00c471] group-active:fill-[#00b065] transition-colors" />
            <path d="M12 0V12H0L12 0Z" fill="#0a0b0d" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export function SecondaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`backdrop-blur-[2px] bg-[rgba(0,0,0,0.05)] inline-flex items-end shadow-[0px_4px_8px_0px_rgba(0,0,0,0.16)] cursor-pointer group ${className}`}
    >
      <div className="flex items-center px-[20px] py-[8px] border border-[#f6f3ea] transition-all group-hover:bg-[rgba(255,255,255,0.08)] group-active:bg-[rgba(255,255,255,0.12)]">
        <span className="font-['PP_Mori',sans-serif] font-semibold text-[#f6f3ea] text-[14px] tracking-[0.42px] uppercase leading-[1.5] whitespace-nowrap">
          {children}
        </span>
      </div>
    </button>
  );
}
