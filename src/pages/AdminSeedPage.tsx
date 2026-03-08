import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminSeedPage = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<{ category: string; count: number }[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { count: 6 },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: "Content generated!",
        description: `${data.count} articles created across all categories.`,
      });

      setResults([{ category: "All categories", count: data.count }]);
    } catch (err: any) {
      toast({
        title: "Generation failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl font-bold mb-4">Generate Content</h1>
            <p className="text-muted-foreground font-body text-lg mb-10">
              Use AI to populate all categories with realistic, high-quality articles.
            </p>

            <Button
              variant="gold"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mb-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating content...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate All Content
                </>
              )}
            </Button>

            {isGenerating && (
              <p className="text-muted-foreground font-body text-sm animate-pulse">
                This may take 30-60 seconds as AI generates content for all 6 categories...
              </p>
            )}

            {results.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 text-primary font-body">
                    <CheckCircle className="w-5 h-5" />
                    <span>{r.category}: {r.count} articles created</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSeedPage;
