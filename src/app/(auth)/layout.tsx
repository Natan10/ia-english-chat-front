import { ReactNode } from "react";
import { SidebarMenu } from "@/components/menu/sidebar-menu";
import { SupabaseProvider } from "@/contexts/supabase-context";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SupabaseProvider>
      <main
        className={`h-screen max-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-[200px_auto] bg-slate-100
      `}
      >
        <SidebarMenu />
        <section className="overflow-hidden">{children}</section>
      </main>
    </SupabaseProvider>
  );
}
