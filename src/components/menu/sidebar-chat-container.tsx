import { ChatLink } from "./chat-link";

export async function SidebarChatContainer() {
  const chatsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`,
    {
      next: {
        tags: ["chats"],
      },
    }
  );

  const chats = (await chatsData.json()) as { id: string; status: number }[];

  return (
    <div className="mt-2 px-2 flex-grow flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {chats.map((chat) => {
        return <ChatLink key={chat.id} chatId={chat.id} />;
      })}
    </div>
  );
}
