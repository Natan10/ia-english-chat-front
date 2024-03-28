import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CardLoadProps = {
  type: "IA" | "USER";
};

export function CardLoad({ type }: CardLoadProps) {
  return (
    <Skeleton
      className={cn(
        `rounded-l-[8px]  max-w-2xl`,
        type === "IA" ? "rounded-br-[8px]" : "rounded-bl-[8px]"
      )}
    />
  );
}
