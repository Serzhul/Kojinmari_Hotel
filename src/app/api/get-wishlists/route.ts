import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import supabase from 'constants/supabseClient'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getWishlists(userId: string) {
  try {
    let { data: wishlist, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('userId', userId)

    if (wishlist) {
      const response = wishlist[0]
      return response.roomIds.split(',')
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
