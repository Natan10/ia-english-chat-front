"use client";

import { createClient } from "@/utils/clients/supabase-browser-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useState } from "react";

type SupabaseContext = {
  supabase: SupabaseClient;
};

const SupabaseContext = createContext<SupabaseContext>({} as SupabaseContext);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createClient());

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
