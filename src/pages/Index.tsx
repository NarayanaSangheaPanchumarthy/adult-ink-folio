import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustRow from "@/components/TrustRow";
import MoodTabs from "@/components/MoodTabs";
import FeaturedContent from "@/components/FeaturedContent";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <TrustRow />
        <MoodTabs />
        <FeaturedContent />
        <Testimonials />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
