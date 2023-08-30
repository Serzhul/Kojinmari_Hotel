import { IBooking } from '@/app/booking/page'
import supabase from 'constants/supabseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function addBooking(booking: IBooking) {
  try {
    const { data, error } = await supabase.from('bookings').insert([booking])

    console.log(data, booking, '됐냐??')
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
        message: 'AddBooking failed',
      },
      {
        status: 400,
      },
    )
  }
}
