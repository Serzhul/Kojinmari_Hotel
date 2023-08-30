import { IRoom } from 'constants/interfaces'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useRooms() {
  const searchParams = useSearchParams()

  // FILTER
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue,
        }

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'roomType-desc'

  const [field, direction] = sortByRaw.split('-')

  const sortBy = JSON.stringify({ field, direction })

  const {
    isLoading,
    data: rooms,
    fetchNextPage,
    error,
  } = useInfiniteQuery<unknown, unknown, IRoom[], any>({
    queryKey: ['rooms', filter, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetch(
        `/api/get-rooms?filter=${filter}&sortBy=${sortBy}&page=${pageParam}`,
      )
        .then((res) => res.json())
        .then((data) => data.items),
    getNextPageParam: (_, pages) => pages.length + 1,
  })

  return { isLoading, rooms, fetchNextPage, error }
}
