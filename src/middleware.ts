import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/clients/supabase-server-client";
import { redirect } from "next/navigation";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    headers: req.headers,
  });
  const supabase = createClient();
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
