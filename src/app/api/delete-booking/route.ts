import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function deleteBooking(bookingId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('bookings').delete().eq('id', bookingId)
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  const { id: bookingId } = await req.json()

  if (!bookingId)
    return NextResponse.json(
      {
        error: 'There is no bookingId',
      },
      {
        status: 400,
      },
    )

  await deleteBooking(bookingId)

  return NextResponse.json(
    {
      message: 'Booking deleted successfully',
    },
    {
      status: 200,
    },
  )
}
