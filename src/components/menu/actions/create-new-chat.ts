"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type ChatHistoryResponse = {
  chatId: string;
};

export async function createNewChat() {
  const chatResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-chat`,
    {
      method: "POST",
    }
  );
  const { chatId } = (await chatResponse.json()) as ChatHistoryResponse;
  revalidateTag("chats");
  redirect(`/dashboard/${chatId}`);
}
