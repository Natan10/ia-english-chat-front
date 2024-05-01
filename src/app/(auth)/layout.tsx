import { SidebarMenu } from "@/components/menu/sidebar-menu";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`h-screen max-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-[200px_auto] bg-slate-100
  `}
    >
      {/* <SidebarMenu /> */}
      <section className="overflow-hidden">{children}</section>
    </main>
  );
}
