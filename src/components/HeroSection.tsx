import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Crown } from "lucide-react";
import heroImage from "@/assets/hero-library.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Premium library" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-primary font-body text-sm tracking-[0.2em] uppercase">
              Premium Reading Experience
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Indulge in</span>
            <br />
            <span className="text-gold-glow">Premium Content</span>
          </h1>

          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Access exclusive books, articles, breaking news, journals, stories, and celebrity biographies. 
            Curated for the discerning adult reader.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/subscribe">
              <Button variant="gold" size="lg" className="text-base px-8">
                <BookOpen className="w-5 h-5 mr-2" />
                Subscribe Now
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="gold-outline" size="lg" className="text-base px-8">
                Explore Categories
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-8 text-muted-foreground font-body text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold text-lg">50K+</span>
              <span>Articles</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold text-lg">10K+</span>
              <span>Books</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold text-lg">24/7</span>
              <span>Updates</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
