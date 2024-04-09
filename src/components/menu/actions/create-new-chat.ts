"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type ChatHistoryResponse = {
  chatId: string;
};

export async function createNewChat() {
  const user = await currentUser();

  if (!user) {
    redirect(`/`);
  }

  const chatResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/start-chat`,
    {
      method: "POST",
      body: JSON.stringify({
        email: user.emailAddresses[0].emailAddress,
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const { chatId } = (await chatResponse.json()) as ChatHistoryResponse;
  revalidateTag("chats");
  redirect(`/dashboard/${chatId}`);
}
