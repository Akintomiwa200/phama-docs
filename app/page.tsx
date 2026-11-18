import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
// import { DecodePoster } from "@/components/effects/DecodePoster";
import { DecodeSignalsSection } from "@/components/layout/DecodeSignalsSection";
import { PlatformOverviewSection } from "@/components/layout/PlatformOverviewSection";
import { ReimaginingBanner } from "@/components/layout/ReimaginingBanner";
import { EngineeringSplitSection } from "@/components/layout/EngineeringSplitSection";
import { RecentNewsSection } from "@/components/layout/RecentNewsSection";
import { Footer } from "@/components/layout";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Hero />
      {/*<DecodePoster />*/}
      <DecodeSignalsSection />
      <PlatformOverviewSection />
      <ReimaginingBanner />
      <EngineeringSplitSection />
      <RecentNewsSection />
      <Footer />
    </div>
  );
}
