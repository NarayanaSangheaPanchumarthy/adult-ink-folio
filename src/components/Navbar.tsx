import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, User, PenSquare, Bookmark, Search, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { isAdmin } = useIsAdmin();

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
          <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </Link>
          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <Link to="/submit">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <PenSquare className="w-4 h-4 mr-1" /> Submit
                  </Button>
                </Link>
                <Link to="/bookmarks">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Bookmark className="w-4 h-4 mr-1" /> Saved
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin/verification">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <ShieldCheck className="w-4 h-4 mr-1" /> Admin
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <User className="w-4 h-4 mr-1" /> Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="gold-outline" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="gold" size="sm">Sign Up</Button>
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border p-6 space-y-4">
          <Link to="/categories" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">Categories</Link>
          <Link to="/categories" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">Featured</Link>
          <Link to="/subscribe" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">Pricing</Link>
          <Link to="/search" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">Search</Link>
          {!loading && (
            user ? (
              <>
                <Link to="/submit" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">Submit Article</Link>
                <Link to="/bookmarks" onClick={() => setOpen(false)} className="block font-body text-muted-foreground hover:text-primary">My Bookmarks</Link>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <Button variant="gold-outline" className="w-full"><User className="w-4 h-4 mr-2" /> Profile</Button>
                </Link>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="gold-outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button variant="gold" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
