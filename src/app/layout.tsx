import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarMenu } from "@/components/menu/sidebar-menu";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AI English Tutor",
  description: "IA Tutor for english learners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${poppins.variable} `}>
        <main
          className={`
          min-h-screen overflow-hidden 
          grid grid-cols-[200px_auto]
          bg-slate-100
        `}
        >
          <SidebarMenu />
          <section className="">{children}</section>
        </main>
      </body>
    </html>
  );
}
