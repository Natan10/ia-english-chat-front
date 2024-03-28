import { ReactNode } from "react";

export function CardUserContainer({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 flex-row-reverse">{children}</div>;
}
