import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { StatsBar } from "./components/stats-bar";
import { FeatureCards } from "./components/feature-cards";
import { CommunityStats } from "./components/community-stats";
import { Architecture } from "./components/architecture";
import { TokenSection } from "./components/token-section";
import { UseCases } from "./components/use-cases";
import { BlogSection } from "./components/blog-section";
import { FAQSection } from "./components/faq-section";
import { FooterCTA } from "./components/footer-cta";

export default function Home() {
  return (
    <div className="min-h-screen text-[#f6f3ea] font-['DM_Sans',sans-serif]">
      {/* Main content sits above the fixed footer */}
      <div className="relative z-10 bg-[#0a0b0d]">
        <Navbar />
        {/* Left/right border lines on 1200px container — absolute so they end with content, not on footer */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full z-40">
          <div className="absolute left-0 top-0 w-px h-full bg-[rgba(246,243,234,0.1)]" />
          <div className="absolute right-0 top-0 w-px h-full bg-[rgba(246,243,234,0.1)]" />
        </div>
        <main>
          <Hero />
          <StatsBar />
          <FeatureCards />
          <CommunityStats />
          <Architecture />
          <TokenSection />
          <UseCases />
          <BlogSection />
          <FAQSection />
        </main>
      </div>
      <FooterCTA />
    </div>
  );
}
