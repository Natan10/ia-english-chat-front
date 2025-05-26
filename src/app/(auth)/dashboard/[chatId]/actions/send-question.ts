"use server";

import { ChatType } from "@/domain/chat-type";
import { openAIClient } from "@/utils/clients/open-ai-client";
import { createClient } from "@/utils/clients/supabase-server-client";

type SendQuestionProps = {
  question: string;
  chatId: string;
};

export async function sendQuestion(formData: FormData) {
  const chatId = formData.get("chat-id");
  const userQuestion = formData.get("user-question");

  if (!userQuestion) throw new Error("Give a valid question");

  const supabase = createClient();

  const { data: chatHistory } = await supabase
    .from("chatHistory")
    .select(
      `*,
      chatQuestion(
      chat_history_id
      )
  `
    )
    .eq("id", chatId);

  if (!chatHistory) throw new Error("Chat not found");

  const completition = await openAIClient.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "system",
        content: "You are able to teach only english",
      },
      {
        role: "user",
        content: userQuestion.toString(),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const oldChatHistoryQuestions = chatHistory[0].history;
  const newValues = [
    ...oldChatHistoryQuestions,
    {
      chatHistoryId: chatId,
      file: null,
      content: userQuestion.toString(),
      type: ChatType.USER,
    },
    {
      chatHistoryId: chatId,
      file: null,
      content: completition.choices[0].message,
      type: ChatType.IA,
    },
  ];

  const { data: chatResponse, error } = await supabase
    .from("chatHistory")
    .update({ history: newValues })
    .eq("id", chatId);

  if (!error) {
    return chatResponse;
  }

  throw new Error(error.message);
}
