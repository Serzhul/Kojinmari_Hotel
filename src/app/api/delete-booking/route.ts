import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

async function deleteBooking(bookingId: string) {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get('id')

  if (!bookingId)
    return NextResponse.json(
      {
        error: 'There is no roomId',
      },
      {
        status: 400,
      },
    )

  const room = await deleteBooking(bookingId)

  return NextResponse.json(
    {
      message: 'Booking deleted successfully',
      item: room,
    },
    {
      status: 200,
    },
  )
}
