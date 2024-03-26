import { ChatType } from "./chat-type";

export interface Chat {
  id: string;
  content: string;
  chatHistoryId: string;
  type: ChatType;
  createdAt: Date;
}
