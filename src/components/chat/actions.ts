"use server";

import { currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { chatOptions } from "@/routes/api-endpoints";
import { createClient } from "@/utils/clients/supabase-server-client";

export async function updateTitle(chatId: string, title: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("chatHistory")
    .update({ title: title })
    .eq("id", chatId)
    .select();

  if (error) throw new Error(error.message);
}
