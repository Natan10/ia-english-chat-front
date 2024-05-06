import { Chat } from "@/domain/chat";
import { ChatHistory } from "@/domain/chat-history";
import { createClient } from "@/utils/clients/supabase-browser-client";
import { redirect } from "next/navigation";

export async function getChatsFromUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect("signin");
  if (error) throw error;

  const { data: chatHistory, error: errorData } = await supabase
    .from("chatHistory")
    .select(
      `
        *,
        chatQuestion(
            chat_history_id
        )
    `
    )
    .eq("user_id", user.id);

  if (errorData) throw errorData;

  return chatHistory.map((chat) => {
    return {
      id: chat.id,
      status: chat.status,
      createdAt: chat.created_at,
      title: chat.title,
      history: chat.chatQuestion.map((question: any) => {
        return {
          id: question.id,
          chatHistoryId: question.chat_history_id,
          createdAt: question.created_at,
          file: question.file || null,
          content: question.content || "",
          type: question.type,
        } as Chat;
      }),
    } as ChatHistory;
  });
}
