"use client";

import { Bot, CirclePlus, LogOut } from "lucide-react";
import * as Avatar from "../ui/avatar";
import { ChatLink } from "./chat-link";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function SidebarMenu() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <aside className="border-r overflow-hidden h-full border-r-slate-300">
      <nav className="h-full flex flex-col">
        <div className="p-5 flex justify-center items-center gap-3">
          <h1 className="text-lg font-normal">AI Tutor</h1>
          <Bot size={24} />
        </div>

        <div className="px-2 mt-2">
          <Button className="w-full rounded-full flex items-center gap-2">
            <span className="text-xs">New Chat</span>
            <CirclePlus size={16} />
          </Button>
        </div>
        <div className="mt-2 px-2 flex-grow flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <ChatLink />
          <ChatLink />
          <ChatLink />
          <ChatLink />
          <ChatLink />
          <ChatLink />
          <ChatLink />
          <ChatLink />
        </div>
        <div className="mt-auto px-4 py-5 flex flex-col gap-4">
          <div className="border-t border-t-slate-300" />
          <div className="flex items-center gap-3">
            <Avatar.Avatar>
              <Avatar.AvatarImage src="https://github.com/natan10.png" />
              <Avatar.AvatarFallback>NT</Avatar.AvatarFallback>
            </Avatar.Avatar>
            <span className="text-[10px] font-light truncate">
              Natan-moreira1@hotmail.com
            </span>
            <button
              className="outline-none group"
              onClick={() => signOut(() => router.push("/signin"))}
            >
              <LogOut
                size={16}
                className="group-hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
