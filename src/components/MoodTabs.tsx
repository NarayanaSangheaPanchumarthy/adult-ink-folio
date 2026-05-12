import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Newspaper, FileText, ScrollText, Feather, Star, ArrowUpRight, Sparkles } from "lucide-react";

import booksImg from "@/assets/category-books.jpg";
import newsImg from "@/assets/category-news.jpg";
import articlesImg from "@/assets/category-articles.jpg";
import journalsImg from "@/assets/category-journals.jpg";
import storiesImg from "@/assets/category-stories.jpg";
import celebritiesImg from "@/assets/category-celebrities.jpg";

type Mood = {
  title: string;
  description: string;
  icon: typeof BookOpen;
  image: string;
  slug: string;
  count: string;
  tags: string[];
};

const moods: Mood[] = [
  { title: "Books", description: "Timeless classics and modern masterpieces", icon: BookOpen, image: booksImg, slug: "books", count: "10K+", tags: ["all", "books"] },
  { title: "Articles", description: "In-depth stories and perspectives", icon: FileText, image: articlesImg, slug: "articles", count: "50K+", tags: ["all", "articles"] },
  { title: "Journals", description: "Personal growth and reflection", icon: ScrollText, image: journalsImg, slug: "journals", count: "2K+", tags: ["all", "journals"] },
  { title: "Stories", description: "Short reads that stay with you", icon: Feather, image: storiesImg, slug: "stories", count: "5K+", tags: ["all", "stories"] },
  { title: "News", description: "Quality journalism, curated daily", icon: Newspaper, image: newsImg, slug: "news", count: "Live", tags: ["all", "news"] },
  { title: "Celebrity Bios", description: "Lessons from extraordinary lives", icon: Star, image: celebritiesImg, slug: "celebrities", count: "1K+", tags: ["all", "bios"] },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "books", label: "Books" },
  { id: "articles", label: "Articles" },
  { id: "journals", label: "Journals" },
  { id: "stories", label: "Stories" },
  { id: "news", label: "News" },
  { id: "bios", label: "Bios" },
];

const MoodTabs = () => {
  const [active, setActive] = useState("all");
  const visible = moods.filter((m) => m.tags.includes(active));

  return (
    <section className="relative py-28 bg-background overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[400px] h-[400px] bg-radial-gold blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-0 -right-40 w-[400px] h-[400px] bg-radial-gold blur-3xl opacity-30" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 font-body text-xs tracking-[0.22em] uppercase text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Pick Your Interest
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            What are you in the <span className="text-gold-shine">mood</span> for?
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-5">
            Switch between worlds. Find the read that fits the moment.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full border border-border/60 bg-surface-elevated/60 backdrop-blur-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative px-5 py-2 rounded-full font-body text-sm tracking-wide transition-colors ${
                  active === t.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="mood-pill"
                    className="absolute inset-0 rounded-full bg-gradient-gold shadow-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group relative block h-64 rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 shadow-card hover:shadow-gold-lg transition-all duration-700 ease-premium"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border/60 font-body text-[10px] tracking-widest uppercase text-foreground/80">
                      {cat.count}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/60 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-gold group-hover:border-transparent">
                      <ArrowUpRight className="w-4 h-4 text-foreground/80 group-hover:text-primary-foreground transition-colors" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <cat.icon className="w-4 h-4 text-primary" />
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/90">
                        Category
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MoodTabs;
