"use client";

export function PrimaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={`relative inline-block cursor-pointer group select-none ${className}`}
    >
      <div className="relative flex">
        <div className="bg-[#00dd7f] flex items-center pl-[20px] pr-[20px] py-[8px] transition-all group-hover:bg-[#00c471] group-active:bg-[#00b065]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
            transition: "clip-path 0.2s ease-out, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.clipPath = "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.clipPath = "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";
          }}
        >
          <span className="font-['PP_Mori',sans-serif] font-semibold text-[#0a0b0d] text-[14px] tracking-[0.42px] uppercase leading-[1.5] whitespace-nowrap">
            {children}
          </span>
        </div>
        {/* White corner triangle — grows inward on hover */}
        <svg
          viewBox="0 0 1 1"
          fill="none"
          className="absolute bottom-0 right-0 w-[12px] h-[12px] transition-all duration-200 ease-out group-hover:w-[16px] group-hover:h-[16px]"
        >
          <path d="M0 0H1L0 1V0Z" fill="white" />
        </svg>
      </div>
    </button>
  );
}

export function SecondaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={`backdrop-blur-[2px] bg-[rgba(0,0,0,0.05)] inline-flex items-end shadow-[0px_4px_8px_0px_rgba(0,0,0,0.16)] cursor-pointer group select-none ${className}`}
    >
      <div className="flex items-center px-[20px] py-[8px] border border-[#f6f3ea] transition-all group-hover:bg-[rgba(255,255,255,0.08)] group-active:bg-[rgba(255,255,255,0.12)]">
        <span className="font-['PP_Mori',sans-serif] font-semibold text-[#f6f3ea] text-[14px] tracking-[0.42px] uppercase leading-[1.5] whitespace-nowrap">
          {children}
        </span>
      </div>
    </button>
  );
}
