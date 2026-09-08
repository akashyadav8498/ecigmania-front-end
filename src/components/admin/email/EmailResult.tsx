import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailResultProps {
  recipientCount: number;
  onReset: () => void;
}

export function EmailResult({ recipientCount, onReset }: EmailResultProps) {
  return (
    <div className="bg-card border rounded-xl p-8 max-w-2xl mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          Email Sent Successfully
        </h3>
        
        <p className="text-lg text-secondary-foreground">
          Your message has been sent to <span className="font-medium text-foreground">{recipientCount}</span> recipient{recipientCount === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center pt-6 border-t border-border mt-8">
        <Button onClick={onReset} className="w-full sm:w-auto">
          <RotateCcw className="w-4 h-4 mr-2" />
          Compose New Email
        </Button>
      </div>
    </div>
  );
}
