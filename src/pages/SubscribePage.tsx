import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  Crown,
  Zap,
  Sparkles,
  BookOpen,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const valueProps = [
  {
    icon: BookOpen,
    label: "Unlimited Reading",
    desc: "Every article, journal & story",
  },
  {
    icon: Shield,
    label: "Ad-Free Experience",
    desc: "Zero interruptions, pure focus",
  },
  {
    icon: Clock,
    label: "Fresh Daily Content",
    desc: "New articles added every day",
  },
  {
    icon: Users,
    label: "Community Access",
    desc: "Submit & engage with readers",
  },
];

const SubscribePage = () => {
  const { toast } = useToast();

  const handleSelectPlan = (planName: string) => {
    toast({
      title: `${planName} plan selected`,
      description: "Checkout coming soon — stay tuned!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-gold blur-3xl opacity-40" />
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="inline-block font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
                — Subscribe
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                Unlock the full{" "}
                <span className="text-gold-shine">library</span>.
              </h1>
              <p className="text-muted-foreground font-body text-lg md:text-xl">
                One subscription. Every story. No limits.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Value Summary */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {valueProps.map((prop) => (
                <div
                  key={prop.label}
                  className="flex flex-col items-center text-center p-5 rounded-xl bg-gradient-card border border-border/40"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 mb-3">
                    <prop.icon className="w-4 h-4 text-primary" />
                  </span>
                  <span className="font-display text-sm font-semibold text-foreground">
                    {prop.label}
                  </span>
                  <span className="font-body text-xs text-muted-foreground mt-1">
                    {prop.desc}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="relative pb-28 overflow-hidden">
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial-gold blur-3xl opacity-40" />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14 max-w-xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
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
                  transition={{
                    delay: i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full ${
                        plan.popular
                          ? "bg-gradient-gold"
                          : "bg-primary/10 border border-primary/20"
                      }`}
                    >
                      <plan.icon
                        className={`w-4 h-4 ${
                          plan.popular ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </span>
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-[0.22em]">
                      {plan.name}
                    </span>
                  </div>

                  <p className="font-display italic text-muted-foreground mb-6">
                    {plan.tagline}
                  </p>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="font-display text-6xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="font-body text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-9">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 font-body text-sm text-foreground/80"
                      >
                        <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "gold" : "gold-outline"}
                    className="w-full h-12"
                    size="lg"
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    Select Plan
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center font-body text-xs text-muted-foreground mt-10 tracking-wider"
            >
              7-day free trial · No credit card required · Cancel anytime
            </motion.p>
          </div>
        </section>

        {/* Bottom Trust / Guarantee */}
        <section className="pb-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-14"
            >
              <div className="flex justify-center mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">
                Risk-free reading
              </h3>
              <p className="text-muted-foreground font-body text-base max-w-md mx-auto mb-8">
                Not satisfied? Get a full refund within 7 days, no questions asked.
                Your data and bookmarks are always yours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/">
                  <Button variant="gold-outline" size="lg">
                    Explore Content First
                  </Button>
                </Link>
                <Link to="/help-center">
                  <Button variant="ghost" size="lg">
                    Visit Help Center
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubscribePage;
