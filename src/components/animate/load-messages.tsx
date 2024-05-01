import Lottie from "lottie-react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import animation from "@/assets/animations/load-messages.json";

export function LoadMessages() {
  return (
    <section className="h-full p-10 flex flex-col">
      <div className="flex items-center justify-between">
        <Skeleton className="w-48 h-5 bg-gray-400" />
        <Skeleton className="w-12 h-5 bg-gray-400" />
      </div>
      <Separator className="bg-slate-400 h-[1px] my-3" />
      <div className="flex-1 w-full h-full flex justify-center items-center">
        <Lottie
          animationData={animation}
          loop={true}
          className="size-24 md:size-60"
        />
      </div>
      <div>
        <Skeleton className="w-full h-20 bg-gray-400" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-6 w-12 bg-gray-400" />
          <Skeleton className="h-6 w-12 bg-gray-400" />
        </div>
      </div>
    </section>
  );
}
