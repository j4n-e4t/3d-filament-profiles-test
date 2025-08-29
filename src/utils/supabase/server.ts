import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { env } from "@/env";

// the usual server-side supabase client that gets the cookies from the request to handle RLS in Supabase
// since it gets the cookies from the request, it can't access the db without forcing the page to be dynamic and therefore it can't be cached by next
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
}
// the admin client that doesn't get the cookies from the request and therefore has full access to the database
// it can access the db without forcing the page to be dynamic and therefore it can be cached by next
export async function createSupabaseServerAdminClient() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
