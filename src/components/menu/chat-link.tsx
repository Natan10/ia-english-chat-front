"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteChatById } from "./actions/delete-chat-by-id";
import { queryClient } from "@/contexts/query-context";
import { useSupabase } from "@/contexts/supabase-context";

export type ChatLinkProps = {
  chatId: string;
  chatTitle: string | null;
};

export function ChatLink({ chatId, chatTitle }: ChatLinkProps) {
  const { user } = useSupabase();
  const pathname = usePathname();
  const redirectTo = `/dashboard/${chatId}`;
  const isActive = pathname === redirectTo;

  async function onDelete() {
    try {
      await deleteChatById(chatId);
      await queryClient.refetchQueries({ queryKey: ["user-chats", user?.id] });
      toast.success(`Chat ${chatTitle || chatId} removido com sucesso`);
    } catch (err) {
      toast.error(`Erro ao deletar ${chatTitle || chatId}`);
    }
  }

  return (
    <div
      data-active={isActive}
      className={`
        p-2 flex items-center gap-2 
        border border-slate-400 rounded-xl
        hover:border-slate-900
        hover:cursor-pointer
        data-[active=true]:border-blue-600
        transition-all
        group
      `}
    >
      <Link href={redirectTo} className="flex items-center gap-2 w-full">
        <MessageSquare
          size={12}
          className="group-data-[active=true]:text-blue-600"
        />
        <p className="max-w-[120px] text-xs font-medium truncate text-slate-800 group-data-[active=true]:text-blue-600">
          {chatTitle || chatId}
        </p>
      </Link>
      <ChatLinkOptions isActiveLink={isActive} onDelete={onDelete} />
    </div>
  );
}

function ChatLinkOptions({
  isActiveLink,
  onDelete,
}: {
  isActiveLink: boolean;
  onDelete: () => Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none rotate-90 group-data-[active=true]:text-blue-600">
          ...
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full cursor-pointer outline-none disabled:text-gray-500"
            onClick={onDelete}
            disabled={isActiveLink}
          >
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
