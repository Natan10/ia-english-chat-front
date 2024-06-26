import { Chat } from "./chat";

export interface ChatHistory {
  id: string;
  status: ChatStatus;
  title: string | null;
  history: Chat[];
  createdAt: Date;
}

export enum ChatStatus {
  Inactive = 0,
  Active = 1,
}
