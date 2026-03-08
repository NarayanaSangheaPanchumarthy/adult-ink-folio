import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, User, Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/hooks/useArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryLabels: Record<string, string> = {
  books: "Books", news: "News", articles: "Articles",
  journals: "Journals", stories: "Stories", celebrities: "Celebrity Bios",
};

function useDebounced(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 300);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      const term = `%${debouncedQuery.trim()}%`;
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .or(`title.ilike.${term},excerpt.ilike.${term},author.ilike.${term}`)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data || []) as Article[];
    },
    enabled: debouncedQuery.trim().length >= 2,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
              <Search className="inline w-8 h-8 text-primary mr-2" />Search
            </h1>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, authors, topics..."
                className="pl-12 pr-10 h-12 bg-card border-border text-base font-body"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isLoading && debouncedQuery.trim().length >= 2 && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && debouncedQuery.trim().length >= 2 && results && results.length === 0 && (
              <p className="text-center text-muted-foreground font-body py-12">
                No results for "<span className="text-foreground">{debouncedQuery}</span>"
              </p>
            )}

            {debouncedQuery.trim().length < 2 && !results && (
              <p className="text-center text-muted-foreground font-body text-sm py-12">
                Type at least 2 characters to search
              </p>
            )}

            <AnimatePresence>
              {results && results.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <p className="text-muted-foreground font-body text-xs mb-4">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link to={`/article/${item.id}`}>
                        <div className="bg-gradient-card rounded-lg border border-border/50 p-5 hover:border-primary/30 transition-all duration-200 group">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-body font-semibold tracking-wide uppercase">
                              {categoryLabels[item.category] || item.category}
                            </span>
                            {item.is_featured && (
                              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-body font-semibold">Featured</span>
                            )}
                          </div>
                          <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                            {item.title}
                          </h3>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-muted-foreground font-body text-xs">
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.author}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.read_time}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
