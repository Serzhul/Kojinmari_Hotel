import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

async function getWishlist(userId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })

    let { data: wishlist } = await supabase
      .from('wishlists')
      .select('*')
      .eq('userId', userId)
      .single()

    if (wishlist) {
      return wishlist?.roomIds?.split(',')
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
        items: null,
      },
      {
        status: 400,
      },
    )
  }

  try {
    const wishlist = await getWishlist(user?.email ?? '')

    return NextResponse.json(
      {
        message: 'wishlist loaded successfully',
        items: wishlist,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to load wishlist',
      },
      {
        status: 400,
      },
    )
  }
}
