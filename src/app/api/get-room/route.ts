import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

async function getRoom(roomId: string) {
  let { data: room } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single()

  console.log(room)
  return room
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

  const room = await getRoom(roomId)

  return NextResponse.json(
    {
      message: 'Room loaded successfully',
      item: room,
    },
    {
      status: 200,
    },
  )
}
