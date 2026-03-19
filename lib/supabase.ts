import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function isSupabaseEnabled() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase no está configurado.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export const SUPABASE_PRODUCTS_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? 'product-images';