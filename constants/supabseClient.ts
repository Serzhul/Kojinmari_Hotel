// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

export const supabaseUrl = 'https://hqmlcxohodigzkifhxpp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey ?? '', {
  auth: { persistSession: false },
})

// const supabase = createServerComponentClient({
//   cookies,
// })

export default supabase
