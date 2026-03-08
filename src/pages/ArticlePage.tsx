import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import BookmarkButton from "@/components/BookmarkButton";
import CommentsSection from "@/components/CommentsSection";
import type { Article } from "@/hooks/useArticles";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as Article;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 text-center">
          <p className="text-destructive font-body text-lg">Article not found.</p>
          <Link to="/" className="text-primary font-body mt-4 inline-block">Go Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = article.content.split("\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to={`/category/${article.category}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {article.category}
            </Link>

            {/* Category badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold tracking-wide uppercase mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground font-body text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.read_time}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {format(new Date(article.created_at), "MMM d, yyyy")}
              </span>
            </div>

            {/* Rating & Bookmark */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
              <StarRating articleId={article.id} />
              <BookmarkButton articleId={article.id} />
            </div>

            {/* Excerpt */}
            <p className="font-body text-lg text-foreground/80 leading-relaxed mb-8 italic border-l-4 border-primary/30 pl-4">
              {article.excerpt}
            </p>

            {/* Content */}
            <div className="prose-custom">
              {paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base text-foreground/85 leading-[1.85] mb-6">
                  {p}
                </p>
              ))}
            </div>

            {/* Bottom rating */}
            <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground mb-2">Rate this article</p>
                <StarRating articleId={article.id} />
              </div>
              <BookmarkButton articleId={article.id} />
            </div>

            {/* Comments */}
            <CommentsSection articleId={article.id} />
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
