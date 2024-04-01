import { v4 as uuidv4 } from "uuid";

import { queryClient } from "@/contexts/query-context";
import { Chat } from "@/domain/chat";
import { ChatHistory } from "@/domain/chat-history";
import { ChatType } from "@/domain/chat-type";

const chatHistoryKey = (chatId: string) => ["chat-history", chatId];

const onMutate = async (chatId: string, variables: FormData) => {
  const key = chatHistoryKey(chatId);
  await queryClient.cancelQueries({ queryKey: key });

  const userQuestion = variables.get("user-question");
  const file = variables.get("file-upload") as File;

  const chatItemId = uuidv4();
  const optmisticChatItem: Chat = {
    id: chatItemId,
    chatHistoryId: chatId,
    content: (userQuestion as string) || "",
    file:
      file && file.name
        ? {
            chatItemId,
            createdAt: new Date(Date.now()),
            fileName: file.name,
            format: file.type,
            size: file.size.toString(),
            url: "#",
          }
        : null,
    createdAt: new Date(Date.now()),
    type: ChatType.USER,
  };

  const prevState = queryClient.getQueryData<ChatHistory>(key);

  queryClient.setQueryData(key, (old: ChatHistory) => {
    return {
      ...old,
      history: [...old.history, optmisticChatItem],
    };
  });

  return { prevState: prevState, newState: optmisticChatItem };
};

const onSettled = async (chatId: string) => {
  await queryClient.invalidateQueries({ queryKey: ["chat-history", chatId] });
};

const onError = async (
  chatId: string,
  context: { prevState?: ChatHistory; newState: Chat } | undefined
) => {
  queryClient.setQueryData(["chat-history", chatId], context?.prevState);
};

export { onMutate, onError, onSettled };
