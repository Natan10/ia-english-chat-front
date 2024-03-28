import { toast } from "sonner";

import { Empty } from "@/components/animate/empty";
import { ChatAiAnswer } from "@/components/chat/chat-ai-answer";
import { ChatAiUser } from "@/components/chat/chat-ai-user";
import { ChatContainer } from "@/components/chat/chat-container";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessagesContainer } from "@/components/chat/chat-messages-container";
import { Separator } from "@/components/ui/separator";
import { ChatHistory } from "@/domain/chat-history";
import { ChatType } from "@/domain/chat-type";

async function getChatHistory(chatId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat-history/${chatId}`,
      {
        next: {
          tags: ["chat-history"],
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    return data as ChatHistory;
  } catch (e) {
    toast.error(`Erro ao trazer mensagens do: ${chatId}`);
  }
}

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const chatHistory = await getChatHistory(params.chatId);

  return (
    <section className="h-full p-10">
      <ChatContainer>
        <ChatHeader
          chatId={chatHistory!.id}
          createdAt={chatHistory!.createdAt}
        />
        <Separator className="bg-slate-400 h-[1px] my-3" />
        <ChatMessagesContainer>
          {chatHistory && chatHistory.history.length > 0 ? (
            chatHistory.history.map((chatResponse) => {
              return chatResponse.type === ChatType.IA ? (
                <ChatAiAnswer key={chatResponse.id} data={chatResponse} />
              ) : (
                <ChatAiUser key={chatResponse.id} data={chatResponse} />
              );
            })
          ) : (
            <Empty />
          )}
        </ChatMessagesContainer>
        <ChatInput />
      </ChatContainer>
    </section>
  );
}
