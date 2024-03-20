import { BotMessageSquare } from "lucide-react";

export function ChatAiAnswer() {
  return (
    <div className="flex gap-2">
      <div className="size-6 md:size-10 bg-blue-700 rounded-full flex items-center justify-center">
        <BotMessageSquare size={20} className="text-white" />
      </div>

      <div className=" bg-slate-900 px-3 py-2 rounded-r-[8px] rounded-bl-[8px] max-w-2xl w-full">
        <div className="flex flex-col mb-1">
          <span className="text-slate-50/60 text-[10px]">Data</span>
          <span className="text-slate-50 text-xs">
            {new Date().toLocaleDateString("pt-br", {
              minute: "numeric",
              second: "numeric",
            })}
          </span>
        </div>
        <p className=" text-slate-50 text-sm font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nihil,
          cumque beatae laboriosam ipsa rerum voluptas qui quas vel tenetur
          optio alias quis praesentium ipsum provident sequi. Voluptatum, et ad.
          psa rerum voluptas qui quas vel tenetur optio alias quis praesentium
          ipsum provident sequi. Voluptatum, et ad. psa rerum voluptas qui quas
          vel tenetur optio alias quis praesentium ipsum provident sequi.
          Voluptatum, et ad.
        </p>
      </div>
    </div>
  );
}
