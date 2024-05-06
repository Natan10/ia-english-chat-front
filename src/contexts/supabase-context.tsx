"use client";

import { createClient } from "@/utils/clients/supabase-browser-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: string;
  email?: string;
  avatar?: string;
};

type SupabaseContext = {
  supabase: SupabaseClient;
  user: User | null;
  setUser: (data: User | null) => void;
};

const SupabaseContext = createContext<SupabaseContext>({} as SupabaseContext);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [load, setLoad] = useState(true);
  const [supabase] = useState(() => createClient());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("signin");
        return;
      }
      setCurrentUser({
        id: user.id,
        email: user.email,
        avatar: user.user_metadata.avatar_url,
      });

      setLoad(false);
    };

    getUserData();
  }, [router, supabase.auth]);

  return (
    <SupabaseContext.Provider
      value={{ supabase, user: currentUser, setUser: setCurrentUser }}
    >
      {!load && children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
