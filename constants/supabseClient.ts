import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

export const supabaseUrl = 'https://hqmlcxohodigzkifhxpp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey ?? '', {
  auth: { persistSession: false },
})

export default supabase
