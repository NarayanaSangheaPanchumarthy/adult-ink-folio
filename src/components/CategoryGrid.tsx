import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Newspaper, FileText, ScrollText, Feather, Star } from "lucide-react";

import booksImg from "@/assets/category-books.jpg";
import newsImg from "@/assets/category-news.jpg";
import articlesImg from "@/assets/category-articles.jpg";
import journalsImg from "@/assets/category-journals.jpg";
import storiesImg from "@/assets/category-stories.jpg";
import celebritiesImg from "@/assets/category-celebrities.jpg";

const categories = [
  { title: "Books", description: "Curated adult literature & publications", icon: BookOpen, image: booksImg, slug: "books" },
  { title: "News", description: "Breaking stories & real-time updates", icon: Newspaper, image: newsImg, slug: "news" },
  { title: "Articles", description: "In-depth analysis & editorial pieces", icon: FileText, image: articlesImg, slug: "articles" },
  { title: "Journals", description: "Academic & professional publications", icon: ScrollText, image: journalsImg, slug: "journals" },
  { title: "Stories", description: "Captivating narratives & fiction", icon: Feather, image: storiesImg, slug: "stories" },
  { title: "Celebrity Bios", description: "Actor & actress life stories", icon: Star, image: celebritiesImg, slug: "celebrities" },
];

const CategoryGrid = () => {
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
            Browse by <span className="text-gold-glow">Category</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            Discover content tailored to your interests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative block h-72 rounded-lg overflow-hidden shadow-card border border-border/50 hover:border-primary/30 transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <cat.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
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
