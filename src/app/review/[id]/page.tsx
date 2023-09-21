import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ReviewEditPage from './ReviewEditPage'

export interface IReview {
  id: string | undefined
  guestId: string
  bookingId: number
  roomId: string
  rate: number
  contents: string
  images: string | null
  guests?: {
    email: string
  }
  rooms?: {
    id: string
    name: string
  }
}

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

  return <ReviewEditPage reviewId={id} />
}
