"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { updateTitle } from "./actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function handleUpdateTitle(newTitle: string) {
    try {
      await updateTitle(chatId, newTitle.toString());
      setTitle(newTitle.toString());
    } catch (e) {
      toast.error("Erro on update title");
    } finally {
      setIsOpenModal(false);
    }
  }

  // async function handleUpdateTitle(e: any) {
  //   if (e.key === "Escape") {
  //     setTitle(chatTitle || chatId);
  //     setIsEditing(false);
  //     return;
  //   }

  //   if (e.key === "Enter") {
  //     if (title !== (chatTitle || chatId)) {
  //       try {
  //         await updateTitle(chatId, title);
  //         setIsEditing(false);
  //         return;
  //       } catch {
  //         toast.error("Error on update title, try again");
  //       }
  //     } else {
  //       setTitle(chatTitle || chatId);
  //       setIsEditing(false);
  //       return;
  //     }
  //   }
  // }

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
              <button onClick={() => setIsOpenModal((old) => !old)}>
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

          <ChatHeaderTitleModal
            oldTitle={chatTitle || chatId}
            open={isOpenModal}
            setOpen={setIsOpenModal}
            updateTitle={handleUpdateTitle}
          />
        </div>
      )}
    </div>
  );
}

function ChatHeaderTitleModal({
  oldTitle,
  open,
  setOpen,
  updateTitle,
}: {
  oldTitle: string;
  open: boolean;
  setOpen: (data: boolean) => void;
  updateTitle: (e: string) => Promise<void>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold">
            Do you want to change the title?
          </DialogTitle>
        </DialogHeader>
        <div>
          <form
            action={async (e) => {
              const newTitle = e.get("title");
              if (!newTitle) return null;
              await updateTitle(newTitle.toString());
            }}
          >
            <div className="mb-3">
              <Input
                defaultValue={oldTitle}
                type="text"
                id="title"
                name="title"
                className="text-sm"
              />
            </div>
            <div className="flex justify-end items-center gap-3">
              <Button className="text-xs font-poppins" type="submit" size="sm">
                Confirm
              </Button>
              <Button
                className="text-xs font-poppins"
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => setOpen(!open)}
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
