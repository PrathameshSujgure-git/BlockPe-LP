"use client";

import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PrimaryButton } from "./primary-button";

const SCROLL_THRESHOLD_PERCENT = 0.25;

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "$0xGas", href: "#0xgas" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * SCROLL_THRESHOLD_PERCENT);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) setMobileOpen(false);
  }, [scrolled]);

  return (
    <nav
      className="fixed left-0 right-0 z-50 top-[24px] select-none"
    >
      <div className="max-w-[1200px] mx-auto flex items-start justify-between px-6 lg:px-[24px]">
        {/* Left: Logo + Nav links */}
        <div className="flex items-start">
          {/* Glass pill background — fades in on scroll, sits behind logo + links */}
          <div
            className="flex items-start gap-[24px] px-[8px] transition-all duration-700"
            style={{
              alignItems: scrolled ? "center" : "flex-start",
              backgroundColor: scrolled ? "rgba(10,11,13,0.9)" : "transparent",
              backdropFilter: scrolled ? "blur(16px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: scrolled ? "rgba(246,243,234,0.12)" : "transparent",
              transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            {/* Logo — morphs between large and small */}
            <a
              href="#"
              className="flex items-center flex-shrink-0 transition-all duration-700"
              style={{
                gap: scrolled ? 8 : 0,
                paddingLeft: scrolled ? 8 : 0,
                transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            >
              <img
                src="/assets/gasless-logo.svg"
                alt="0xGasless"
                className="transition-all duration-700"
                style={{
                  width: scrolled ? 22 : 111,
                  height: scrolled ? 22 : 111,
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              />
              <span
                className="font-['PP_Mori',sans-serif] font-semibold text-[14px] text-[#f6f3ea] whitespace-nowrap overflow-hidden transition-all duration-700"
                style={{
                  maxWidth: scrolled ? 80 : 0,
                  opacity: scrolled ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                BlockPe
              </span>
            </a>

            {/* Desktop nav links — stay in exact same position */}
            <div className="hidden lg:flex items-center gap-[24px] px-[16px] py-[8px]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-[#f6f3ea] leading-[1.5] hover:text-[#00dd7f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right side — stays in exact same position */}
        <div className="hidden lg:flex items-center gap-[12px]">
          <a
            href="#"
            className="flex items-center gap-[12px] px-[12px] py-[8px] text-white hover:text-[#00dd7f] transition-all duration-700"
            style={{
              backgroundColor: scrolled ? "rgba(10,11,13,0.9)" : "transparent",
              backdropFilter: scrolled ? "blur(16px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: scrolled ? "rgba(246,243,234,0.12)" : "transparent",
              transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            <Github size={20} />
            <span className="font-['DM_Sans',sans-serif] font-medium text-[14px] leading-[1.5]">
              Agentkit Repo
            </span>
          </a>
          <PrimaryButton>{scrolled ? "GET STARTED →" : "Get Started →"}</PrimaryButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-[#f6f3ea]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
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
                <span className="font-['DM_Sans',sans-serif] font-medium text-[14px]">
                  Agentkit Repo
                </span>
              </a>
              <PrimaryButton>Get Started →</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
