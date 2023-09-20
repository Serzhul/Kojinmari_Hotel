import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import BookingPage from './BookingPage'
import { IRoom } from 'constants/interfaces'

export interface IBooking {
  endDate: string | null
  extrasPrice: number | null
  guestId: string | null
  hasBreakfast: boolean | null
  id: number | undefined
  isPaid: boolean | null
  numGuests: number | null
  numNights: number | null
  observations: string | null
  roomId: number | null
  roomPrice: number | null
  startDate: string | null
  status: string | null
  totalPrice: number | null
  rooms?: IRoom
  hasReview?: boolean
}

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

  return <BookingPage />
}
