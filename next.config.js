/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gmygbugdjlgycfudnihi.supabase.co',
      'hqmlcxohodigzkifhxpp.supabase.co',
    ],
  },
  supabase: {
    client: {
      auth: {
        persistSession: false, //or true
      },
    },
  },
}

module.exports = nextConfig
