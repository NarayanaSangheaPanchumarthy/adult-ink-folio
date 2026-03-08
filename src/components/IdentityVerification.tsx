import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Upload, FileCheck, Clock, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const IdentityVerification = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [uploading, setUploading] = useState(false);

  const verificationStatus = (profile as any)?.verification_status || "unverified";
  const isVerified = (profile as any)?.id_verified === true;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, WebP, or PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }

    setUploading(true);
    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("id-documents")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        id_document_url: filePath,
        verification_status: "pending",
      } as any)
      .eq("user_id", user.id);

    if (updateError) {
      toast.error("Failed to update profile");
    } else {
      toast.success("ID document submitted for verification!");
      await refreshProfile();
    }
    setUploading(false);
  };

  const statusConfig = {
    unverified: {
      icon: <XCircle className="w-5 h-5" />,
      label: "Not Verified",
      color: "bg-muted text-muted-foreground border-border",
      description: "Upload a government-issued ID to verify your identity.",
    },
    pending: {
      icon: <Clock className="w-5 h-5" />,
      label: "Pending Review",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
      description: "Your ID is being reviewed. This usually takes 24-48 hours.",
    },
    verified: {
      icon: <FileCheck className="w-5 h-5" />,
      label: "Verified",
      color: "bg-green-500/10 text-green-500 border-green-500/30",
      description: "Your identity has been verified.",
    },
    rejected: {
      icon: <XCircle className="w-5 h-5" />,
      label: "Rejected",
      color: "bg-destructive/10 text-destructive border-destructive/30",
      description: "Verification failed. Please upload a clearer document.",
    },
  };

  const status = statusConfig[verificationStatus as keyof typeof statusConfig] || statusConfig.unverified;

  return (
    <div className="bg-gradient-card rounded-xl border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">Identity Verification</h2>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Badge className={`font-body flex items-center gap-1.5 ${status.color}`}>
          {status.icon}
          {status.label}
        </Badge>
        {isVerified && (
          <Badge className="bg-primary/20 text-primary border-primary/30 font-body">
            <ShieldCheck className="w-3 h-3 mr-1" /> Age Verified
          </Badge>
        )}
      </div>

      <p className="font-body text-sm text-muted-foreground mb-4">{status.description}</p>

      {(verificationStatus === "unverified" || verificationStatus === "rejected") && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-body text-sm text-muted-foreground mb-1">
              Upload a government-issued ID
            </p>
            <p className="font-body text-xs text-muted-foreground mb-3">
              Passport, driver's license, or national ID (JPG, PNG, PDF, max 10MB)
            </p>
            <label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
              <Button variant="gold" size="sm" asChild disabled={uploading}>
                <span className="cursor-pointer">
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" /> Choose File
                    </>
                  )}
                </span>
              </Button>
            </label>
          </div>

          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="font-body text-xs text-muted-foreground">
              🔒 Your documents are encrypted and stored securely. They are only used for age and identity verification purposes.
            </p>
          </div>
        </div>
      )}

      {verificationStatus === "pending" && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
          <p className="font-body text-sm text-yellow-500/90">
            We're currently reviewing your submitted document. You'll be notified once the review is complete.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdentityVerification;
