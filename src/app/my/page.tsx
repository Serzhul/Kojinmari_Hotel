import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MyPage from './MyPage'
import { redirect } from 'next/navigation'

export default async function Post() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/unauthenticated')
  }

  return <MyPage />
}
