import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { PAGE_SIZE } from 'constants/variables'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function getRooms({
  filter,
  sortBy,
  page,
}: {
  filter: {
    field: string
    value: string
  } | null
  sortBy: {
    field: string
    direction: string
  }
  page: number
}) {
  const supabase = createServerComponentClient({ cookies })
  try {
    let query = supabase.from('rooms').select('*')

    if (filter !== null) {
      query = query.eq(filter.field, filter.value)
    }

    if (sortBy) {
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === 'asc',
      })
    }

    if (page) {
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      query = query.range(from, to)
    }

    const { data: rooms } = await query

    return rooms
  } catch (error) {
    console.error(error)
  }
}

export async function GET(req: NextRequest) {
  let filter = req.nextUrl.searchParams.get('filter')
  let sortBy = req.nextUrl.searchParams.get('sortBy')
  const page = req.nextUrl.searchParams.get('page')

  if (!filter || !sortBy || !page) return

  try {
    const rooms = await getRooms({
      filter: JSON.parse(filter ?? ''),
      sortBy: JSON.parse(sortBy ?? ''),
      page: Number(page),
    })

    return NextResponse.json(
      {
        message: 'Rooms loaded successfully',
        items: rooms,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to load rooms',
      },
      {
        status: 400,
      },
    )
  }
}
