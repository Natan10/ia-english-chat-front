import { Send } from "lucide-react";

import { ChatAiAnswer } from "@/components/chat/chat-ai-answer";
import { ChatAiUser } from "@/components/chat/chat-ai-user";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <section className="h-full p-10">
      <div className="flex flex-col h-full">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-slate-500">Chat History</h1>

            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px] text-end">
                Created At
              </span>
              <span className="text-xs">
                {new Date().toLocaleDateString("pt-br")}
              </span>
            </div>
          </div>
          <Separator className="bg-slate-400 h-[1px]" />
        </div>

        <div className="mt-4 flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <ChatAiAnswer />
          <ChatAiUser />
          <ChatAiUser />
          <ChatAiUser />
          <ChatAiUser />
          <ChatAiAnswer />
          <ChatAiAnswer />
        </div>
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
      </div>
    </section>
  );
}
