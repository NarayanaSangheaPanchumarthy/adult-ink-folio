import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AGE_GATE_KEY = "luxeread_age_verified";

const AgeGate = () => {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_GATE_KEY);
    if (!verified) setShow(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(AGE_GATE_KEY, "true");
    setShow(false);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", damping: 20 }}
          className="w-full max-w-md mx-4 bg-card border border-border rounded-2xl p-8 text-center shadow-2xl"
        >
          {denied ? (
            <>
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-3">Access Restricted</h2>
              <p className="font-body text-muted-foreground mb-6">
                You must be 18 or older to access LuxeRead. Please return when you meet the age requirement.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.replace("https://www.google.com")}
                className="w-full"
              >
                Leave Site
              </Button>
            </>
          ) : (
            <>
              <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-3">Age Verification</h2>
              <p className="font-body text-muted-foreground mb-6">
                You must be at least <span className="text-foreground font-semibold">18 years old</span> to access this platform. Please confirm your age to continue.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-border"
                  onClick={handleDeny}
                >
                  I'm Under 18
                </Button>
                <Button
                  variant="gold"
                  className="flex-1"
                  onClick={handleConfirm}
                >
                  I'm 18 or Older
                </Button>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-4">
                By continuing, you confirm you meet the minimum age requirement.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeGate;
