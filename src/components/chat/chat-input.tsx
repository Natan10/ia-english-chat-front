import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function ChatInput() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Textarea
        className="rounded bg-transparent text-xs resize-none shadow-sm"
        placeholder="Ask me something..."
      />
      <div className="flex justify-end">
        <Button size={"sm"} className="flex items-center gap-2">
          <span className="text-xs">Send</span>
          <Send size={12} />
        </Button>
      </div>
    </div>
  );
}
