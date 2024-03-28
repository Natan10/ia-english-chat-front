import { Chat } from "@/domain/chat";

type CardAiContentProps = {
  data: Chat;
};

export function CardAiContent({ data }: CardAiContentProps) {
  return (
    <div className=" bg-slate-900 px-3 py-2 rounded-r-[8px] rounded-bl-[8px] max-w-2xl w-full">
      <div className="flex flex-col mb-1">
        <span className="text-muted-foreground text-[10px]">
          {new Date(data.createdAt).toLocaleDateString("pt-br", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      <p className=" text-slate-50 text-sm font-light">{data.content}</p>
    </div>
  );
}
