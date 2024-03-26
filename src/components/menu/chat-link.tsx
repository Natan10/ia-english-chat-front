"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export type ChatLinkProps = {
  chatId: string;
};

export function ChatLink({ chatId }: ChatLinkProps) {
  const pathname = usePathname();
  const redirectTo = `/dashboard/${chatId}`;
  const isActive = pathname === redirectTo;

  return (
    <Link
      href={redirectTo}
      data-active={isActive}
      className={`
        p-2 flex items-center justify-between gap-2 
        border border-slate-400 rounded-xl
        hover:border-slate-900
        hover:cursor-pointer
        data-[active=true]:border-blue-600
        transition-all
        group
      `}
    >
      <MessageSquare
        size={24}
        className="group-data-[active=true]:text-blue-600"
      />
      <p className="text-xs font-medium truncate text-slate-800 group-data-[active=true]:text-blue-600">
        {chatId}
      </p>
      <button className="outline-none rotate-90 group-data-[active=true]:text-blue-600">
        ...
      </button>
    </Link>
  );
}
