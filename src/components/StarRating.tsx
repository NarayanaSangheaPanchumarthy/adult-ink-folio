import { useState } from "react";
import { Star } from "lucide-react";
import { useArticleRating, useUserRating, useSetRating } from "@/hooks/useRatings";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const StarRating = ({ articleId }: { articleId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: ratingData } = useArticleRating(articleId);
  const { data: userRating } = useUserRating(articleId);
  const setRating = useSetRating();
  const [hovered, setHovered] = useState(0);

  const handleRate = (rating: number) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please log in to rate articles.", variant: "destructive" });
      return;
    }
    setRating.mutate({ articleId, rating });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHovered(star)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                (hovered || userRating || 0) >= star
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
      {ratingData && ratingData.count > 0 && (
        <span className="font-body text-sm text-muted-foreground">
          {ratingData.average} ({ratingData.count})
        </span>
      )}
    </div>
  );
};

export default StarRating;
