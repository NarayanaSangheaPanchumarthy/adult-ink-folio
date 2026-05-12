import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Crown, Sparkles, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-library.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[78vh] flex items-center overflow-hidden grain">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium library reading room"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      </div>

      {/* Decorative gold orbs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[480px] h-[480px] bg-radial-gold blur-2xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[360px] h-[360px] bg-radial-gold blur-3xl opacity-60" />

      {/* Faint vertical rule */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 max-w-2xl"
        >
          {/* Eyebrow badge */}
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
              The Premium Reading Experience
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-7">
            <span className="text-foreground">Where stories</span>
            <br />
            <span className="text-gold-shine">live in luxury.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
            A curated home for books, journalism, journals, fiction and biographies —
            crafted for readers who appreciate depth, design and discernment.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
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

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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
                Loved by 25,000+ discerning readers
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side stat card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-radial-gold blur-2xl opacity-70" />
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-card backdrop-blur-md p-8 shadow-elevated">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-display text-sm tracking-wider uppercase text-muted-foreground">
                  Library at a glance
                </span>
              </div>

              <div className="space-y-6">
                {[
                  { num: "50K+", label: "Editorial articles", note: "Refreshed daily" },
                  { num: "10K+", label: "Premium books", note: "Across 6 categories" },
                  { num: "24/7", label: "Real-time updates", note: "News & journals" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="font-body text-sm text-foreground font-medium">{s.label}</div>
                      <div className="font-body text-xs text-muted-foreground">{s.note}</div>
                    </div>
                    <div className="font-display text-3xl font-bold text-gold-shine">
                      {s.num}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="font-display italic text-sm text-muted-foreground leading-relaxed">
                  "A reading sanctuary that finally treats long-form like the art it is."
                </p>
                <p className="mt-2 font-body text-xs text-primary tracking-wide uppercase">
                  — The Editorial Quarterly
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
