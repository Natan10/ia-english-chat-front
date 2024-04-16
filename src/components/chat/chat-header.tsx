"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { updateTitle } from "./actions";

type ChatHeaderProps = {
  chatId: string;
  chatTitle?: string | null;
  createdAt?: Date;
  isLoading?: boolean;
};

export function ChatHeader({
  chatId,
  chatTitle,
  createdAt,
  isLoading = false,
}: ChatHeaderProps) {
  const [title, setTitle] = useState(chatTitle || chatId);
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdateTitle(e: any) {
    if (e.key === "Escape") {
      setTitle(chatTitle || chatId);
      setIsEditing(false);
      return;
    }

    if (e.key === "Enter") {
      if (title !== (chatTitle || chatId)) {
        try {
          await updateTitle(chatId, title);
          setIsEditing(false);
          return;
        } catch {
          toast.error("Error on update title, try again");
        }
      } else {
        setTitle(chatTitle || chatId);
        setIsEditing(false);
        return;
      }
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16" />
            <Skeleton className="w-12" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-5" />
            <Skeleton className="w-8" />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-slate-900">Chat History</h1>
            <div className="flex items-center gap-3">
              <div className="min-w-40">
                {isEditing ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyUp={handleUpdateTitle}
                    className={cn(
                      "box-border w-full text-xs md:text-sm outline-none bg-transparent text-muted-foreground border-b border-blue-500"
                    )}
                  />
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {title}
                  </p>
                )}
              </div>
              <button onClick={() => setIsEditing((old) => !old)}>
                <Pencil className="text-muted-foreground" size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-[10px] text-end">
              Created At
            </span>
            <span className="text-xs">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("pt-br", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
