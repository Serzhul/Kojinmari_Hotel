import { rooms } from '@/data/data-rooms'
// import supabase from 'constants/supabseClient'
import { NextResponse } from 'next/server'

// const supabase = createServerComponentClient({ cookies })

async function createRooms() {
  // const { error } = await supabase.from('rooms').insert(rooms)
  // if (error) console.log(error.message)
}

async function deleteRooms() {
  // const { error } = await supabase.from('rooms').delete().gt('id', 0)
  // if (error) console.log(error.message)
}

async function uploadAll() {
  // Bookings need to be deleted FIRST
  // await deleteBookings()
  // await deleteGuests()
  await deleteRooms()
  // Bookings need to be created LAST
  // await createGuests()
  await createRooms()
  // await createBookings()
}

export async function GET() {
  await uploadAll()

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
