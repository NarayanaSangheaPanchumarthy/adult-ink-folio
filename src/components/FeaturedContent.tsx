import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Loader2, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFeaturedArticles } from "@/hooks/useArticles";

const FeaturedContent = () => {
  const { data: featured, isLoading } = useFeaturedArticles();

  const categoryLabels: Record<string, string> = {
    books: "Books",
    news: "News",
    articles: "Articles",
    journals: "Journals",
    stories: "Stories",
    celebrities: "Celebrity Bios",
  };

  return (
    <section className="relative py-28 bg-surface-elevated overflow-hidden grain">
      <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] bg-radial-gold blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
              — Editor's Selection
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              This week's <span className="text-gold-shine">essential</span> reads.
            </h2>
          </div>
          <Link to="/categories">
            <Button variant="gold-outline" size="lg" className="group">
              View entire collection
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && (!featured || featured.length === 0) && (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border/60 bg-background/40">
            <BookMarked className="w-10 h-10 text-primary/60 mx-auto mb-3" />
            <p className="text-muted-foreground font-body">Featured content coming soon.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured?.map((item, i) => (
            <Link to={`/article/${item.id}`} key={item.id} className="block h-full">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full bg-gradient-card rounded-2xl border border-border/60 p-7 hover:border-primary/40 hover:-translate-y-1 hover:shadow-gold-lg transition-all duration-500 ease-premium overflow-hidden"
              >
                {/* Top hairline */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-body font-semibold tracking-[0.18em] uppercase">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/60 -rotate-45 group-hover:rotate-0 group-hover:text-primary transition-all duration-500" />
                </div>

                <h3 className="font-display text-2xl font-semibold leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-3">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-4 text-muted-foreground font-body text-xs pt-5 border-t border-border/50">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary/70" /> {item.author}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary/70" /> {item.read_time}
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
