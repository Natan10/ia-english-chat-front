"use server";
import { createClient } from "@/utils/clients/supabase-server-client";

export async function deleteChatById(chatId: string) {
  const supabase = createClient();
  await supabase.from("chatHistory").delete().eq("id", chatId);
}
