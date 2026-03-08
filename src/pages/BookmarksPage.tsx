import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, ArrowLeft, Clock, User, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useBookmarks, useToggleBookmark } from "@/hooks/useBookmarks";
import type { Article } from "@/hooks/useArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BookmarksPage = () => {
  const { data: bookmarkIds, isLoading: loadingIds } = useBookmarks();
  const toggleBookmark = useToggleBookmark();

  const { data: articles, isLoading: loadingArticles } = useQuery({
    queryKey: ["bookmarked-articles", bookmarkIds],
    queryFn: async () => {
      if (!bookmarkIds || bookmarkIds.length === 0) return [];
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .in("id", bookmarkIds)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as Article[];
    },
    enabled: !!bookmarkIds,
  });

  const isLoading = loadingIds || loadingArticles;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl font-bold">My Bookmarks</h1>
            </div>
            <p className="text-muted-foreground font-body text-lg mb-12">
              {isLoading ? "Loading..." : `${articles?.length || 0} saved articles`}
            </p>

            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && (!articles || articles.length === 0) && (
              <div className="text-center py-20">
                <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-body text-lg">No bookmarks yet.</p>
                <p className="text-muted-foreground font-body text-sm mt-2">Browse articles and click the bookmark icon to save them here.</p>
                <Link to="/categories">
                  <Button variant="gold" size="lg" className="mt-6">Browse Categories</Button>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles?.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative"
                >
                  <Link to={`/article/${item.id}`} className="block">
                    <div className="bg-gradient-card rounded-lg border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 h-full">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold tracking-wide uppercase mb-3">
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-muted-foreground font-body text-xs">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.read_time}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleBookmark.mutate({ articleId: item.id, isBookmarked: true })}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-background/80 hover:bg-destructive/20 transition-colors"
                    title="Remove bookmark"
                  >
                    <Bookmark className="w-4 h-4 fill-primary text-primary" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookmarksPage;
