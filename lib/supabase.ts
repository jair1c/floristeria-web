import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Service role key — NUNCA la expongas al cliente (no tiene NEXT_PUBLIC_)
// Úsala solo en API routes y Server Actions
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseEnabled() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/** Cliente con anon key — para leer datos públicos (productos, categorías) */
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase no está configurado.');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Cliente con service_role key — bypasea RLS completamente.
 * Úsalo SOLO en código de servidor: API routes, Server Actions, lib/orders.ts
 */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY no está configurada. Agrégala a tu .env.local'
    );
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

export const SUPABASE_PRODUCTS_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? 'product-images';