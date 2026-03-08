import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Article = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  source: string;
  read_time: string;
  is_featured: boolean;
  is_published: boolean;
  user_id: string | null;
  image_url: string | null;
  external_url: string | null;
  created_at: string;
  updated_at: string;
};

export function useArticlesByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ["articles", "category", category],
    queryFn: async () => {
      if (!category) return [];
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("category", category)
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as Article[];
    },
    enabled: !!category,
  });
}

export function useFeaturedArticles() {
  return useQuery({
    queryKey: ["articles", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_featured", true)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return (data || []) as Article[];
    },
  });
}

export function useAllArticles() {
  return useQuery({
    queryKey: ["articles", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as Article[];
    },
  });
}
