import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

type CardLoadProps = {
  type: "IA" | "USER";
};

const CardLoad = forwardRef(
  ({ type }: CardLoadProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className="flex gap-2" ref={ref}>
        <Skeleton
          className={cn(`bg-slate-200 size-6 md:size-10 rounded-full`)}
        />
        <Skeleton
          className={cn(
            `h-28 flex-1 flex gap-2 bg-slate-200 rounded-l-[8px]  max-w-2xl`,
            type === "IA" ? "rounded-br-[8px]" : "rounded-bl-[8px]"
          )}
        />
      </div>
    );
  }
);

CardLoad.displayName = "CardLoad";
export { CardLoad };
