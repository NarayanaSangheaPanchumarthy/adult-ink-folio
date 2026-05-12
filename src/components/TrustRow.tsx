import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  Award,
  Globe,
  Feather,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  Newspaper,
  BookOpen,
  Award,
  Globe,
  Feather,
  Crown,
};

type Partner = { id: string; name: string; icon_name: string };

const TrustRow = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("trust_partners")
        .select("id, name, icon_name")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      setPartners(data ?? []);
    })();
  }, []);

  return (
    <section className="relative py-16 bg-background border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10"
        >
          — Featured & trusted by —
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 items-center">
          {partners.map((logo, i) => {
            const Icon = iconMap[logo.icon_name] ?? Award;
            return (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-center gap-2.5 text-muted-foreground/70 hover:text-primary transition-colors duration-500 grayscale hover:grayscale-0"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-display text-sm tracking-wide whitespace-nowrap">
                  {logo.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustRow;
