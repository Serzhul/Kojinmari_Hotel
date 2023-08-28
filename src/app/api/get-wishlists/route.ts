import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import supabase from 'constants/supabseClient'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getWishlists(userId: string) {
  try {
    let { data: wishlists, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('userId', userId)
      .single()

    const roomIds = wishlists ? wishlists.roomIds?.split(',') : []

    console.log(roomIds, '?????')

    if (roomIds && roomIds.length > 0) {
      let { data: wishlists, error } = await supabase
        .from('rooms')
        .select('*')
        .in('id', roomIds)

      console.log(wishlists)
      return wishlists
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
    const wishlist = await getWishlists(user?.email ?? '')

    return NextResponse.json(
      {
        message: 'Wishlists loaded successfully',
        items: wishlist,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to load wishlists',
      },
      {
        status: 400,
      },
    )
  }
}
