import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function updateWishlist(userId: string, roomId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    let { data } = await supabase
      .from('wishlists')
      .select('roomIds')
      .eq('userId', userId)
      .single()

    const originWishList =
      data && data?.roomIds !== null && data?.roomIds !== ''
        ? data?.roomIds.split(',')
        : []

    const isWished = originWishList.includes(roomId)

    const newWishlist = isWished
      ? originWishList?.filter((id: string) => id !== roomId)
      : [...originWishList, roomId]

    const { data: wishlists } = await supabase
      .from('wishlists')
      .upsert({ userId, roomIds: newWishlist.join(',') })
      .eq('userId', userId)
      .select()

    return wishlists
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const { userId, roomId } = await req.json()

  if (!userId || !roomId) {
    return NextResponse.json(
      {
        message: 'No UserId or RoomId',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const wishlists = await updateWishlist(userId, roomId)

    return NextResponse.json(
      {
        message: 'wishlists updated successfully',
        items: wishlists,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to update wishlists',
      },
      {
        status: 400,
      },
    )
  }
}
