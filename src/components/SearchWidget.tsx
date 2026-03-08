import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/hooks/useArticles";

const categoryLabels: Record<string, string> = {
  books: "Books", news: "News", articles: "Articles",
  journals: "Journals", stories: "Stories", celebrities: "Celebrity Bios",
};

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
        .or(`title.ilike.${term},excerpt.ilike.${term},author.ilike.${term},content.ilike.${term}`)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data || []) as Article[];
    },
    enabled: debouncedQuery.trim().length >= 2,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
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
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && debouncedQuery.trim().length >= 2 && results && results.length === 0 && (
        <p className="text-center text-muted-foreground font-body text-sm py-8">
          No results for "{debouncedQuery}"
        </p>
      )}

      <AnimatePresence>
        {results && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-3"
          >
            <p className="text-muted-foreground font-body text-xs px-1">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            {results.map((item) => (
              <Link key={item.id} to={`/article/${item.id}`}>
                <div className="bg-gradient-card rounded-lg border border-border/50 p-4 hover:border-primary/30 transition-all duration-200 group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-body font-semibold tracking-wide uppercase">
                      {categoryLabels[item.category] || item.category}
                    </span>
                    {item.is_featured && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-body font-semibold">Featured</span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold group-hover:text-primary transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground font-body text-xs">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.read_time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function useDebounced(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  const { useEffect } = require("react");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default SearchPage;
