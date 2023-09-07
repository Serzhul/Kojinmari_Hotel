import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getReview(reviewId: string) {
  const supabase = createServerComponentClient({ cookies })

  let { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', reviewId)

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

export async function GET(req: NextRequest) {
  const reviewId = await req.json()

  if (!reviewId)
    return NextResponse.json(
      {
        error: 'There is no reviewId',
      },
      {
        status: 400,
      },
    )

  const review = await getReview(reviewId)

  return NextResponse.json(
    {
      message: 'Review loaded successfully',
      items: review,
    },
    {
      status: 200,
    },
  )
}
