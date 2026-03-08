import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featured = [
  {
    title: "The Untold Story of Hollywood's Golden Era",
    category: "Celebrity Bios",
    author: "Sarah Mitchell",
    readTime: "12 min",
    excerpt: "A deep dive into the lives of the most iconic actors and actresses who shaped cinema history.",
  },
  {
    title: "Global Markets in Flux: What's Next?",
    category: "News",
    author: "James Chen",
    readTime: "8 min",
    excerpt: "Breaking analysis of the shifting economic landscape and its impact on global readers.",
  },
  {
    title: "Modern Literature's Bold New Voices",
    category: "Books",
    author: "Elena Rodriguez",
    readTime: "15 min",
    excerpt: "Exploring the emerging authors redefining contemporary adult fiction and storytelling.",
  },
  {
    title: "The Science of Human Connection",
    category: "Journals",
    author: "Dr. Amanda Foster",
    readTime: "20 min",
    excerpt: "Peer-reviewed research on interpersonal relationships and emotional intelligence.",
  },
];

const FeaturedContent = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-gradient-card rounded-lg border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold tracking-wide uppercase">
                  {item.category}
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
                  <Clock className="w-3 h-3" /> {item.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
