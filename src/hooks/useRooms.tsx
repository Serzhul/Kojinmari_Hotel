import { useQuery } from '@tanstack/react-query'

export function useRooms() {
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: () =>
      fetch('/api/get-rooms')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, rooms, error }
}
