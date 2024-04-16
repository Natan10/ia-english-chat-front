import { currentUser } from "@clerk/nextjs";
import { ChatLink } from "./chat-link";
import { userChats } from "@/routes/api-endpoints";

export async function SidebarChatContainer() {
  const user = await currentUser();

  const chatsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${userChats}/${user?.emailAddresses[0].emailAddress}`,
    {
      next: {
        tags: ["chats"],
      },
    }
  );

  const chats = (await chatsData.json()) as {
    id: string;
    title: string | null;
    status: number;
  }[];

  return (
    <div className="mt-2 px-2 flex-grow flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {chats.map((chat) => {
        return (
          <ChatLink key={chat.id} chatId={chat.id} chatTitle={chat.title} />
        );
      })}
    </div>
  );
}
