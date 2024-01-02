import { FormValues } from '@/app/signup/SignupForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { NextRequest, NextResponse } from 'next/server'

async function createUser({
  firstName,
  lastName,
  email,
  password,
}: FormValues) {
  try {
    const supabase = createServerComponentClient({ cookies })
    let { data: user } = await supabase.auth.signUp({
      email,
      password,
    })

    if (user) {
      const { data } = await supabase
        .from('guests')
        .update({ firstName, lastName })
        .eq('email', email)
        .select()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  let userData = await req.json()

  if (!userData) {
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
    const user = await createUser(userData)

    if (user && user.length > 0) {
      return NextResponse.json(
        {
          message: 'Already Existed user',
          items: user,
        },
        {
          status: 400,
        },
      )
    }

    return NextResponse.json(
      {
        message: 'Signup successed',
        items: user,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to Signup',
      },
      {
        status: 400,
      },
    )
  }
}
