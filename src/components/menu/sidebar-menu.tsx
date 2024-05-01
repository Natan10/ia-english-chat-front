import { Bot } from "lucide-react";

import { SidebarAvatar } from "./sidebar-avatar";
import { createNewChat } from "./actions/create-new-chat";
import { SidebarNewChatBtn } from "./sidebar-new-chat-btn";
import { SidebarChatContainer } from "./sidebar-chat-container";

export function SidebarMenu() {
  return (
    <aside className="hidden md:block border-r overflow-hidden h-full border-r-slate-300">
      <nav className="h-full flex flex-col">
        <div className="p-5 flex justify-center items-center gap-3">
          <h1 className="text-lg font-normal">AI Tutor</h1>
          <Bot size={24} />
        </div>

        <form className="px-2 mt-2" action={createNewChat}>
          <SidebarNewChatBtn />
        </form>

        <SidebarChatContainer />
        <SidebarAvatar />
      </nav>
    </aside>
  );
}
