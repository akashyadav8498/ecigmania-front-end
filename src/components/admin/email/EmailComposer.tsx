import { RecipientInput } from "./RecipientInput";
import type { EmailDraft, Recipient } from "@/lib/email/types";
import { Button } from "@/components/ui/button";

interface EmailComposerProps {
  draft: EmailDraft;
  onChange: (draft: EmailDraft) => void;
  onReview: () => void;
}

export function EmailComposer({ draft, onChange, onReview }: EmailComposerProps) {
  const handleRecipientsChange = (recipients: Recipient[]) => {
    onChange({ ...draft, recipients });
  };

  const hasValidRecipients = draft.recipients.some((r) => r.status === "valid");
  const hasInvalidRecipients = draft.recipients.some((r) => r.status === "invalid");
  const hasSubject = draft.subject.trim().length > 0;
  const hasMessage = draft.message.trim().length > 0;

  const canReview = hasValidRecipients && !hasInvalidRecipients && hasSubject && hasMessage;

  return (
    <div className="space-y-6">
      <div className="space-y-4 bg-card border rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Recipients</label>
          <RecipientInput recipients={draft.recipients} onChange={handleRecipientsChange} />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
          <input
            id="subject"
            type="text"
            className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Email subject"
            value={draft.subject}
            onChange={(e) => onChange({ ...draft, subject: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
          <textarea
            id="message"
            className="w-full p-3 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[200px] resize-y"
            placeholder="Type your message here..."
            value={draft.message}
            onChange={(e) => onChange({ ...draft, message: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end">
        <Button onClick={onReview} disabled={!canReview} className="w-full sm:w-auto">
          Review & Send
        </Button>
      </div>
    </div>
  );
}
