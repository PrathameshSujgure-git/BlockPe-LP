"use client";

import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { motion } from "motion/react";
import { PrimaryButton } from "./primary-button";

// Easing curves from https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
const EASE_OUT_QUINT = [0.23, 1, 0.32, 1] as const;
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

// Snappier morph: 0.3s with expo (near-instant start)
const MORPH_TRANSITION = { duration: 0.3, ease: EASE_OUT_EXPO };

// Spring config for content entrance — subtle overshoot gives physical weight
const CONTENT_SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

const SCROLL_THRESHOLD_PERCENT = 0.25;

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Use cases", href: "#use-cases" },
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
    if (!mobileOpen) return;

    let startY: number | null = null;

    function handleTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (startY === null) return;
      if (Math.abs(e.touches[0].clientY - startY) > 10) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed left-0 right-0 z-50 top-0 lg:top-[24px] select-none p-[16px] pb-0 lg:p-0 max-w-[390px] lg:max-w-none mx-auto"
    >
      {/* ── Unified mobile container — always mounted, morphs between bar and menu ── */}
      <motion.div
        className="lg:hidden flex flex-col px-[16px]"
        style={{
          backgroundColor: "rgba(10,11,13,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(246,243,234,0.12)",
        }}
      >
        {/* Top bar row — always visible */}
        <div className="flex items-center justify-between py-[12px]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (mobileOpen) {
                setMobileOpen(false);
                requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-[8px] flex-shrink-0"
          >
            <img
              src="/assets/gasless-logo.svg"
              alt="0xGasless"
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
            <motion.span
              animate={{
                width: mobileOpen ? "auto" : 0,
                opacity: mobileOpen ? 1 : 0,
              }}
              initial={{ width: 0, opacity: 0 }}
              transition={
                mobileOpen
                  ? { delay: 0.1, ...CONTENT_SPRING }
                  : { duration: 0.12, ease: EASE_OUT_CUBIC }
              }
              className="font-['PP_Mori',sans-serif] font-semibold text-[14px] text-[#f6f3ea] whitespace-nowrap overflow-hidden"
            >
              BlockPe
            </motion.span>
          </a>

          {/* Hamburger / X button */}
          <button
            className="w-[24px] h-[24px] select-none flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Top line: collapses to center then rotates 45deg */}
              <motion.line
                x1="4" x2="20"
                stroke="#f6f3ea"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ y1: 7, y2: 7, rotate: 0 }}
                animate={{
                  y1: mobileOpen ? 12 : 7,
                  y2: mobileOpen ? 12 : 7,
                  rotate: mobileOpen ? 45 : 0,
                }}
                style={{ transformOrigin: "center" }}
                transition={MORPH_TRANSITION}
              />
              {/* Middle line: geometric collapse to center point */}
              <motion.line
                y1="12" y2="12"
                stroke="#f6f3ea"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ x1: 4, x2: 20, opacity: 1 }}
                animate={{
                  x1: mobileOpen ? 12 : 4,
                  x2: mobileOpen ? 12 : 20,
                  opacity: mobileOpen ? 0 : 1,
                }}
                style={{ transformOrigin: "center" }}
                transition={MORPH_TRANSITION}
              />
              {/* Bottom line: collapses to center then rotates -45deg */}
              <motion.line
                x1="4" x2="20"
                stroke="#f6f3ea"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ y1: 17, y2: 17, rotate: 0 }}
                animate={{
                  y1: mobileOpen ? 12 : 17,
                  y2: mobileOpen ? 12 : 17,
                  rotate: mobileOpen ? -45 : 0,
                }}
                style={{ transformOrigin: "center" }}
                transition={MORPH_TRANSITION}
              />
            </svg>
          </button>
        </div>

        {/* Expandable content — height 0 <-> auto */}
        <motion.div
          animate={{
            height: mobileOpen ? "auto" : 0,
            opacity: mobileOpen ? 1 : 0,
          }}
          initial={{ height: 0, opacity: 0 }}
          transition={
            mobileOpen
              ? {
                  height: { duration: 0.4, ease: EASE_OUT_EXPO },
                  opacity: { duration: 0.2, ease: EASE_OUT_CUBIC, delay: 0.05 },
                }
              : {
                  height: { duration: 0.3, ease: EASE_OUT_CUBIC, delay: 0.05 },
                  opacity: { duration: 0.12, ease: EASE_OUT_CUBIC },
                }
          }
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col gap-[36px] pt-[12px] pb-[16px]">
            {/* Nav links — staggered spring entrance */}
            <div className="flex flex-col gap-[20px] pl-[20px]">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  animate={{
                    opacity: mobileOpen ? 1 : 0,
                    y: mobileOpen ? 0 : 12,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  transition={
                    mobileOpen
                      ? { delay: 0.15 + i * 0.06, ...CONTENT_SPRING }
                      : {
                          duration: 0.12,
                          delay: (navLinks.length - 1 - i) * 0.03,
                          ease: EASE_OUT_CUBIC,
                        }
                  }
                  className="font-['DM_Sans',sans-serif] font-medium text-[16px] text-[#f6f3ea] leading-[1.5]"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    const id = link.href.slice(1);
                    requestAnimationFrame(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA section */}
            <motion.div
              animate={{
                opacity: mobileOpen ? 1 : 0,
                y: mobileOpen ? 0 : 12,
              }}
              initial={{ opacity: 0, y: 12 }}
              transition={
                mobileOpen
                  ? { delay: 0.35, ...CONTENT_SPRING }
                  : { duration: 0.12, ease: EASE_OUT_CUBIC }
              }
              className="flex flex-col gap-[12px]"
            >
              {/* Agentkit Repo row */}
              <a
                href="#"
                className="flex items-center justify-between pl-[20px] py-[8px] text-white"
              >
                <span className="font-['DM_Sans',sans-serif] font-medium text-[14px] leading-[1.5]">
                  Agentkit Repo
                </span>
                <Github size={20} />
              </a>

              {/* GET STARTED button — full-width with clipped corner */}
              <button
                type="button"
                className="relative w-full cursor-pointer group select-none"
                onClick={() => setMobileOpen(false)}
              >
                <div className="relative flex w-full">
                  <div
                    className="bg-[#00dd7f] flex items-center justify-between w-full pl-[20px] pr-[8px] py-[8px] transition-all group-hover:bg-[#00c471] group-active:bg-[#00b065]"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                    }}
                  >
                    <span className="font-['PP_Mori',sans-serif] font-semibold text-[#0a0b0d] text-[14px] tracking-[0.42px] uppercase leading-[1.5] whitespace-nowrap">
                      GET STARTED
                    </span>
                    <span className="font-['PP_Mori',sans-serif] font-semibold text-[#0a0b0d] text-[14px]">
                      →
                    </span>
                  </div>
                  {/* White corner triangle */}
                  <svg
                    viewBox="0 0 1 1"
                    fill="none"
                    className="absolute bottom-0 right-0 w-[12px] h-[12px]"
                  >
                    <path d="M0 0H1L0 1V0Z" fill="white" />
                  </svg>
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop navbar — visible only at lg and above */}
      <div className="hidden lg:flex max-w-[1200px] mx-auto items-start justify-between px-[24px]">
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
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
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
            <div className="flex items-center gap-[24px] px-[16px] py-[8px]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-['DM_Sans',sans-serif] font-medium text-[14px] text-[#f6f3ea] leading-[1.5] hover:text-[#00dd7f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right side — stays in exact same position */}
        <div className="flex items-center gap-[12px]">
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
      </div>
    </nav>
  );
}
