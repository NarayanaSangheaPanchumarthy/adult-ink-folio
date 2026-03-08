import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Crown, BookOpen, Settings, LogOut, HelpCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim(), bio: bio.trim() })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile updated!");
      await refreshProfile();
    }
    setSaving(false);
  };

  const isSubscribed = profile?.subscription_status === "active";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="font-display text-4xl font-bold mb-8">My Profile</h1>

          {/* Subscription Status */}
          <div className="bg-gradient-card rounded-xl border border-border/50 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-display text-lg font-semibold">Subscription</h2>
                  <p className="font-body text-sm text-muted-foreground">
                    {isSubscribed
                      ? `${profile?.subscription_plan === "annual" ? "Annual" : "Monthly"} plan`
                      : "No active subscription"}
                  </p>
                </div>
              </div>
              <Badge
                className={`font-body ${
                  isSubscribed
                    ? "bg-primary/20 text-primary border-primary/30"
                    : "bg-secondary text-muted-foreground border-border"
                }`}
              >
                {isSubscribed ? "Active" : "Inactive"}
              </Badge>
            </div>
            {!isSubscribed && (
              <Link to="/subscribe" className="block mt-4">
                <Button variant="gold" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" /> Subscribe Now
                </Button>
              </Link>
            )}
            {isSubscribed && profile?.subscription_expires_at && (
              <p className="font-body text-xs text-muted-foreground mt-3">
                Expires: {new Date(profile.subscription_expires_at).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Profile Info */}
          <div className="bg-gradient-card rounded-xl border border-border/50 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Profile Settings</h2>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="font-body text-sm text-muted-foreground">Email</Label>
                <p className="font-body text-foreground mt-1">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="font-body text-sm">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-body text-sm">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full rounded-md bg-secondary border border-border px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Button variant="gold" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-gradient-card rounded-xl border border-border/50 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Help & Support</h2>
            </div>
            <div className="space-y-3">
              <Link to="/help" className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-body text-sm font-medium">Help Center</p>
                  <p className="font-body text-xs text-muted-foreground">Guides, FAQ, and contact support</p>
                </div>
              </Link>
              <button
                onClick={() => {
                  const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLButtonElement;
                  chatBtn?.click();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group text-left"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-body text-sm font-medium">AI Assistant</p>
                  <p className="font-body text-xs text-muted-foreground">Get instant help from our AI chatbot</p>
                </div>
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
