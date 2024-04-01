import { ForwardedRef, ReactNode, forwardRef } from "react";

const ChatMessagesContainer = forwardRef(
  (
    { children }: { children: ReactNode },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className="mt-4 flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide"
      >
        {children}
      </div>
    );
  }
);

ChatMessagesContainer.displayName = "ChatMessagesContainer";
export { ChatMessagesContainer };
