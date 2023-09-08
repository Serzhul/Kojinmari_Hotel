import { IReview } from '@/app/review/[id]/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function updateReview({
  reviewId,
  reviewContent,
}: {
  reviewId: string
  reviewContent: IReview
}) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data: review } = await supabase
      .from('reviews')
      .update({ ...reviewContent })
      .eq('id', reviewId)
      .select()

    console.log(review)
    return review
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const { reviewId, reviewContent } = await req.json()

  if (!reviewId || !reviewContent) {
    return NextResponse.json(
      {
        message: 'No reviewId or reviewContent',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const review = await updateReview({
      reviewId,
      reviewContent,
    })

    return NextResponse.json(
      {
        message: 'review updated successfully',
        items: review,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to update review',
      },
      {
        status: 400,
      },
    )
  }
}
