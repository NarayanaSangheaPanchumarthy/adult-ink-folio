import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    icon: Zap,
    tagline: "Perfect for casual readers.",
    features: [
      "Unlimited article access",
      "All 6 content categories",
      "Real-time news updates",
      "Bookmark & reading lists",
    ],
    popular: false,
  },
  {
    name: "Annual",
    price: "$79.99",
    period: "/year",
    icon: Crown,
    tagline: "Best value — save 33%.",
    features: [
      "Everything in Monthly",
      "Save 33% annually",
      "Early access to new content",
      "Exclusive celebrity interviews",
      "Premium journal archives",
    ],
    popular: true,
  },
];

const PricingSection = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial-gold blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
            — Membership
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Choose how you <span className="text-gold-shine">indulge</span>.
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Two plans, one library. Cancel anytime — your bookmarks stay forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-9 border transition-all duration-500 ease-premium overflow-hidden ${
                plan.popular
                  ? "border-primary/40 shadow-gold-lg bg-gradient-card"
                  : "border-border/60 bg-gradient-card hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-[10px] font-body font-bold text-primary-foreground tracking-[0.2em] uppercase shadow-gold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 mb-6">
                <span className={`flex items-center justify-center w-9 h-9 rounded-full ${plan.popular ? 'bg-gradient-gold' : 'bg-primary/10 border border-primary/20'}`}>
                  <plan.icon className={`w-4 h-4 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                </span>
                <span className="font-body text-xs text-muted-foreground uppercase tracking-[0.22em]">
                  {plan.name}
                </span>
              </div>

              <p className="font-display italic text-muted-foreground mb-6">{plan.tagline}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-display text-6xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="font-body text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3.5 mb-9">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-sm text-foreground/80">
                    <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/subscribe">
                <Button
                  variant={plan.popular ? "gold" : "gold-outline"}
                  className="w-full h-12"
                  size="lg"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-body text-xs text-muted-foreground mt-10 tracking-wider">
          7-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
