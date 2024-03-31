"use client";

import { ReactNode, createContext } from "react";
import { Toaster } from "sonner";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <NotificationContext.Provider value={null}>
      {children}
      <Toaster richColors closeButton />
    </NotificationContext.Provider>
  );
}
