import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useRoomDetail() {
  const params = useParams()
  const roomId = params['id']

  const {
    isLoading,
    data: room,
    error,
  } = useQuery({
    queryKey: ['room'],
    queryFn: () =>
      fetch(`/api/get-room?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => data.item),
  })

  return { isLoading, room, error }
}
