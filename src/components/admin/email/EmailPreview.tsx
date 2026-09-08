import type { EmailDraft } from "@/lib/email/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

interface EmailPreviewProps {
  draft: EmailDraft;
  onBack: () => void;
  onConfirm: () => void;
}

export function EmailPreview({ draft, onBack, onConfirm }: EmailPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-2 items-baseline text-sm">
            <span className="text-muted-foreground font-medium">To:</span>
            <div className="flex flex-wrap gap-1">
              {draft.recipients.map((r, i) => (
                <span key={r.id} className="text-foreground">
                  {r.email}{i < draft.recipients.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-[80px_1fr] gap-2 items-baseline text-sm border-b border-border pb-4">
            <span className="text-muted-foreground font-medium">Subject:</span>
            <span className="text-foreground font-medium">{draft.subject}</span>
          </div>
        </div>

        <div className="text-sm text-foreground whitespace-pre-wrap min-h-[150px]">
          {draft.message}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button onClick={onConfirm} className="w-full sm:w-auto">
          <Send className="w-4 h-4 mr-2" />
          Confirm & Send
        </Button>
      </div>
    </div>
  );
}
