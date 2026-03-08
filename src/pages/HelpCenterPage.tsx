import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, BookOpen, Search, Star, MessageCircle, Bookmark, PenSquare, Send, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const guides = [
  { icon: BookOpen, title: "Browse Content", description: "Explore 6 categories: Books, News, Articles, Journals, Stories, and Celebrity Bios. Click any category to see all available content." },
  { icon: Search, title: "Search Articles", description: "Use the search icon in the navbar to find articles by title, author, or topic across all categories." },
  { icon: Star, title: "Rate & Review", description: "Rate articles 1-5 stars and leave comments. Your ratings help others discover great content." },
  { icon: Bookmark, title: "Save for Later", description: "Bookmark articles to build your personal reading list. Access saved articles from 'Saved' in the navbar." },
  { icon: PenSquare, title: "Submit Content", description: "Share your own writing! Click 'Submit' in the navbar to publish articles to any category." },
  { icon: MessageCircle, title: "AI Assistant", description: "Click the chat bubble in the bottom-right corner anytime for instant help, recommendations, or general questions." },
];

const faqs = [
  { q: "How do I subscribe?", a: "Visit the Pricing page from the navbar and choose between our Monthly or Annual plans. Both give you full access to all content." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from your Profile page. Your access continues until the end of your billing period." },
  { q: "How do I submit an article?", a: "Log in to your account, then click 'Submit' in the navbar. Fill in the title, category, excerpt, and full content, then publish." },
  { q: "Are my bookmarks private?", a: "Yes, your bookmarks are completely private. Only you can see your saved articles." },
  { q: "How do I change my display name?", a: "Go to your Profile page and update your display name in the Profile Settings section." },
  { q: "Can I delete my comments?", a: "Yes, you can delete any comment you've posted by clicking the trash icon on your comment." },
  { q: "What categories are available?", a: "We offer 6 categories: Books, News, Articles, Journals, Stories, and Celebrity Bios — with new content added regularly." },
  { q: "How does the AI chat work?", a: "Our AI assistant can help you navigate the platform, recommend content, answer questions about your account, or just chat. Click the chat bubble in the bottom-right corner." },
];

const HelpCenterPage = () => {
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-support", { body: contactForm });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: "Message sent!", description: data.message || "We'll get back to you soon." });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      toast({ title: "Failed to send", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl font-bold">Help Center</h1>
            </div>
            <p className="text-muted-foreground font-body text-lg mb-12">Everything you need to get the most out of LuxeRead</p>

            {/* Getting Started Guides */}
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6">Getting Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-gradient-card rounded-lg border border-border/50 p-5 hover:border-primary/30 transition-all"
                  >
                    <guide.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="font-display text-base font-semibold mb-2">{guide.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-gradient-card rounded-lg border border-border/50 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-body text-sm font-medium text-foreground">{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-4 pb-4"
                      >
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="font-display text-2xl font-bold mb-2">Contact Support</h2>
              <p className="text-muted-foreground font-body text-sm mb-6">Can't find what you're looking for? Send us a message.</p>

              <form onSubmit={handleContact} className="bg-gradient-card rounded-xl border border-border/50 p-6 space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium mb-1.5 block">Name</label>
                    <Input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Your name" className="bg-secondary border-border" maxLength={100} />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium mb-1.5 block">Email</label>
                    <Input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="you@example.com" className="bg-secondary border-border" maxLength={255} />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Subject</label>
                  <Input value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} placeholder="What's this about?" className="bg-secondary border-border" maxLength={200} />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Message</label>
                  <Textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Describe your issue or question..." rows={5} className="bg-secondary border-border" maxLength={2000} />
                </div>
                <Button type="submit" variant="gold" disabled={sending}>
                  {sending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                </Button>
              </form>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenterPage;
