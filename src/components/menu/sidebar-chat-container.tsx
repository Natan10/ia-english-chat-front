import { useQuery } from "@tanstack/react-query";

import { ChatLink } from "./chat-link";
import { getChatsFromUser } from "./actions/get-chats";
import { ChatHistory } from "@/domain/chat-history";
import { User } from "@/contexts/supabase-context";

type SidebarChatContainerProps = {
  user: User | null;
};

export function SidebarChatContainer({ user }: SidebarChatContainerProps) {
  const { data } = useQuery({
    queryKey: ["user-chats", user?.id],
    queryFn: async () => {
      const data = await getChatsFromUser();
      return data;
    },
  });

  return (
    <div className="mt-2 px-2 flex-grow flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {data?.map((chat: ChatHistory) => {
        return (
          <ChatLink key={chat.id} chatId={chat.id} chatTitle={chat.title} />
        );
      })}
    </div>
  );
}
