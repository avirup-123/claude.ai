import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase server client — use in Server Components, Route Handlers, and
 * Server Actions. Uses the service-role key for elevated privileges.
 *
 * ⚠️  Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
