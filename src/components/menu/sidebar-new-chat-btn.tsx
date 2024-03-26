"use client";

import { useFormStatus } from "react-dom";
import { CirclePlus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export function SidebarNewChatBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full rounded-full flex items-center gap-2"
      disabled={pending}
    >
      <span className="text-xs">New Chat</span>
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <CirclePlus size={16} />
      )}
    </Button>
  );
}
