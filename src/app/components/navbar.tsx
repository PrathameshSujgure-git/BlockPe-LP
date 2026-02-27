"use client";

import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PrimaryButton } from "./primary-button";
import svgPaths from "../../imports/svg-o51ewolwat";

function LogoIcon() {
  return (
    <a href="#" className="relative w-[75px] h-[24px] block flex-shrink-0">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.298 24.2">
        <g>
          <g>
            <path d={svgPaths.p277f0600} fill="#F5F5F5" transform="translate(29.5, 7)" />
            <path d={svgPaths.p22654d00} fill="#F5F5F5" transform="translate(29.5, 7)" />
            <path d={svgPaths.p122ac600} fill="#F5F5F5" transform="translate(29.5, 7)" />
            <path d={svgPaths.p3d1f500} fill="#F5F5F5" transform="translate(29.5, 7)" />
            <path d={svgPaths.p36e65000} fill="#F5F5F5" transform="translate(29.5, 7)" />
          </g>
          <svg viewBox="0 0 24.1845 23.5792" width="24" height="24" x="0" y="0">
            <path d={svgPaths.p2d6fe480} fill="#F5F5F5" />
            <path d={svgPaths.p2ba1400} fill="#F5F5F5" />
            <path d={svgPaths.p1da61700} fill="#F5F5F5" />
            <path d={svgPaths.p5921a00} fill="#F5F5F5" />
            <path d={svgPaths.p41210f0} fill="#F5F5F5" />
            <path d={svgPaths.p8ce6c80} fill="#F5F5F5" />
          </svg>
        </g>
      </svg>
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Use cases", href: "#use-cases" },
    { label: "$0xGas", href: "#0xgas" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0b0d]/80 backdrop-blur-md border-b border-[rgba(246,243,234,0.05)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 lg:px-0 h-[72px]">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <LogoIcon />
          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-[#f6f3ea]/80 px-4 py-2 hover:text-[#00dd7f] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 text-[#f6f3ea]/80 hover:text-[#00dd7f] transition-colors">
            <Github size={20} />
            <span className="font-['DM_Sans',sans-serif] font-medium text-[14px]">Agentkit Repo</span>
          </a>
          <PrimaryButton>Get Started →</PrimaryButton>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-[#f6f3ea]" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0b0d] border-t border-[rgba(246,243,234,0.1)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-[#f6f3ea] py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#" className="flex items-center gap-2 text-[#f6f3ea] py-2">
                <Github size={20} />
                <span className="font-['DM_Sans',sans-serif] font-medium text-[14px]">Agentkit Repo</span>
              </a>
              <PrimaryButton>Get Started →</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
