import { User } from "@/contexts/supabase-context";
import { Chat } from "@/domain/chat";
import { ChatHistory } from "@/domain/chat-history";
import { chatHistory } from "@/routes/api-endpoints";
import { SupabaseClient } from "@supabase/supabase-js";

type Params = {
  user: User;
  chatId: string;
  supabase: SupabaseClient;
};

export async function getChatHistoryById({ chatId, user, supabase }: Params) {
  const { data, error } = await supabase
    .from("chatHistory")
    .select(
      `*,
        chatQuestion(
        chat_history_id
        )
    `
    )
    .eq("id", chatId)
    .eq("user_id", user.id);

  if (error) throw error;

  if (data.length === 0) return null;

  const [record] = data;
  return {
    id: record.id,
    status: record.status,
    createdAt: record.created_at,
    title: record.title,
    history: record.chatQuestion.map((question: any) => {
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
}
