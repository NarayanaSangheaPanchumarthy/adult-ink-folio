import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, CheckCircle, XCircle, Clock, Eye, Download,
  Users, FileCheck, AlertTriangle, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

type VerificationProfile = {
  id: string;
  user_id: string;
  display_name: string | null;
  date_of_birth: string | null;
  verification_status: string;
  id_document_url: string | null;
  id_verified: boolean;
  created_at: string;
};

const AdminVerificationPage = () => {
  const [profiles, setProfiles] = useState<VerificationProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("pending");
  const [processing, setProcessing] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchProfiles = async () => {
    setLoading(true);
    let query = supabase
      .from("profiles")
      .select("id, user_id, display_name, date_of_birth, verification_status, id_document_url, id_verified, created_at")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("verification_status", filter);
    }

    const { data, error } = await query;
    if (error) {
      toast.error("Failed to load profiles");
    } else {
      setProfiles((data as any) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, [filter]);

  const handleAction = async (profile: VerificationProfile, action: "verified" | "rejected") => {
    setProcessing(profile.id);
    const { error } = await supabase
      .from("profiles")
      .update({
        verification_status: action,
        id_verified: action === "verified",
      } as any)
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to update: " + error.message);
    } else {
      toast.success(`User ${action === "verified" ? "approved" : "rejected"} successfully`);

      // Send notification email
      try {
        await supabase.functions.invoke("verification-notification", {
          body: {
            userId: profile.user_id,
            status: action,
            displayName: profile.display_name,
            email: profile.user_id, // Will be resolved server-side if needed
          },
        });
        toast.info("Notification email queued");
      } catch (e) {
        console.error("Failed to send notification:", e);
      }

      fetchProfiles();
    }
    setProcessing(null);
  };

  const viewDocument = async (docPath: string) => {
    const { data } = await supabase.storage
      .from("id-documents")
      .createSignedUrl(docPath, 300);
    if (data?.signedUrl) {
      setPreviewUrl(data.signedUrl);
    } else {
      toast.error("Could not load document");
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected": return <XCircle className="w-4 h-4 text-destructive" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-500/10 text-green-500 border-green-500/30";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/30";
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const counts = {
    pending: profiles.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-display text-3xl font-bold">ID Verification Admin</h1>
              <p className="font-body text-muted-foreground">Review and manage identity verification requests</p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["pending", "verified", "rejected", "unverified", "all"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "gold" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={fetchProfiles} className="ml-auto">
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
          </div>

          {/* Document preview modal */}
          {previewUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setPreviewUrl(null)}>
              <div className="max-w-3xl max-h-[80vh] bg-card border border-border rounded-xl p-4 overflow-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-display font-semibold">Document Preview</h3>
                  <div className="flex gap-2">
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Download</Button>
                    </a>
                    <Button variant="ghost" size="sm" onClick={() => setPreviewUrl(null)}>Close</Button>
                  </div>
                </div>
                {previewUrl.includes(".pdf") ? (
                  <iframe src={previewUrl} className="w-full h-[60vh] rounded-lg" />
                ) : (
                  <img src={previewUrl} alt="ID Document" className="max-w-full rounded-lg" />
                )}
              </div>
            </div>
          )}

          {/* Profiles list */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground font-body animate-pulse">Loading verification requests...</div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-12 bg-gradient-card rounded-xl border border-border/50">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-muted-foreground">No {filter !== "all" ? filter : ""} verification requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {profiles.map((p) => (
                <div key={p.id} className="bg-gradient-card rounded-xl border border-border/50 p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display font-semibold truncate">
                          {p.display_name || "Unnamed User"}
                        </h3>
                        <Badge className={`font-body text-xs flex items-center gap-1 ${statusBadgeClass(p.verification_status)}`}>
                          {statusIcon(p.verification_status)}
                          {p.verification_status}
                        </Badge>
                      </div>
                      <div className="font-body text-sm text-muted-foreground space-y-1">
                        <p>DOB: {p.date_of_birth || "Not provided"}</p>
                        <p>Submitted: {new Date(p.created_at).toLocaleDateString()}</p>
                        <p className="text-xs truncate">User ID: {p.user_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {p.id_document_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDocument(p.id_document_url!)}
                        >
                          <Eye className="w-4 h-4 mr-1" /> View Doc
                        </Button>
                      )}

                      {(p.verification_status === "pending" || p.verification_status === "rejected") && (
                        <Button
                          variant="gold"
                          size="sm"
                          disabled={processing === p.id}
                          onClick={() => handleAction(p.id, p.user_id, "verified")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                      )}

                      {(p.verification_status === "pending" || p.verification_status === "verified") && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive/50 text-destructive hover:bg-destructive/10"
                          disabled={processing === p.id}
                          onClick={() => handleAction(p.id, p.user_id, "rejected")}
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminVerificationPage;
