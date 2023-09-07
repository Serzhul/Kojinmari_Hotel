import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getRoomViews(roomId: string) {
  const supabase = createServerComponentClient({ cookies })

  let { data: reviews } = await supabase
    .from('reviews')
    .select('id, rate, contents,images, guestId, guests(email)')
    .eq('roomId', roomId)

  return reviews
}

export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get('roomId')

  if (!roomId)
    return NextResponse.json(
      {
        error: 'There is no roomId',
      },
      {
        status: 400,
      },
    )

  const reviews = await getRoomViews(roomId)

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
