import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookmarks")
        .select("article_id")
        .eq("user_id", user.id);
      if (error) throw error;
      return (data || []).map((b: any) => b.article_id as string);
    },
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleId, isBookmarked }: { articleId: string; isBookmarked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      if (isBookmarked) {
        const { error } = await supabase.from("bookmarks").delete().eq("article_id", articleId).eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("bookmarks").insert({ article_id: articleId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}
