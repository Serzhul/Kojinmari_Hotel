import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Database } from 'types/supabase'

interface ReviewsType extends Database {
  bookings: {
    roomId: number
  }
}

async function getReviews(guestId: string) {
  const supabase = createServerComponentClient({ cookies })

  let { data: reviews } = await supabase
    .from('reviews')
    .select('rate, contents, images, bookings(roomId)')
    .eq('guestId', guestId)
    .returns<ReviewsType[]>()

  const roomIds = reviews?.map((review) => review.bookings.roomId)

  if (!roomIds) return null

  if (roomIds) {
    let { data: rooms } = await supabase
      .from('rooms')
      .select('name,id')
      .in('id', roomIds)

    const reviewsWithRoomName = reviews?.map((review, idx) => {
      if (rooms && rooms[idx])
        return {
          ...review,
          name: rooms[idx].name,
          roomId: rooms[idx].id,
        }
    })

    return reviewsWithRoomName
  }
}

export async function GET() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const guestId = user?.id

  if (!guestId)
    return NextResponse.json(
      {
        error: 'There is no guestId',
      },
      {
        status: 400,
      },
    )

  const reviews = await getReviews(guestId)

  return NextResponse.json(
    {
      message: 'Review loaded successfully',
      items: reviews,
    },
    {
      status: 200,
    },
  )
}
