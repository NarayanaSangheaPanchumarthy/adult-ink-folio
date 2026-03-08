import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Trash2, Reply, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useComments, useAddComment, useDeleteComment } from "@/hooks/useComments";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const CommentsSection = ({ articleId }: { articleId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: comments, isLoading } = useComments(articleId);
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please log in to comment.", variant: "destructive" });
      return;
    }
    if (!newComment.trim()) return;
    addComment.mutate(
      { articleId, content: newComment },
      {
        onSuccess: () => setNewComment(""),
        onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleReply = (parentId: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please log in to reply.", variant: "destructive" });
      return;
    }
    if (!replyContent.trim()) return;
    addComment.mutate(
      { articleId, content: replyContent, parentId },
      {
        onSuccess: () => {
          setReplyContent("");
          setReplyTo(null);
        },
        onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const topLevel = (comments || []).filter((c) => !c.parent_id);
  const replies = (comments || []).filter((c) => c.parent_id);

  return (
    <div className="mt-12">
      <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-primary" />
        Comments ({comments?.length || 0})
      </h3>

      {/* New comment */}
      <div className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Share your thoughts..." : "Log in to comment"}
          rows={3}
          maxLength={2000}
          disabled={!user}
          className="bg-card border-border mb-3"
        />
        <Button
          onClick={handleSubmit}
          disabled={!newComment.trim() || addComment.isPending}
          variant="gold"
          size="sm"
        >
          <Send className="w-4 h-4 mr-1" />
          {addComment.isPending ? "Posting..." : "Post Comment"}
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground font-body">Loading comments...</p>}

      <AnimatePresence>
        {topLevel.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-gradient-card rounded-lg border border-border/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm font-semibold text-foreground">{comment.display_name}</span>
                  <span className="font-body text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                  >
                    <Reply className="w-4 h-4" />
                  </button>
                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => deleteComment.mutate({ commentId: comment.id, articleId })}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="font-body text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
            </div>

            {/* Replies */}
            {replies
              .filter((r) => r.parent_id === comment.id)
              .map((reply) => (
                <div key={reply.id} className="ml-8 mt-2 bg-card/50 rounded-lg border border-border/30 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs font-semibold text-foreground">{reply.display_name}</span>
                      <span className="font-body text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    {user?.id === reply.user_id && (
                      <button
                        onClick={() => deleteComment.mutate({ commentId: reply.id, articleId })}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="font-body text-xs text-foreground/80 leading-relaxed">{reply.content}</p>
                </div>
              ))}

            {/* Reply input */}
            {replyTo === comment.id && (
              <div className="ml-8 mt-2 flex gap-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  maxLength={2000}
                  className="bg-card border-border text-sm"
                />
                <Button
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyContent.trim()}
                  variant="gold"
                  size="sm"
                  className="self-end"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {!isLoading && topLevel.length === 0 && (
        <p className="text-muted-foreground font-body text-sm text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  );
};

export default CommentsSection;
