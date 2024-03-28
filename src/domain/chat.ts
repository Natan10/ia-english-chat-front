import { ChatFile } from "./chat-file";
import { ChatType } from "./chat-type";

export interface Chat {
  id: string;
  content: string;
  chatHistoryId: string;
  type: ChatType;
  file: ChatFile | null;
  createdAt: Date;
}
