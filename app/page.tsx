import HeroSection from "@/components/main/HeroSection";
import FeatureShowcase from "@/components/main/FeatureShowcase";
import StatsHighlight from "@/components/main/StatsHighlight";
import Footer from "@/components/main/Footer";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureShowcase />

      <div className="h-70 flex items-center justify-center -mb-20">
        <TextHoverEffect text="HOK-DRAFT" />
      </div>

      <Footer />
    </div>
  );
}
