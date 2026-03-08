import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useArticlesByCategory } from "@/hooks/useArticles";

const categoryTitles: Record<string, string> = {
  books: "Books",
  news: "News",
  articles: "Articles",
  journals: "Journals",
  stories: "Stories",
  celebrities: "Celebrity Bios",
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: articles, isLoading, error } = useArticlesByCategory(slug);
  const title = categoryTitles[slug || ""] || "Category";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground font-body text-lg mb-12">
              {isLoading ? "Loading..." : `${articles?.length || 0} articles available`}
            </p>

            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <p className="text-destructive font-body">Failed to load articles. Please try again.</p>
              </div>
            )}

            {!isLoading && articles && articles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-body text-lg">No articles yet in this category.</p>
                <p className="text-muted-foreground font-body text-sm mt-2">Content is being generated — check back soon!</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles?.map((item, i) => (
                <Link to={`/article/${item.id}`} key={item.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-gradient-card rounded-lg border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 h-full"
                  >
                    {item.source !== "ai" && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3 capitalize">
                        {item.source === "user" ? "Community" : item.source === "news_api" ? "Live" : item.source}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground font-body text-xs">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.read_time}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-xl border border-primary/20 bg-gradient-card">
                <Lock className="w-8 h-8 text-primary" />
                <p className="font-display text-xl font-semibold">Subscribe to unlock all content</p>
                <p className="font-body text-sm text-muted-foreground">Full access to every article, book, and story</p>
                <Link to="/subscribe">
                  <Button variant="gold" size="lg">Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
