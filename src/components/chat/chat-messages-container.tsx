import { ReactNode } from "react";

export function ChatMessagesContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {children}
    </div>
  );
}
