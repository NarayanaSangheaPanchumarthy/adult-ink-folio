import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-bold">
                Luxe<span className="text-primary">Read</span>
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Premium adult reading platform. Real content, real stories, real information — curated for you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Content</h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li><Link to="/category/books" className="hover:text-primary transition-colors">Books</Link></li>
                <li><Link to="/category/news" className="hover:text-primary transition-colors">News</Link></li>
                <li><Link to="/category/articles" className="hover:text-primary transition-colors">Articles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">More</h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li><Link to="/category/journals" className="hover:text-primary transition-colors">Journals</Link></li>
                <li><Link to="/category/stories" className="hover:text-primary transition-colors">Stories</Link></li>
                <li><Link to="/category/celebrities" className="hover:text-primary transition-colors">Celebrity Bios</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li><Link to="/subscribe" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><span className="cursor-default">About</span></li>
                <li><span className="cursor-default">Contact</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 LuxeRead. All rights reserved. Must be 18+ to access content.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
