import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function signout() {
  const supabase = createRouteHandlerClient({ cookies })
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}

export async function POST(req: NextRequest) {
  await signout()

  try {
    return NextResponse.json(
      {
        message: 'Logout successed',
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Logout Failed',
        error,
      },
      {
        status: 400,
      },
    )
  }
}
