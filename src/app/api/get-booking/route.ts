import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

async function getBooking(userEmail: string) {
  try {
    const supabase = createServerComponentClient({ cookies })
    let { data: guest } = await supabase
      .from('guests')
      .select('*')
      .eq('email', userEmail)
      .single()

    const guestId = guest?.id

    if (guestId) {
      let { data: bookings } = await supabase
        .from('bookings')
        .select(
          `id, startDate, endDate, numNights, numGuests, roomPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observations, roomId, rooms(name)`,
        )
        .eq('guestId', guestId)

      console.log(bookings, 'bookings!!')
      return bookings
    }
  } catch (error) {
    console.error(error)
  }
}

export async function GET() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      {
        message: 'No User Data',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const bookings = await getBooking(user?.email ?? '')

    return NextResponse.json(
      {
        message: 'Booking loaded successfully',
        items: bookings,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to load booking',
      },
      {
        status: 400,
      },
    )
  }
}
