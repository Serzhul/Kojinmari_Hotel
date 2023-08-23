import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

async function getRooms() {
  let { data: rooms, error } = await supabase.from('rooms').select('*')

  return rooms
}

export async function GET(req: NextRequest) {
  const rooms = await getRooms()

  return NextResponse.json(
    {
      message: 'Rooms loaded successfully',
      items: rooms,
    },
    {
      status: 200,
    },
  )
}
