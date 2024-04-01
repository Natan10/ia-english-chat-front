import { Skeleton } from "../ui/skeleton";

type ChatHeaderProps = {
  chatId: string;
  createdAt?: Date;
  isLoading?: boolean;
};

export function ChatHeader({
  chatId,
  createdAt,
  isLoading = false,
}: ChatHeaderProps) {
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
            <span className="text-xs text-muted-foreground">{chatId}</span>
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
