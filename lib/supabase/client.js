import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client untuk Client Components (browser).
 * Otomatis membaca sesi dari cookies.
 * Jika URL / Key belum diatur di .env.local, mengembalikan null (fallback aman).
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
