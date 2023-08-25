import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

async function updateWishlist(userId: string, roomId: string) {
  let { data } = await supabase.from('wishlists').select('roomIds')

  const originWishList =
    data && data[0].roomIds !== null && data[0]?.roomIds !== ''
      ? data[0]?.roomIds.split(',')
      : []

  const isWished = originWishList.includes(roomId)

  const newWishlist = isWished
    ? originWishList?.filter((id: string) => id !== roomId)
    : [...originWishList, roomId]

  const { data: wishlists } = await supabase
    .from('wishlists')
    .update({ roomIds: newWishlist.join(',') })
    .eq('userId', userId)
    .select()

  return wishlists
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
