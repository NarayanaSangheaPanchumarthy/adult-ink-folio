import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    icon: Zap,
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gold-glow">Plan</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            Unlock the full reading experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-primary/50 shadow-gold bg-gradient-card"
                  : "border-border/50 bg-gradient-card hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-xs font-body font-bold text-primary-foreground tracking-wide uppercase">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-2 mb-6">
                <plan.icon className="w-5 h-5 text-primary" />
                <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                  {plan.name}
                </span>
              </div>

              <div className="mb-8">
                <span className="font-display text-5xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="font-body text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/subscribe">
                <Button
                  variant={plan.popular ? "gold" : "gold-outline"}
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
