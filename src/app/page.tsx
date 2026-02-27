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
    <div className="bg-[#0a0b0d] min-h-screen text-[#f6f3ea] overflow-x-hidden font-['DM_Sans',sans-serif]">
      <Navbar />
      <main className="pt-[72px]">
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
      <FooterCTA />
    </div>
  );
}
