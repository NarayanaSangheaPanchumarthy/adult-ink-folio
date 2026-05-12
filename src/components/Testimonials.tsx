import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, name, title, quote, rating")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      setTestimonials(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="relative py-28 bg-surface-elevated overflow-hidden grain">
      <div className="pointer-events-none absolute -top-20 left-1/4 w-[500px] h-[500px] bg-radial-gold blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-radial-gold blur-3xl opacity-30" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
            — Reader Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Loved by readers who <span className="text-gold-shine">notice the details</span>.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-body text-sm text-foreground/90 font-semibold">4.9 / 5</span>
            <span className="font-body text-sm text-muted-foreground">· 2,400+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))
            : testimonials.map((t, i) => (
                <motion.figure
                  key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-2xl bg-gradient-card border border-border/60 hover:border-primary/40 p-8 shadow-card hover:shadow-gold-lg transition-all duration-500 ease-premium"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/15 group-hover:text-primary/40 transition-colors" />

                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>

                  <blockquote className="font-display text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
                    "{t.quote}"
                  </blockquote>

                  <figcaption className="flex items-center gap-3 pt-5 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary border border-primary/20 flex items-center justify-center font-display text-primary-foreground font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="font-body text-xs text-muted-foreground">{t.title}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
