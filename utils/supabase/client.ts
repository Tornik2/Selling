import { createBrowserClient } from '@supabase/ssr';

// createBrowserClient: This function is from the @supabase/ssr package
// and is specifically designed for server-side rendering (SSR) environments like Next.js.
//  It sets up a Supabase client for interacting with your Supabase backend.
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
