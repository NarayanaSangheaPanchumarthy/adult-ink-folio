import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import videoAsset from "@/assets/luxeread-promo.mp4.asset.json";

const faqs = [
  {
    q: "What is LuxeRead?",
    a: "LuxeRead is a premium adult reading platform offering curated content across 6 categories: Books, News, Articles, Journals, Stories, and Celebrity Bios.",
  },
  {
    q: "Is LuxeRead free to use?",
    a: "You can browse and explore content for free. For full access to all articles and premium features, choose one of our subscription plans.",
  },
  {
    q: "What categories are available?",
    a: "We offer Books, News, Articles, Journals, Stories, and Celebrity Bios — with fresh content added regularly by our editorial team and community contributors.",
  },
  {
    q: "Can I submit my own content?",
    a: "Absolutely! Registered users can submit articles to any category. Just click 'Submit' in the navigation bar to get started.",
  },
  {
    q: "How does the AI assistant work?",
    a: "Our built-in AI chat assistant can help you discover content, navigate the platform, and answer questions. Look for the chat bubble in the bottom-right corner.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. Your bookmarks, reading history, and personal information are fully private. We use industry-standard security and age verification to protect our community.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-elevated bg-gradient-card aspect-video">
            <video
              src={videoAsset.url}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/placeholder.svg"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </motion.div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center font-body mb-10">
          Everything you need to know about LuxeRead
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
              <AccordionTrigger className="font-body text-sm font-medium text-foreground hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
