"use client";

import { Chat } from "@/domain/chat";
import * as Avatar from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { User } from "lucide-react";

type ChatAiUserProps = {
  data: Chat;
};

export function ChatAiUser({ data }: ChatAiUserProps) {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex gap-2 flex-row-reverse">
      {isLoaded ? (
        <Avatar.Avatar className="size-6 md:size-10">
          <Avatar.AvatarImage src={user?.imageUrl} />
          <Avatar.AvatarFallback>
            <User size={20} className="text-white" />
          </Avatar.AvatarFallback>
        </Avatar.Avatar>
      ) : (
        <Skeleton className="size-6 md:size-10 rounded-full" />
      )}

      <div className=" bg-white px-3 py-2 rounded-l-[8px] rounded-br-[8px] max-w-2xl">
        <div className="flex flex-col mb-1">
          <span className="text-slate-900 text-[10px]">
            {new Date(data.createdAt).toLocaleDateString("pt-br", {
              minute: "numeric",
              second: "numeric",
            })}
          </span>
        </div>
        <p className=" text-slate-950 text-sm font-light">{data.content}</p>
      </div>
    </div>
  );
}
