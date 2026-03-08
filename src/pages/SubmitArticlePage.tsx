import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const categories = [
  { value: "books", label: "Books" },
  { value: "news", label: "News" },
  { value: "articles", label: "Articles" },
  { value: "journals", label: "Journals" },
  { value: "stories", label: "Stories" },
  { value: "celebrities", label: "Celebrity Bios" },
];

const SubmitArticlePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    excerpt: "",
    content: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content || !form.category) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-article", {
        body: form,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "Article submitted!", description: "Your article is now live." });
      navigate(`/category/${form.category}`);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="font-display text-4xl font-bold mb-2">Submit an Article</h1>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Share your writing with the community
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Your article title"
                  maxLength={200}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Author Name</label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Your name (optional)"
                  maxLength={100}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Category *</label>
                <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Excerpt *</label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A brief summary (2-3 sentences)"
                  maxLength={500}
                  rows={3}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">Content *</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your full article here..."
                  rows={12}
                  className="bg-card border-border"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Article"}
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitArticlePage;
