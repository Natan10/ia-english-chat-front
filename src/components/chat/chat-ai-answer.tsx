import { BotMessageSquare } from "lucide-react";
import { Chat } from "@/domain/chat";

type ChatAiAnswerProps = {
  data: Chat;
};

export function ChatAiAnswer({ data }: ChatAiAnswerProps) {
  return (
    <div className="flex gap-2">
      <div className="size-6 md:size-10 bg-blue-700 rounded-full flex items-center justify-center">
        <BotMessageSquare size={20} className="text-white" />
      </div>

      <div className=" bg-slate-900 px-3 py-2 rounded-r-[8px] rounded-bl-[8px] max-w-2xl w-full">
        <div className="flex flex-col mb-1">
          <span className="text-muted-foreground text-[10px]">
            {new Date(data.createdAt).toLocaleDateString("pt-br", {
              minute: "numeric",
              second: "numeric",
            })}
          </span>
        </div>
        <p className=" text-slate-50 text-sm font-light">{data.content}</p>
      </div>
    </div>
  );
}
