"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import * as Avatar from "../ui/avatar";

export function SidebarAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();

  return (
    <div className="mt-auto px-4 py-5 flex flex-col gap-4">
      <div className="border-t border-t-slate-300" />
      <div className="flex items-center gap-3">
        <Avatar.Avatar>
          <Avatar.AvatarImage src={user?.imageUrl} />
          <Avatar.AvatarFallback>NT</Avatar.AvatarFallback>
        </Avatar.Avatar>
        <span className="text-[10px] font-light truncate">
          {user?.emailAddresses[0].emailAddress}
        </span>
        <button
          className="outline-none group"
          onClick={() => signOut(() => router.push("/signin"))}
        >
          <LogOut
            size={16}
            className="group-hover:text-red-500 transition-colors"
          />
        </button>
      </div>
    </div>
  );
}
