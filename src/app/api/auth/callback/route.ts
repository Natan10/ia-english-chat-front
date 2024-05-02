import { NextResponse } from "next/server";
import { createClient } from "@/utils/clients/supabase-server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(origin);
    }
  }
  return NextResponse.redirect("signin");
}
