"use client";

import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";

import { SidebarAvatar } from "./sidebar-avatar";
import { createNewChat } from "./actions/create-new-chat";
import { SidebarNewChatBtn } from "./sidebar-new-chat-btn";
import { SidebarChatContainer } from "./sidebar-chat-container";
import { useSupabase } from "@/contexts/supabase-context";
import { queryClient } from "@/contexts/query-context";

export function SidebarMenu() {
  const { supabase, user, setUser } = useSupabase();
  const router = useRouter();

  async function handleSignout() {
    await supabase.auth.signOut({
      scope: "global",
    });
    setUser(null);
    router.push("signin");
  }

  return (
    <aside className="hidden md:block border-r overflow-hidden h-full border-r-slate-300">
      <nav className="h-full flex flex-col">
        <div className="p-5 flex justify-center items-center gap-3">
          <h1 className="text-lg font-normal">AI Tutor</h1>
          <Bot size={24} />
        </div>

        <form
          className="px-2 mt-2"
          action={async () => {
            await createNewChat();
            await queryClient.refetchQueries({
              queryKey: ["user-chats", user?.id],
            });
          }}
        >
          <SidebarNewChatBtn />
        </form>

        {user && <SidebarChatContainer user={user} />}
        <SidebarAvatar handleSignout={handleSignout} user={user} />
      </nav>
    </aside>
  );
}
