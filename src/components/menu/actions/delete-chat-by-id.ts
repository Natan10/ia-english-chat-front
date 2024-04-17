"use server";

import { revalidateTag } from "next/cache";
import { deleteChat } from "@/routes/api-endpoints";

export async function deleteChatById(chatId: string, userEmail: string) {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${deleteChat}/${chatId}/${userEmail}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  revalidateTag("chats");
}
