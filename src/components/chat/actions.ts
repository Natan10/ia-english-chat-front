"use server";

import { currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { chatOptions } from "@/routes/api-endpoints";

export async function updateTitle(chatId: string, title: string) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${chatOptions}/${chatId}/${user?.emailAddresses[0].emailAddress}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        title: title.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidateTag("chats");
}
