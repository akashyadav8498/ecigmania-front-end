import { X } from "lucide-react";
import type { Recipient } from "@/lib/email/types";

interface RecipientChipProps {
  recipient: Recipient;
  onRemove: (id: string) => void;
}

export function RecipientChip({ recipient, onRemove }: RecipientChipProps) {
  const isInvalid = recipient.status === "invalid";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium border max-w-full ${
        isInvalid
          ? "bg-destructive/10 text-destructive border-destructive/20"
          : "bg-secondary text-secondary-foreground border-transparent"
      }`}
    >
      <span className="truncate flex-1 min-w-0 max-w-[200px]">{recipient.email}</span>
      <button
        type="button"
        onClick={() => onRemove(recipient.id)}
        className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-full p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
