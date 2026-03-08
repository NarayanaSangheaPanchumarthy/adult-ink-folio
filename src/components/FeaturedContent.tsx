import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Loader2 } from "lucide-react";
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
    <section className="py-24 bg-surface-elevated">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
              Featured <span className="text-gold-glow">Reads</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Editor's picks for this week
            </p>
          </div>
          <Link to="/categories">
            <Button variant="gold-outline" size="sm" className="hidden md:flex">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && (!featured || featured.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">Featured content coming soon.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured?.map((item, i) => (
            <Link to={`/article/${item.id}`} key={item.id}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-card rounded-lg border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold tracking-wide uppercase">
                    {categoryLabels[item.category] || item.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-4 text-muted-foreground font-body text-xs">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.read_time}
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
