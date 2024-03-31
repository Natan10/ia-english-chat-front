import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

import { NotificationProvider } from "@/contexts/notification-context";
import { QueryProvider } from "@/contexts/query-context";
import "./globals.css";

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
    <ClerkProvider>
      <html>
        <NotificationProvider>
          <QueryProvider>
            <body className={`${poppins.variable}`}>{children}</body>
          </QueryProvider>
        </NotificationProvider>
      </html>
    </ClerkProvider>
  );
}
