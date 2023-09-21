import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import RoomReviewPage from './RoomReviewPage'

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params
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

  return <RoomReviewPage roomId={id} />
}
