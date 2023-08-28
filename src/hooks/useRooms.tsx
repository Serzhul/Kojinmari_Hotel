import { IRoom } from '@/app/rooms/RoomRow'
import { useQuery } from '@tanstack/react-query'

export function useRooms() {
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery<unknown, unknown, IRoom[], any>({
    queryKey: ['rooms'],
    queryFn: () =>
      fetch('/api/get-rooms')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, rooms, error }
}
