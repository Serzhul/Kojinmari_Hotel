import { IReview } from '@/app/review/[id]/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function addReview(review: IReview) {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('reviews').insert([review])

    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const review = await req.json()

    const data = await addReview(review)

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
