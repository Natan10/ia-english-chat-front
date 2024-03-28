import { Chat } from "@/domain/chat";
import { AudioLines } from "lucide-react";
import Link from "next/link";

type ChatUserProps = {
  data: Chat;
};

export function CardUserContent({ data }: ChatUserProps) {
  return (
    <div className=" bg-white px-3 py-2 rounded-l-[8px] rounded-br-[8px] max-w-2xl">
      <div className="flex flex-col mb-1">
        <span className="text-slate-900 text-[10px]">
          {new Date(data.createdAt).toLocaleDateString("pt-br", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      {data.file ? (
        <div className="flex gap-3">
          <Link
            href={data.file.url}
            className="group flex-1 flex items-center justify-center"
            target="_blank"
          >
            <div className="p-2 rounded-full border border-black/30 group-hover:border-blue-600 transition-all">
              <AudioLines size={18} className="group-hover:text-blue-600" />
            </div>
          </Link>
          <div className="overflow-hidden">
            <p className="text-xs text-slate-800 font-medium truncate">
              {data.file.fileName}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-800/65 text-xs font-light">
                {data.file.format}
              </span>
              <span className="text-slate-800/65 text-xs font-light">
                {data.file.size}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className=" text-slate-950 text-sm font-light">{data.content}</p>
      )}
    </div>
  );
}
