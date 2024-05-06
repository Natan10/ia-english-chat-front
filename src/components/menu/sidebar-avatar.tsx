import { LogOut } from "lucide-react";
import * as Avatar from "../ui/avatar";
import { User } from "@/contexts/supabase-context";

type SidebarAvatarProps = {
  handleSignout: () => Promise<void>;
  user: User | null;
};

export function SidebarAvatar({ user, handleSignout }: SidebarAvatarProps) {
  if (!user) return null;

  return (
    <div className="mt-auto px-4 py-5 flex flex-col gap-4">
      <div className="border-t border-t-slate-300" />
      <div className="flex items-center gap-3">
        <Avatar.Avatar>
          <Avatar.AvatarImage src={user.avatar} />
          <Avatar.AvatarFallback>NT</Avatar.AvatarFallback>
        </Avatar.Avatar>
        <span className="text-[10px] font-light truncate">{user.email}</span>
        <button className="outline-none group" onClick={handleSignout}>
          <LogOut
            size={16}
            className="group-hover:text-red-500 transition-colors"
          />
        </button>
      </div>
    </div>
  );
}
