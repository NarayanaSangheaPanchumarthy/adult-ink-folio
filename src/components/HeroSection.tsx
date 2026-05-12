import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, ArrowRight, Star, BookOpen, Newspaper, Clock, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-library.jpg";
import { Link } from "react-router-dom";

const stats = [
  { icon: BookOpen, num: "50K+", label: "Books & Articles" },
  { icon: Newspaper, num: "10K+", label: "Premium Reads" },
  { icon: Clock, num: "24/7", label: "Read Anywhere" },
  { icon: ShieldCheck, num: "No Ads", label: "Pure Experience" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden grain">
      {/* Hero block */}
      <div className="relative min-h-[78vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium library reading room"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* Decorative gold orbs */}
        <div className="pointer-events-none absolute -top-40 -right-32 w-[480px] h-[480px] bg-radial-gold blur-2xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[360px] h-[360px] bg-radial-gold blur-3xl opacity-60" />

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-8 pl-1.5 pr-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-gold">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </span>
              <span className="font-body text-xs tracking-[0.18em] uppercase text-foreground/80">
                Curated for the Curious
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-7">
              <span className="text-foreground">Where stories</span>
              <br />
              <span className="text-gold-shine">live in luxury.</span>
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              A private library of timeless books, powerful ideas and endless inspiration —
              all in one place, crafted for readers who value depth and design.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/subscribe">
                <Button variant="gold" size="lg" className="text-base px-8 h-12 shadow-gold-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Start Reading
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="gold-outline" size="lg" className="text-base px-8 h-12 group">
                  Explore Library
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-secondary"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                  <span className="ml-1.5 font-body text-xs text-foreground/90 font-semibold">4.9</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  Loved by 25,000+ readers worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* Inline stat strip */}
      <div className="relative z-10 container mx-auto px-6 -mt-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="rounded-2xl border border-primary/20 bg-gradient-card backdrop-blur-md shadow-elevated overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/50">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 px-6 py-6 group hover:bg-primary/5 transition-colors"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-gradient-gold group-hover:border-transparent transition-all">
                  <s.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </span>
                <div>
                  <div className="font-display text-2xl font-bold text-gold-shine leading-none mb-1">
                    {s.num}
                  </div>
                  <div className="font-body text-xs tracking-wide text-muted-foreground uppercase">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
