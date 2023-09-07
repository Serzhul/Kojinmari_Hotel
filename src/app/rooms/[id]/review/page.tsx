'use client'

import CustomEditor from '@components/Editor'
// import { useSession } from '@supabase/auth-helpers-react'

export interface IReview {
  id: string
  guestId: string
  bookingId: number
  rate: number
  contents: string
  images: string
  name: string
}
// { params }: { params: { id: string } }
function ReviewEditPage() {
  // const { id } = params
  // const session = useSession()
  // const guestId = session?.user.id

  return <CustomEditor content="" />
}

export default ReviewEditPage
