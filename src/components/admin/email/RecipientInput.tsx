import { useState, useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import type { Recipient } from "@/lib/email/types";
import { RecipientChip } from "./RecipientChip";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const generateId = () => "rec_" + Math.random().toString(36).substr(2, 9);

interface RecipientInputProps {
  recipients: Recipient[];
  onChange: (recipients: Recipient[]) => void;
}

export function RecipientInput({ recipients, onChange }: RecipientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [duplicateFeedback, setDuplicateFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFeedback = (msg: string) => {
    setDuplicateFeedback(msg);
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    feedbackTimeout.current = setTimeout(() => setDuplicateFeedback(null), 2000);
  };

  const processEmailString = (str: string, currentRecipients: Recipient[]): Recipient[] => {
    const parts = str.split(/[\n,]+/);
    const newRecipients = [...currentRecipients];
    let addedCount = 0;
    let duplicateCount = 0;

    for (const part of parts) {
      const email = part.trim().toLowerCase();
      if (!email) continue;

      const isDuplicate = newRecipients.some((r) => r.email === email);
      if (isDuplicate) {
        duplicateCount++;
        continue;
      }

      newRecipients.push({
        id: generateId(),
        email,
        status: isValidEmail(email) ? "valid" : "invalid",
      });
      addedCount++;
    }

    if (duplicateCount > 0 && addedCount === 0) {
      showFeedback("Already added");
    } else if (duplicateCount > 0 && addedCount > 0) {
      showFeedback(`${duplicateCount} duplicate(s) ignored`);
    }

    return newRecipients;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      if (inputValue.trim()) {
        e.preventDefault();
        const updated = processEmailString(inputValue, recipients);
        onChange(updated);
        setInputValue("");
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const updated = processEmailString(paste, recipients);
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(recipients.filter((r) => r.id !== id));
  };

  const invalidCount = recipients.filter((r) => r.status === "invalid").length;
  const validCount = recipients.length - invalidCount;

  return (
    <div className="space-y-2">
      <div
        className="flex flex-wrap items-center gap-2 p-2 min-h-[44px] bg-background border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none transition-shadow cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {recipients.map((r) => (
          <RecipientChip key={r.id} recipient={r} onRemove={handleRemove} />
        ))}
        
        <div className="flex-1 min-w-[150px] relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm py-1"
            placeholder={recipients.length === 0 ? "To (e.g. user@example.com)" : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={() => {
              if (inputValue.trim()) {
                const updated = processEmailString(inputValue, recipients);
                onChange(updated);
                setInputValue("");
              }
            }}
          />
          {duplicateFeedback && (
            <span className="absolute right-2 text-xs text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded pointer-events-none animate-in fade-in zoom-in-95 duration-200">
              {duplicateFeedback}
            </span>
          )}
        </div>
      </div>

      {(validCount > 0 || invalidCount > 0) && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground px-1">
          <span>{recipients.length} recipient{recipients.length !== 1 ? "s" : ""}</span>
          {invalidCount > 0 && (
            <span className="text-destructive font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block"></span>
              {invalidCount} invalid
            </span>
          )}
        </div>
      )}
    </div>
  );
}
