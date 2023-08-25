import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function signin(email: string, password: string) {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return data
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password)
    return NextResponse.json(
      {
        error: 'Some data is wrong',
      },
      {
        status: 400,
      },
    )

  const data = await signin(email, password)

  try {
    return NextResponse.json(
      {
        message: 'Login successed',
        item: data,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Login Failed',
        error,
      },
      {
        status: 400,
      },
    )
  }
}
