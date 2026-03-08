import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useArticleRating(articleId: string) {
  return useQuery({
    queryKey: ["ratings", articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ratings")
        .select("rating")
        .eq("article_id", articleId);
      if (error) throw error;
      const ratings = data || [];
      const avg = ratings.length > 0 ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / ratings.length : 0;
      return { average: Math.round(avg * 10) / 10, count: ratings.length };
    },
    enabled: !!articleId,
  });
}

export function useUserRating(articleId: string) {
  return useQuery({
    queryKey: ["ratings", articleId, "user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from("ratings")
        .select("rating")
        .eq("article_id", articleId)
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data?.rating || null;
    },
    enabled: !!articleId,
  });
}

export function useSetRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleId, rating }: { articleId: string; rating: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("ratings")
        .upsert({ article_id: articleId, user_id: user.id, rating }, { onConflict: "article_id,user_id" });
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["ratings", vars.articleId] });
    },
  });
}
