import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks, useToggleBookmark } from "@/hooks/useBookmarks";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const BookmarkButton = ({ articleId }: { articleId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: bookmarks } = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const isBookmarked = (bookmarks || []).includes(articleId);

  const handleToggle = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please log in to bookmark articles.", variant: "destructive" });
      return;
    }
    toggleBookmark.mutate({ articleId, isBookmarked });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={toggleBookmark.isPending}
      className="gap-2"
    >
      <Bookmark className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      <span className="font-body text-sm">{isBookmarked ? "Saved" : "Save"}</span>
    </Button>
  );
};

export default BookmarkButton;
