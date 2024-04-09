"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { Empty } from "@/components/animate/empty";
import { ChatContainer } from "@/components/chat/chat-container";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessagesContainer } from "@/components/chat/chat-messages-container";
import { Separator } from "@/components/ui/separator";
import { ChatHistory } from "@/domain/chat-history";
import { ChatType } from "@/domain/chat-type";
import { CardUser } from "@/components/chat/cards/card-user/card-user";
import { CardAi } from "@/components/chat/cards/card-ai/card-ai";
import { CardLoad } from "@/components/chat/cards/card-load";
import { sendQuestion } from "./actions";
import { onError, onMutate, onSettled } from "./mutation-functions";

async function getChatHistory(chatId: string, userEmail: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat-history/${chatId}/${userEmail}`,
      {
        next: {
          tags: ["chat-history"],
        },
      }
    );
    const data = await response.json();
    return data as ChatHistory;
  } catch (e) {
    toast.error(`Erro ao trazer mensagens do: ${chatId}`);
  }
}

export default function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  const { user, isLoaded } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatItemRef = useRef<HTMLDivElement>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["chat-history", chatId],
    queryFn: async () =>
      await getChatHistory(chatId, user?.emailAddresses[0].emailAddress || ""),
    refetchOnWindowFocus: false,
    enabled: isLoaded,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append("chat-id", chatId);
      formData.append("user-email", user?.emailAddresses[0].emailAddress || "");
      const response = await sendQuestion(formData);
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

  return (
    <section className="h-full p-10">
      <ChatContainer>
        <ChatHeader
          chatId={chatId}
          createdAt={data?.createdAt}
          isLoading={isLoading}
        />
        <Separator className="bg-slate-400 h-[1px] my-3" />
        {isLoading && (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <LoaderCircle
              size={30}
              className="animate-spin text-muted-foreground"
            />
            <p className="text-muted-foreground">Carregando mensagens...</p>
          </div>
        )}
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
