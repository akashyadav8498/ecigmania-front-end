import { useState } from "react";
import type { EmailDraft } from "@/lib/email/types";
import { EmailComposer } from "../../components/admin/email/EmailComposer";
import { EmailPreview } from "../../components/admin/email/EmailPreview";
import { EmailResult } from "../../components/admin/email/EmailResult";
import { Loader2 } from "lucide-react";

type EmailStep = "COMPOSING" | "PREVIEW" | "SENDING" | "RESULT";

export function AdminEmailsPage() {
  const [step, setStep] = useState<EmailStep>("COMPOSING");
  const [draft, setDraft] = useState<EmailDraft>({
    recipients: [],
    subject: "",
    message: "",
  });

  const handleReview = () => {
    setStep("PREVIEW");
  };

  const handleBackToCompose = () => {
    setStep("COMPOSING");
  };

  const handleConfirmSend = async () => {
    setStep("SENDING");
    
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStep("RESULT");
  };

  const handleReset = () => {
    setDraft({
      recipients: [],
      subject: "",
      message: "",
    });
    setStep("COMPOSING");
  };

  return (
    <div className="space-y-6 max-w-[800px] mx-auto">
      <div className="border-b border-border pb-5">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Compose Email
        </h2>
        <p className="text-sm text-secondary-foreground mt-1">
          Send announcements, updates, or offers to your customers.
        </p>
      </div>

      {step === "COMPOSING" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EmailComposer draft={draft} onChange={setDraft} onReview={handleReview} />
        </div>
      )}

      {step === "PREVIEW" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EmailPreview draft={draft} onBack={handleBackToCompose} onConfirm={handleConfirmSend} />
        </div>
      )}

      {step === "SENDING" && (
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <h3 className="text-lg font-medium">Sending Email...</h3>
          <p className="text-sm text-muted-foreground">Please wait while your message is sent.</p>
        </div>
      )}

      {step === "RESULT" && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <EmailResult recipientCount={draft.recipients.length} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
