import { ReactNode } from "react";

export function ChatContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
