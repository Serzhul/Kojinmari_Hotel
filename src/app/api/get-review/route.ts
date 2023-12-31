import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getReview(reviewId: string) {
  const supabase = createServerComponentClient({ cookies })

  let { data: review } = await supabase
    .from('reviews')
    .select('id, guestId, rate,contents, images, rooms(name,id)')
    .eq('id', reviewId)
    .single()

  return review
}

export async function GET(req: NextRequest) {
  const reviewId = req.nextUrl.searchParams.get('reviewId')

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
