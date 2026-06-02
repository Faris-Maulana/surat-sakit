import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co'))

let client: ReturnType<typeof createClient> | null = null

if (isSupabaseConfigured) {
  client = createClient(supabaseUrl, supabaseAnonKey)
}

export function getClient() {
  if (!client) {
    throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
  }
  return client
}
