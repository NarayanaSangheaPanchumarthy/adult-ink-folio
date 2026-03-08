import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockContent: Record<string, { title: string; items: { title: string; author: string; readTime: string; excerpt: string }[] }> = {
  books: {
    title: "Books",
    items: [
      { title: "Midnight Chronicles", author: "Victoria Lane", readTime: "45 min", excerpt: "A gripping tale of passion and intrigue set in 1920s Paris." },
      { title: "The Last Confession", author: "Marcus Webb", readTime: "30 min", excerpt: "An unflinching memoir of life's most intimate moments." },
      { title: "Silk & Shadow", author: "Aria Chen", readTime: "50 min", excerpt: "Where elegance meets danger in the world of haute couture." },
      { title: "Burning Daylight", author: "Leo Hart", readTime: "35 min", excerpt: "A modern love story that challenges every convention." },
      { title: "The Art of Seduction", author: "Nina Blake", readTime: "40 min", excerpt: "Exploring the psychology behind human attraction." },
      { title: "Crimson Letters", author: "David Russo", readTime: "25 min", excerpt: "A collection of passionate correspondence spanning decades." },
    ],
  },
  news: {
    title: "News",
    items: [
      { title: "Entertainment Industry Shifts in 2026", author: "James Chen", readTime: "5 min", excerpt: "How streaming platforms are reshaping adult content distribution." },
      { title: "Celebrity Power Couples: Behind the Headlines", author: "Lisa Park", readTime: "8 min", excerpt: "Exclusive insights into Hollywood's most talked-about relationships." },
      { title: "Global Publishing Trends Report", author: "Michael Torres", readTime: "10 min", excerpt: "The rise of premium digital reading platforms worldwide." },
      { title: "Awards Season Preview", author: "Sarah Kim", readTime: "6 min", excerpt: "Who's leading the race for this year's biggest entertainment awards." },
    ],
  },
  articles: {
    title: "Articles",
    items: [
      { title: "The Renaissance of Adult Literature", author: "Dr. Emma Walsh", readTime: "15 min", excerpt: "How contemporary writers are redefining mature storytelling." },
      { title: "Psychology of Desire", author: "Prof. Alan Marks", readTime: "20 min", excerpt: "A scientific exploration of human passion and connection." },
      { title: "Digital Age Intimacy", author: "Rebecca Stone", readTime: "12 min", excerpt: "Navigating relationships in the modern connected world." },
    ],
  },
  journals: {
    title: "Journals",
    items: [
      { title: "Journal of Contemporary Relationships", author: "Editorial Board", readTime: "25 min", excerpt: "Peer-reviewed research on modern partnerships." },
      { title: "Cultural Studies Quarterly", author: "Various Authors", readTime: "30 min", excerpt: "Exploring societal norms and evolving perspectives." },
    ],
  },
  stories: {
    title: "Stories",
    items: [
      { title: "A Night in Venice", author: "Isabella Moretti", readTime: "18 min", excerpt: "Under the Venetian moonlight, two strangers find an unexpected connection." },
      { title: "The Photographer's Muse", author: "Kai Nakamura", readTime: "22 min", excerpt: "Art and passion collide in a bohemian studio in Brooklyn." },
      { title: "Letters Never Sent", author: "Charlotte Rivers", readTime: "14 min", excerpt: "Decades of unspoken words finally find their way to light." },
      { title: "The Wine Merchant's Daughter", author: "Pierre Dubois", readTime: "20 min", excerpt: "A tale of ambition and desire in the vineyards of Bordeaux." },
    ],
  },
  celebrities: {
    title: "Celebrity Bios",
    items: [
      { title: "The Real Story Behind the Screen", author: "Entertainment Desk", readTime: "15 min", excerpt: "Uncovering the private lives of this generation's biggest stars." },
      { title: "From Stage to Stardom", author: "Biographies Team", readTime: "20 min", excerpt: "How theater actors made the leap to Hollywood fame." },
      { title: "Icons of the Silver Screen", author: "Legacy Writers", readTime: "25 min", excerpt: "Profiles of the actors and actresses who defined an era." },
    ],
  },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = mockContent[slug || ""] || { title: "Category", items: [] };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              {content.title}
            </h1>
            <p className="text-muted-foreground font-body text-lg mb-12">
              {content.items.length} articles available
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.items.map((item, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-gradient-card rounded-lg border border-border/50 p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground font-body text-xs">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.readTime}
                      </span>
                    </div>
                    <Lock className="w-4 h-4 text-primary/50" />
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-xl border border-primary/20 bg-gradient-card">
                <Lock className="w-8 h-8 text-primary" />
                <p className="font-display text-xl font-semibold">Subscribe to unlock all content</p>
                <p className="font-body text-sm text-muted-foreground">Full access to every article, book, and story</p>
                <Link to="/subscribe">
                  <Button variant="gold" size="lg">Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
