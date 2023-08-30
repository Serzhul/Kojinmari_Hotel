import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

async function updateBooking(bookingId: string, status: string) {
  try {
    const { data } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()

    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const { bookingId, status } = await req.json()

  if (!bookingId) {
    return NextResponse.json(
      {
        message: 'No BookingId',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const bookings = await updateBooking(bookingId, status)

    return NextResponse.json(
      {
        message: 'bookings updated successfully',
        items: bookings,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to update bookings',
      },
      {
        status: 400,
      },
    )
  }
}
