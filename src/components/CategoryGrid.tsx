import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Newspaper, FileText, ScrollText, Feather, Star, ArrowUpRight } from "lucide-react";

import booksImg from "@/assets/category-books.jpg";
import newsImg from "@/assets/category-news.jpg";
import articlesImg from "@/assets/category-articles.jpg";
import journalsImg from "@/assets/category-journals.jpg";
import storiesImg from "@/assets/category-stories.jpg";
import celebritiesImg from "@/assets/category-celebrities.jpg";

const categories = [
  { title: "Books", description: "Curated adult literature & publications", icon: BookOpen, image: booksImg, slug: "books", count: "10K+" },
  { title: "News", description: "Breaking stories & real-time updates", icon: Newspaper, image: newsImg, slug: "news", count: "Live" },
  { title: "Articles", description: "In-depth analysis & editorial pieces", icon: FileText, image: articlesImg, slug: "articles", count: "50K+" },
  { title: "Journals", description: "Academic & professional publications", icon: ScrollText, image: journalsImg, slug: "journals", count: "2K+" },
  { title: "Stories", description: "Captivating narratives & fiction", icon: Feather, image: storiesImg, slug: "stories", count: "5K+" },
  { title: "Celebrity Bios", description: "Actor & actress life stories", icon: Star, image: celebritiesImg, slug: "celebrities", count: "1K+" },
];

const CategoryGrid = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[400px] h-[400px] bg-radial-gold blur-3xl opacity-40" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-xl">
            <span className="inline-block font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
              — The Collection
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              A library for every <span className="text-gold-shine">mood</span>.
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-lg max-w-sm md:text-right">
            Six finely-curated worlds. Step inside any door and discover a reading
            experience tailored to the moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative block h-80 rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 shadow-card hover:shadow-gold-lg transition-all duration-700 ease-premium"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />

                {/* Top row: count badge */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border/60 font-body text-[10px] tracking-widest uppercase text-foreground/80">
                    {cat.count}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/60 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-gold group-hover:border-transparent">
                    <ArrowUpRight className="w-4 h-4 text-foreground/80 group-hover:text-primary-foreground transition-colors" />
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2.5 mb-2">
                    <cat.icon className="w-4 h-4 text-primary" />
                    <span className="font-body text-[11px] tracking-[0.2em] uppercase text-primary/90">
                      Category
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
