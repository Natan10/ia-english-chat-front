"use server";

import { ChatStatus } from "@/domain/chat-history";
import { createClient } from "@/utils/clients/supabase-server-client";
import { redirect } from "next/navigation";

export async function createNewChat() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect("signin");

  if (error) throw error;

  await supabase
    .from("chatHistory")
    .insert([
      {
        title: null,
        status: ChatStatus.Active,
        user_id: user.id,
      },
    ])
    .select();
}
