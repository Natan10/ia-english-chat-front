"use server";

import { Chat } from "@/domain/chat";
import { revalidateTag } from "next/cache";

async function sendQuestion(formData: FormData) {
  const chatId = formData.get("chat-id");
  const userQuestion = formData.get("user-question");
  const file = formData.get("file-upload");

  if (userQuestion) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
          content: userQuestion,
        }),
      }
    );

    const data = await response.json();
    revalidateTag("chat-history");
    return data as Chat;
  }

  if (file) {
    console.log("aqui", file);

    const serverData = new FormData();
    serverData.append("data", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat-speech-text/${chatId}`,
      {
        method: "POST",
        body: serverData,
      }
    );

    const data = await response.json();
    revalidateTag("chat-history");
    return data as Chat;
  }
}

export { sendQuestion };
