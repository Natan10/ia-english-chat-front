type ChatHeaderProps = {
  chatId: string;
  createdAt: Date;
};

export function ChatHeader({ chatId, createdAt }: ChatHeaderProps) {
  return (
    <div className="space-y-2">
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
            {new Date(createdAt).toLocaleDateString("pt-br", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
