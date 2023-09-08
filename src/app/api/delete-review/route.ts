import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function deleteReview(reviewId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('reviews').delete().eq('id', reviewId)
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const { id: reviewId } = await req.json()

  if (!reviewId)
    return NextResponse.json(
      {
        error: 'There is no reviewId',
      },
      {
        status: 400,
      },
    )

  await deleteReview(reviewId)

  return NextResponse.json(
    {
      message: 'review deleted successfully',
    },
    {
      status: 200,
    },
  )
}
