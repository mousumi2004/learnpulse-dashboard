import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseReadClient() {
  if (!supabaseUrl || !publishableKey) {
    return null;
  }

  return createClient(supabaseUrl, publishableKey, {
    auth: {
      persistSession: false
    }
  });
}

export function getSupabaseMutationClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function getSupabaseWriteStatus() {
  if (!supabaseUrl || !publishableKey) {
    return {
      canWrite: false,
      reason: "Live data connection is not configured."
    };
  }

  if (!serviceRoleKey) {
    return {
      canWrite: false,
      reason: "Editing is currently unavailable because secure write access is not configured."
    };
  }

  return {
    canWrite: true,
    reason: "Changes are saved securely to the learning workspace."
  };
}
