export function ChatAiUser() {
  return (
    <div className="flex gap-2 flex-row-reverse">
      <div className="size-6 md:size-10 bg-red-700 rounded-full flex items-center justify-center">
        <span className="uppercase text-sm font-medium text-white">Nt</span>
      </div>

      <div className=" bg-white px-3 py-2 rounded-l-[8px] rounded-br-[8px] max-w-2xl">
        <div className="flex flex-col mb-1">
          <span className="text-slate-900/60 text-[10px]">Data</span>
          <span className="text-slate-900 text-xs">
            {new Date().toLocaleDateString("pt-br", {
              minute: "numeric",
              second: "numeric",
            })}
          </span>
        </div>
        <p className=" text-slate-950 text-sm font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
        </p>
      </div>
    </div>
  );
}
