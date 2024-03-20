import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function ChatLink() {
  return (
    <Link
      href={"#"}
      data-active={false}
      className={`
        p-2 flex items-center justify-between gap-2 
        border border-slate-400 rounded-xl
        hover:border-slate-900
        hover:cursor-pointer
        data-[active=true]:bg-slate-950
        data-[active=true]:border-none
        transition-all
        group
      `}
    >
      <MessageSquare
        size={12}
        className="group-data-[active=true]:text-white"
      />
      <p className="text-xs font-medium truncate text-slate-800 group-data-[active=true]:text-white">
        OpenAI chat history
      </p>
      <button className="outline-none rotate-90 group-data-[active=true]:text-white">
        ...
      </button>
    </Link>
  );
}
