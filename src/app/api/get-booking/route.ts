import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import supabase from 'constants/supabseClient'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getBooking(userEmail: string) {
  try {
    let { data: guest, error } = await supabase
      .from('guests')
      .select('*')
      .eq('email', userEmail)
      .single()

    const guestId = guest?.id

    if (guestId) {
      let { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('guestId', guestId)

      console.log(bookings)
      return bookings
    }
  } catch (error) {
    console.error(error)
  }
}

export async function GET(req: NextRequest) {
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
