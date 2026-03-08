import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Luxe<span className="text-primary">Read</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/categories" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/categories" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            Featured
          </Link>
          <Link to="/subscribe" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/subscribe">
            <Button variant="gold" size="sm">Subscribe</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border p-6 space-y-4">
          <Link to="/categories" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">
            Categories
          </Link>
          <Link to="/categories" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">
            Featured
          </Link>
          <Link to="/subscribe" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">
            Pricing
          </Link>
          <Link to="/subscribe" onClick={() => setOpen(false)}>
            <Button variant="gold" className="w-full">Subscribe</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
