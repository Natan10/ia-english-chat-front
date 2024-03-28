import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

import * as Avatar from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function CardUserAvatar() {
  const { user, isLoaded } = useUser();

  return (
    <>
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
    </>
  );
}
