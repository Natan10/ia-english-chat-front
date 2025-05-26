"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Empty } from "@/components/animate/empty";
import { ChatContainer } from "@/components/chat/chat-container";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessagesContainer } from "@/components/chat/chat-messages-container";
import { Separator } from "@/components/ui/separator";
import { ChatType } from "@/domain/chat-type";
import { CardUser } from "@/components/chat/cards/card-user/card-user";
import { CardAi } from "@/components/chat/cards/card-ai/card-ai";
import { CardLoad } from "@/components/chat/cards/card-load";
import { onError, onMutate, onSettled } from "./mutation-functions";
import { LoadMessages } from "@/components/animate/load-messages";
import { useSupabase } from "@/contexts/supabase-context";
import { getChatHistoryById } from "./actions/get-chat-history-by-id";
import { sendQuestion } from "./actions/send-question";

export default function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  const { supabase, user } = useSupabase();
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatItemRef = useRef<HTMLDivElement>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["chat-history", chatId],
    queryFn: async () => {
      if (!user) return null;
      try {
        return await getChatHistoryById({ user, chatId, supabase });
      } catch (err) {
        toast.error("Error on load");
      }
      return null;
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!user) return null;
      formData.append("chat-id", chatId);
      const response = await sendQuestion(formData);
      console.log({ response });
      return response;
    },
    onMutate: async (variables) => await onMutate(chatId, variables),
    onError: (error, variables, context) => onError(chatId, context),
    onSettled: async () => await onSettled(chatId),
  });

  async function sendRequest(formData: FormData) {
    try {
      if (!formData.get("file-upload") && !formData.get("user-question")) {
        toast.info("Envie uma pergunta valida");
        return;
      }
      await mutation.mutateAsync(formData);
      formRef.current?.reset();
      setFileUpload(null);
    } catch (e) {
      toast.error("Erro ao enviar pergunta, tente novamente");
    }
  }

  useEffect(() => {
    if (mutation.isPending) {
      chatItemRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [mutation]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
    });
  }, []);

  return isLoading ? (
    <LoadMessages />
  ) : (
    <section className="h-full p-10">
      <ChatContainer>
        <ChatHeader
          chatId={chatId}
          chatTitle={data?.title}
          createdAt={data?.createdAt}
          isLoading={isLoading && !data}
        />
        <Separator className="bg-slate-400 h-[1px] my-3" />
        {data && (
          <>
            <ChatMessagesContainer ref={containerRef}>
              {data.history.length > 0 ? (
                data.history.map((chatResponse) => {
                  return chatResponse.type === ChatType.IA ? (
                    <CardAi key={chatResponse.id} data={chatResponse} />
                  ) : (
                    <CardUser key={chatResponse.id} data={chatResponse} />
                  );
                })
              ) : (
                <Empty />
              )}
              {mutation.isPending && <CardLoad type="IA" ref={chatItemRef} />}
            </ChatMessagesContainer>
            <form
              action={sendRequest}
              onSubmit={(e) =>
                mutation.isPending ? e.preventDefault() : undefined
              }
              ref={formRef}
            >
              <ChatInput
                file={fileUpload}
                setFile={setFileUpload}
                isLoading={mutation.isPending}
              />
            </form>
          </>
        )}
      </ChatContainer>
    </section>
  );
}
