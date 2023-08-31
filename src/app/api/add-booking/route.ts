import { IBooking } from '@/app/booking/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function addBooking(booking: IBooking) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('bookings').insert([booking])

    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const booking = await req.json()

    const data = await addBooking(booking)

    return NextResponse.json(
      {
        message: 'Booking added successfully',
        items: data,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Booking failed',
      },
      {
        status: 400,
      },
    )
  }
}
